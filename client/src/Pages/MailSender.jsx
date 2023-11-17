import React from 'react'

export default function MailSender() {
  return (
<div class="contact-container">
<div class="documentation-container mail-sender-container max-w-3xl mx-auto p-6">
    <h1 class="text-3xl font-bold mb-4">MailSender API Documentation</h1>
    <p class="text-gray-600 mb-8">
        MailSender API Documentation provides details on various endpoints to send emails and generate tokens for authentication.
    </p>

    <div class="endpoint border-t-2 border-gray-300 pt-4">
        <div class="endpoint-title text-xl font-bold mb-2">POST /api/sendmail</div>
        <div class="endpoint-description mb-4">
            This endpoint is used to send an email using the sender's credentials.
        </div>
        <div class="endpoint-example bg-gray-100 p-4 rounded-md">
            <p class="font-bold mb-2">Request:</p>
            <code class="text-sm">
                {`
                {
                  "SUBJECT": "Hello",
                  "MESSAGE": "This is a test email.",
                  "SEND_TO": "recipient@example.com"
                }
                `}
            </code>
        </div>
        <div class="response bg-gray-100 p-4 rounded-md">
            <p class="font-bold mb-2">Response:</p>
            <code class="text-sm">
                {`
                {
                  "status": "success",
                  "message": "Email sent Successfully"
                }
                `}
            </code>
        </div>
    </div>

    <div class="endpoint border-t-2 border-gray-300 pt-4">
        <div class="endpoint-title text-xl font-bold mb-2">POST /api/sendmailwithattachment</div>
        <div class="endpoint-description mb-4">
            This endpoint is used to send an email with an attachment using the sender's credentials.
        </div>
        <div class="endpoint-example bg-gray-100 p-4 rounded-md">
            <p class="font-bold mb-2">Request:</p>
            <code class="text-sm">
                {`
                {
                  "SUBJECT": "Hello",
                  "MESSAGE": "This is a test email.",
                  "SEND_TO": "recipient@example.com",
                  "FILE": "/path/to/attachment"
                }
                `}
            </code>
        </div>
        <div class="response bg-gray-100 p-4 rounded-md">
            <p class="font-bold mb-2">Response:</p>
            <code class="text-sm">
                {`
                {
                  "status": "success",
                  "message": "Email sent Successfully"
                }
                `}
            </code>
        </div>
    </div>

    <div class="endpoint border-t-2 border-gray-300 pt-4">
        <div class="endpoint-title text-xl font-bold mb-2">POST /api/generatetoken</div>
        <div class="endpoint-description mb-4">
            This endpoint is used to generate a token for authentication.
        </div>
        <div class="endpoint-example bg-gray-100 p-4 rounded-md">
            <p class="font-bold mb-2">Request:</p>
            <code class="text-sm">
                {`
                {
                  "data": { /* your data here */ }
                }
                `}
            </code>
        </div>
        <div class="response bg-gray-100 p-4 rounded-md">
            <p class="font-bold mb-2">Response:</p>
            <code class="text-sm">
                {`
                {
                  "status": 200,
                  "message": "Token Generated"
                }
                `}
            </code>
        </div>
    </div>
       <div class="contact-button-container mt-8">
        <a class="contact-button bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
           href="https://www.linkedin.com/in/sharma39vishal/"
           target="_blank"
           rel="noopener noreferrer"
        >
            Contact for any Queries
        </a>
    </div>
</div>

</div>

  )
}
