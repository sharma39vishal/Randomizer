import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import getrandomsuperhero from './superheros.js'
import { useParams } from 'react-router-dom';
import moment from 'moment';

const socket = io.connect();
// const socket = io.connect("http://localhost:5000/");

export default function ChatPage() {
  const [username, setusername] = useState(getrandomsuperhero())
  const [usersinroom, setusersinroom] = useState(1);
  const { groupId } = useParams();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [fileupload, setfileupload] = useState(null);

  useEffect(() => {
    setMessages([])
  }, [groupId])

  useEffect(() => {
    socket.on('message', (data) => {
      console.log(data)
      setMessages((prevMessages) => [...prevMessages, data]);
    });
    socket.emit('joinRoom', { room: groupId ,user:username, status:'online'});

    socket.on('joinRoom', (count) => {
      // console.log("CNT",count)
      setusersinroom(count);
    });

    return () => {
      socket.emit('joinRoom', { room: groupId ,user:username, status:'offline'});
      socket.disconnect();
    };

  }, []);

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleFileChange = (event) => {
    setMessage(event.target.value);
    setfileupload(null);
  };


  const handleSubmit = (event) => {
    if (message.length===0 && fileupload===null){
      alert("Please enter a message ");
      return false;
    }
    event.preventDefault();
    // console.log(socket.id)
    if (message.trim()) {
      const data = {
        room: groupId,
        text: message,
        file: fileupload,
        user: username,
        date: new Date()
      };
      socket.emit('message', data);
      setMessage('');
      setfileupload(null);
    }
  };

  // console.log(getrandomsuperhero())

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Randomizer Chat',
        text: 'Join the chat on Randomizer!',
        url: window.location.href,
      })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing:', error));
    } else {
      // Fallback if the browser doesn't support the Share API
      console.log('Sharing not supported on this browser.');
    }
  };

  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  return (
    <div>
      <div
        className=" mx-auto flex flex-col h-screen max-h-screen overflow-hidden"
      >
        <div className='flex flex-row items-center justify-between'>
          <h4 className="ml-5 m-3  text-xl font-bold text-gray-800">
            Randomizer
          </h4>
          <div className='flex flex-row'>
            <div className='flex items-center '>
          <div className='bg-gray-200 rounded-full cursor-pointer m-2  pr-1 pl-2 flex items-center' onClick={()=>{handleShare()}}>
  <svg
    fill="#000000"
    height="1rem"
    width="1rem"
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 458.624 458.624"
    xmlSpace="preserve"
  >
    <g>
      <g>
        <path
          d="M339.588,314.529c-14.215,0-27.456,4.133-38.621,11.239l-112.682-78.67c1.809-6.315,2.798-12.976,2.798-19.871
			c0-6.896-0.989-13.557-2.798-19.871l109.64-76.547c11.764,8.356,26.133,13.286,41.662,13.286c39.79,0,72.047-32.257,72.047-72.047
			C411.634,32.258,379.378,0,339.588,0c-39.79,0-72.047,32.257-72.047,72.047c0,5.255,0.578,10.373,1.646,15.308l-112.424,78.491
			c-10.974-6.759-23.892-10.666-37.727-10.666c-39.79,0-72.047,32.257-72.047,72.047s32.256,72.047,72.047,72.047
			c13.834,0,26.753-3.907,37.727-10.666l113.292,79.097c-1.629,6.017-2.514,12.34-2.514,18.872c0,39.79,32.257,72.047,72.047,72.047
			c39.79,0,72.047-32.257,72.047-72.047C411.635,346.787,379.378,314.529,339.588,314.529z"
        />
      </g>
    </g>
  </svg>
      <h4 className='font-semibold text-base m-2'>
                share
                </h4>
          </div>
          </div>
          <div className=" m-2 border-2 border-blue-500/100 bg-gray-200 rounded-full cursor-pointer">
          {/* {username} */}
            <h4 className='font-bold text-2xl pl-2 pr-2 m-2'> {usersinroom}</h4>
          </div>
          </div>
        </div>
        <div className="messages flex-1 overflow-y-scroll border-box m-4">
        <div className="message-row flex flex-row">
                  <div className="message m-2 p-4 pb-8 bg-gray-100 rounded max-w-full inline relative shadow">
                    <p className="message-content">
                    Welcome, <span className='text-red-600'>{username}</span> to the chat room!
                    </p>
                    <div className="message-name absolute bg-gray-300 px-2 py-1 text-xs rounded left-0 bottom-0">
                      Bot 🤖 
                    </div>
                  </div>
                </div>

          {messages.map((message, index) => (
            <>
              {message.user !== username ?
                <div className="message-row flex flex-row ">
                  <div className="message m-2 p-4 pb-8 bg-gray-100 rounded max-w-full inline relative shadow">
                    <p className="message-content min-w-max">
                    {message.file ?
                      <>
       <p className='text-sm'>{message.text}</p>        
                      <button className='bg-red-600 rounded-sm p-1' style={{cursor:"pointer"}} 
                       onClick={() => {
                        // Create an anchor element
                        const a = document.createElement('a');
                        // Create a Blob with the file data
                        const blob = new Blob([message.file]);
                        // Create a data URL for the Blob
                        const url = URL.createObjectURL(blob);
                        // Set the download attribute and the href
                        a.download = message.text;
                        a.href = url;
                        // Append the anchor to the body
                        document.body.appendChild(a);
                        // Trigger a click on the anchor
                        a.click();
                        // Remove the anchor from the body
                        document.body.removeChild(a);
                        // Revoke the Blob URL
                        URL.revokeObjectURL(url);
                      }}
                      >
         Download File
       </button>
       </>:message.text}
                     
                    </p>
                    <div className="message-name absolute bg-gray-300 px-2 py-1 text-xs rounded left-0 bottom-0">
                      {message.user} 
                    </div>
                  </div>
                </div>
                :
                <div className="message-row flex flex-row-reverse text-white">
                  <div className="message m-2 p-4 pb-9 bg-blue-500/100 rounded max-w-full inline relative shadow">
                    <p className="message-content min-w-max">
                      {message.text}
                    </p>
                    <div className="message-name absolute bg-blue-600/100 px-2 py-1 text-xs rounded left-0 bottom-0">
                      {message.user} 
                    </div>
                  </div>
                </div>
              }
            </>
          ))}
        </div>

        <div className="message-input bg-gray-100 p-4 flex flex-row">
        {/* <div class="flex items-center justify-center bg-grey-lighter">
    <label class="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
        <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
        </svg>
        <span class="mt-2 text-base leading-normal">Select a file</span>
        <input type='file' class="hidden" />
    </label>
</div> */}
          <div className='fixed bg-red-600 p-2  bottom-16 right-5 rounded-full'>
            {/* <label htmlFor='input-file'>
              <i className="fa-solid fa-cloud-arrow-up"></i>Uploading
            </label>
             */}
                 <label class="w-2  h-2 cursor-pointer">
        <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
        </svg>

            <input id='input-file' className="hidden" type='file'  onChange={(event)=>{setfileupload(event.target.files[0]); setMessage(event.target.files[0].name); handleSubmit(); }} />
            </label>
          </div>

          
          <input className="flex-1 p-2 rounded" type="text" value={message} onKeyDown={handleInputKeyDown} onChange={handleInputChange} />
          <button className="w-16" onClick={handleSubmit}>Send</button>
        </div>
      </div>

    </div>
  )
}
