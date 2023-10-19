import React, { useEffect, useMemo, useState } from "react";
import "./chat.css";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3002");

function Chat() {
  const [mes, setMes] = useState("");
  const [allMessages, setAllMessages] = useState([])

  const sendMessage = async (message) => {
    if (message !== "") {
      await socket.emit("send-message", message);
      allMessages.push(message);
      setAllMessages(allMessages);
    }
  };
  useEffect(() => {
    socket.on("receive-message",(data) => {
      allMessages.push(data);
      setAllMessages(allMessages);
      // console.log(...allMessages);
    });
  }, [socket]);


  return (
    <div className="chat">
      <div>
        
      </div>
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
  );
}

export default Chat;
