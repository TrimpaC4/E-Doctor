import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/src/redux/store";
import axios from "axios";
import Chat from "../../../src/components/chatApp/front/page";

function ChatRooms() {
  const [user, setUser] = useState<any>({});
  const [doctors, setDoctors] = useState<any>([]);
  const [patients, setPatients] = useState<any>([]);
  const [rooms, setRooms] = useState<any>([]);
  const [currentRoom, setCurrentRoom] = useState<any>({});
  const [openConvo, setOpenConvo] = useState(false);

  const fetch = async () => {
    const token = localStorage.getItem("token");
    if (localStorage.getItem("type") === "patient") {
      let person = (
        await axios.get("http://localhost:5000/api/patient/getOne", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
      ).data;
      setUser(person);
      let rms = (
        await axios.get(`http://localhost:5000/api/room/GetAllPat/${user.id}`)
      ).data;
      setRooms(rms);
      let docs = (await axios.get("http://localhost:5000/api/doctor/getAll"))
        .data;
      setDoctors(docs);
    } else if (localStorage.getItem("type") === "doctor") {
      let person = (
        await axios.get("http://localhost:5000/api/doctor/getOne", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
      ).data;
      setUser(person);
      let rms = (
        await axios.get(`http://localhost:5000/api/room/GetAllDoc/${user.id}`)
      ).data;
      setRooms(rms);
      let pats = (await axios.get("http://localhost:5000/api/patient/getAll"))
        .data;
      setPatients(pats);
    }
  };

  const createRoom = async (docId: any, patId: any) => {
    console.log("here");

    await axios
      .post("http://localhost:5000/api/room/makeRoom", {
        PatientId: parseInt(patId),
        DoctorId: parseInt(docId),
      })
      .then(() => {
        fetch();
      });
  };

  useEffect(() => {
    fetch();
    console.log(user);
    console.log(rooms);
  }, []);
  return (
    <div className="chatList">
      {rooms.map((room: any) => {
        return (
          <div
            onClick={() => {
              setCurrentRoom(room);
              setOpenConvo(true);
            }}
          >
            Conversation between you and{" "}
            {localStorage.getItem("type") === "doctor"
              ? room.patients.name
              : room.doctors.name}
          </div>
        );
      })}
      <div>
        <select name="" id="" onChange={(e)=>{
          console.log("aaaa");
          
          createRoom(user.id, e.target.value);
        }}>
          {localStorage.getItem("type") === "doctor"
            ? patients.map((patient: any) => {
                return (
                  <option
                    value={patient.id}
                  >
                    {patient.name}
                  </option>
                );
              })
            : doctors.map((doctor: any) => {
                return (
                  <option
                    value={doctor.id}
                  >
                    {doctor.name}
                  </option>
                );
              })}
        </select>
      </div>
      {/* {openConvo ? <Chat messages={currentRoom.messages} room={currentRoom} /> : null} */}
    </div>
  );
}

export default ChatRooms;
