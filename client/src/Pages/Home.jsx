import React, { useState } from 'react'
import {useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  function generateUniqueString() {
    // Get the current timestamp
    const timestamp = new Date().getTime();
  
    // Convert the timestamp to a base36 string
    const base36String = timestamp.toString(36);
  
    // Return the substring of the base36 string to ensure a fixed length
    const uniqueString = base36String.substring(2, 10); // You can adjust the substring length as needed
  
    return uniqueString;
  }

  const [joinchat, setjoinchat] = useState("")
  
  return (
    <div>
        <>
  {/* Component Code */}
  <div className="grid grid-flow-col grid-rows-2 sm:grid-rows-1 sm:grid-cols-2 gap-4">
    <div className="flex items-center justify-center">
      <main className="max-w-screen-xl px-4 lg:px-16">
        <div className="text-left mt-6">
          <h2 className="text-4xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
            Randomizer
            <br />
            <span className="text-indigo-600">Privacy Exchange</span>
          </h2>
          <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
          Connecting Anonymously, Communicating Privately – Your Gateway to Secure Conversations
          </p>
          <div className="mt-5 sm:mt-8 sm:flex justify-start">
            <div className="rounded-md shadow">
              <button onClick={()=>{navigate(`/chat/${generateUniqueString()}`)}}
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10"
              >
                Get started
              </button>
            </div>
            <div className="mt-3 sm:mt-0 sm:ml-3 flex">
              <input className="rounded bg-indigo-50 border-2 border-indigo-500/100 mr-1 font-bold" type="text" value={joinchat} onChange={(e)=>{setjoinchat(e.target.value)}}/>
              <button
              onClick={()=>{if(joinchat.length===0){alert("Please Fill Chat ID"); return;} navigate(`/chat/${joinchat}`);}}
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-300 transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10"
              >
                Join
              </button>
            </div>
          </div>
          <div className="mt-5 sm:mt-8 sm:flex justify-start"> 
          <button 
          className='w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10'
           onClick={()=>{navigate("/doc/mail")}} >
            PUBLIC API DOCUMENTATION
          </button>
          </div>
        </div>
      </main>
    </div>
    <div
      className="w-full object-cover h-72 lg:w-full md:h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url(/public/homepage.jpeg)"
      }}
    />
  </div>
</>

{/* <div title='Mail Sender API' onClick={()=>{navigate("/doc/mail")}}  className='w-12 h-12 absolute right-10 flex items-center justify-center cursor-pointer bg-blue-700 bottom-10 rounded-full'>
<>
  <svg
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="30px"
    height="30px"
    viewBox="0 0 122.879 88.855"
    enableBackground="new 0 0 122.879 88.855"
    xmlSpace="preserve"
  >
    <g>
      <path d="M7.048,0h108.784c1.939,0,3.701,0.794,4.977,2.069c1.277,1.277,2.07,3.042,2.07,4.979v74.759 c0,1.461-0.451,2.822-1.221,3.951c-0.141,0.365-0.361,0.705-0.662,0.994c-0.201,0.189-0.422,0.344-0.656,0.461 c-1.225,1.021-2.799,1.643-4.508,1.643H7.048c-1.937,0-3.701-0.793-4.979-2.07C0.794,85.51,0,83.748,0,81.807V7.048 c0-1.941,0.792-3.704,2.068-4.979C3.344,0.792,5.107,0,7.048,0L7.048,0z M5.406,78.842l38.124-38.22L5.406,9.538V78.842 L5.406,78.842z M47.729,44.045L8.424,83.449h105.701L76.563,44.051L64.18,54.602l0,0c-0.971,0.83-2.425,0.877-3.453,0.043 L47.729,44.045L47.729,44.045z M80.674,40.549l36.799,38.598V9.198L80.674,40.549L80.674,40.549z M8.867,5.406l53.521,43.639 l51.223-43.639H8.867L8.867,5.406z" />
    </g>
  </svg>
</>

</div> */}

    </div>
  )
}
