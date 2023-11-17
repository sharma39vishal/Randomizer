const express = require("express");
const app = express();
const http = require('http').Server(app);
const PORT = process.env.PORT || 5000;
const dotenv = require("dotenv");

const cors = require("cors");
app.use(cors());

const io = require('socket.io')(http
  ,{cors:{"origin":[
    "http://localhost:5173",
//     "https://cprankers.netlify.app"
  ],
  credentials: true,
}}
);

const userscnt = {};

app.set('trust proxy', true);
app.use(express.json());  // to support JSON-encoded bodies

io.on('connection', (socket) => {
  // console.log('User connected');
  // socket.on('joinRoom', (data) => {
    // socket.join(data.room);
    // console.log(`User joined room ${data.room}`);
  // });

  socket.on('joinRoom', (data) => {
    socket.join(data.room);
    // console.log(`User joined room ${data.room}`);
  });
  // console.log(socket.id)
  socket.on('joinRoom', (data) => {
    // console.log(data,userscnt)

    if (userscnt[data.room] === undefined) {
      userscnt[data.room] = 1;
      // console.log(userscnt,"reset")
    }
    if (data.status === 'online') {
      userscnt[data.room]++;
      // console.log(userscnt,"online")
    }
    
    if (data.status === 'offline') {
      userscnt[data.room]--;
      // console.log(userscnt,"online")
    }

    // console.log(userscnt[data.room])
    io.to(data.room).emit('joinRoom', userscnt[data.room]);
  });

  socket.on('message', (data) => {
    socket.join(data.room);
    // console.log(`User joined room ${data.room}`);
  });

  // console.log(socket.id)
  socket.on('message', (data) => {
    //  console.log(data.room,data)
    io.to(data.room).emit('message', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// setInterval(()=>{console.log(io.engine.clientsCount, io.of("/").sockets.size);
// },2000)

http.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});

app.get("/test",(req,res)=>{
  res.send("Testing")
})

app.use("/api", require("./Routes/MailSender"));

const path=require("path");

app.use((req, res, next) => {
  const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  // console.log(req.headers['x-forwarded-for'], " : ",req.connection.remoteAddress," , ",`User IP: ${clientIp}`)
  // const clientIp = req.ip; // Get the user's IP address from the request
  console.log(`User IP: ${clientIp}`);
  next(); // Call the next middleware in the chain
});

app.use(express.static('client/dist'));
 app.get('*', (req, res) => {
        res.sendFile(path.resolve('client','dist','index.html'));
});
