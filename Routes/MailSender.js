const router = require("express").Router();
var nodemailer = require('nodemailer');
const isauthenticated = require("../Middleware/authentication");

router.post('/sendmail', isauthenticated, (req, res) => {
  // console.log("DATA :", req.body)
  // res.send("Done")
    try {
        const {SUBJECT,MESSAGE,SEND_TO}=req.body;
        const {MAIL_ID,MAIL_PASSWORD}=req.data;
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: MAIL_ID,
              pass: MAIL_PASSWORD
            }
          });
          var mailOptions = {
            from: MAIL_ID,
            to: SEND_TO,
            subject: SUBJECT,
            text: MESSAGE
          };
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                res.status(500).send(error);
            } else {
                // res.status(200).send('Email sent: ' + info.response);
                res.status(200).send('Email sent Successfully');
            }
          });
    } catch (error) {
        res.status(500).send({"error":error});
      }
});

router.post('/sendmailwithattachment', isauthenticated, (req, res) => {
  // console.log("DATA :", req.body)
  // res.send("Done")
    try {
        const {SUBJECT,MESSAGE,SEND_TO,FILE}=req.body;
        const {MAIL_ID,MAIL_PASSWORD}=req.data;
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: MAIL_ID,
              pass: MAIL_PASSWORD
            }
          });
          var mailOptions = {
            from: MAIL_ID,
            to: SEND_TO,
            subject: SUBJECT,
            text: MESSAGE,
            attachments: [
              {
                filename: FILE,
                path: FILE
              }
            ]
          };
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                res.status(500).send(error);
            } else {
                // res.status(200).send('Email sent: ' + info.response);
                res.status(200).send('Email sent Successfully');
            }
          });
    } catch (error) {
        res.status(500).send({"error":error});
      }
}); 


router.post("/generatetoken", async (req, res) => {
  try {
    const token = jwt.sign(
      {
        data: req.body,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d", // Token expires in 1 hour (adjust as needed)
      }
    );

    res.cookie("_secureourapp", token, {
      httpOnly: true,
      // secure: true, // Enable this in production with HTTPS
    });

    return res.status(200).json({ message: "Token Generated" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

  

module.exports = router;