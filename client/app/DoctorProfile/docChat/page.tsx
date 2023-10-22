
// export default DoctorChat
"use client"
import React, { useState } from 'react';
import SideBar from '../SideBar'
import "./style.css"
import ChatList from './ChatRooms';


const DoctorChat = () => {
  const [udpate, setUpdate] = useState<boolean>(true);
  return (
    <div>
      <ChatList />
    </div>
  );
};

export default DoctorChat;