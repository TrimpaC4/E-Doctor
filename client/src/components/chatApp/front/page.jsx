import React, { useEffect, useState, useRef } from "react";
import "./chat.css";
import io from "socket.io-client";
import axios from "axios";
import { format, render, cancel, register } from "timeago.js";

const socket = io.connect("http://localhost:3002");

function Chat({ messages, room, id }) {
  const [mes, setMes] = useState("");
  const [allMessages, setAllMessages] = useState(messages);

  const sendMessage = async (message) => {
    if (message !== "") {
      await axios
        .post("http://localhost:5000/api/message/add", {
          RoomId: room.id,
          DoctorId: room.DoctorId,
          PatientId: room.PatientId,
          content: message,
          senderPhone: id + "",
        })
        .then(async (response) => {
          await socket.emit("send-message", response.data);
          setAllMessages((allMessages) => [...allMessages, response.data]);
        });
    }
  };
  useEffect(() => {
    socket.emit("join-room", room.id + "");
    socket.on("receive-message", (data) => {
      console.log(data);
      allMessages.push(data);
      setAllMessages((allMessages) => [...allMessages, data]);
    });
  }, [socket]);

  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTop = feedRef.current.scrollHeight;
    }
  }, [allMessages]);

  const feedRef = useRef();

  return (
    <div className="chat">
      <div className="feed" ref={feedRef}>
        {allMessages.map((message, i) => {
          return (
            <div className="position-holder">
              <div
                key={i}
                className={message.senderPhone === id + "" ? "me" : "you"}
              >
                <div>{message.content}</div>
                <p>{format(message.createdAt)}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="inputs">
        <input
          value={mes}
          type="text"
          placeholder="write message"
          onChange={(e) => {
            setMes(e.target.value);
          }}
        />
        <button
          onClick={() => {
            sendMessage(mes);
            setMes("");
          }}
        >
          send message
        </button>
      </div>
    </div>
  );
}

export default Chat;
