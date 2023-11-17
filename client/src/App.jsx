import React from 'react'
import Home from './Pages/Home'
import ChatPage from './Pages/ChatPage'
import { Route, Routes,useLocation, useNavigate } from 'react-router-dom';
import MailSender from './Pages/MailSender';

export default function App() {
  return (
    <div>
       <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/chat/:groupId" element={<ChatPage/>}/>
        <Route exact path="/doc/mail" element={<MailSender/>}/>
      </Routes>
    </div>
  )
}
