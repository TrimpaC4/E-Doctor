import React, { useEffect, useMemo, useState } from "react";
import "./chat.css";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3002");

function Chat() {
  const [mes, setMes] = useState("");
  const [allMessages, setAllMessages] = useState([])

  const sendMessage = async (message) => {
    if (message !== "") {
      await socket.emit("send-message", {message , class: "me", time : Date(Date.now())});
      setAllMessages((allMessages)=> [...allMessages, {message , class: socket.id,  time : Date(Date.now())}]);

    }
  };
  useEffect(() => {
    socket.on("receive-message",(data) => {
      allMessages.push(data);
      setAllMessages((allMessages)=> [...allMessages, data]);
      // console.log(socket.id);
    });
  }, [socket]);


  return (
    <div className="chat">
      <div className="feed">
        {
          allMessages.map((message,i)=>{
            return <div key={i} className={message.class === socket.id ? "me": "you" }>{message.message}</div>
          })
        }
      </div>
      <div className="inputs">
      <input
        type="text"
        placeholder="write message"
        onChange={(e) => {
          setMes(e.target.value);
        }}
      />
      <button
        onClick={() => {
          sendMessage(mes);
        }}
      >
        send message
      </button>
      </div>
    </div>
  );
}

export default Chat;
