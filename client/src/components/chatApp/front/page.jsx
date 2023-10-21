import React, { useEffect, useState } from "react";
import "./chat.css";
import io from "socket.io-client";
import axios from "axios";

const socket = io.connect("http://localhost:3002");

function Chat({ messages, room }) {
  const [mes, setMes] = useState("");
  const [allMessages, setAllMessages] = useState(messages);
  // console.log(allMessages);
  // console.log(room);
  const sendMessage = async (message) => {
    if (message !== "") {
      await axios.post("http://localhost:5000/api/message/add", {
        RoomId: room.id,
        DoctorId: room.DoctorId,
        PatientId: room.PatientId,
        content: message,
      });
      await socket.emit("send-message",{
        RoomId: room.id,
        DoctorId: room.DoctorId,
        PatientId: room.PatientId,
        content: message,
      });
      setAllMessages((allMessages) => [
        ...allMessages,
        {
          RoomId: room.id,
          DoctorId: room.DoctorId,
          PatientId: room.PatientId,
          content: message,
        },
      ]);
    }
  };
  useEffect(() => {
    socket.on("receive-message", (data) => {
      allMessages.push(data);
      setAllMessages((allMessages) => [...allMessages, data]);
      // console.log(socket.id);
    });
  }, [socket]);

  return (
    <div className="chat">
      <div className="feed">
        {allMessages.map((message, i) => {
          return (
            <div key={i} className={message.class === socket.id ? "me" : "you"}>
              {message.content}
            </div>
          );
        })}
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
