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
  const [reFetch,setReFtech] = useState(false);

  const fetch = async () => {
    const token = localStorage.getItem("token");
    if (localStorage.getItem("type") === "patient") {
      await axios
        .get("http://localhost:5000/api/patient/getOne", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then(async (response) => {
          setUser(response.data);
          await axios
            .get(`http://localhost:5000/api/room/GetAllPat/${user.id}`)
            .then(async (res) => {
              setRooms(res.data);
              await axios
                .get("http://localhost:5000/api/doctor/getAll")
                .then((resp) => {
                  setDoctors(resp.data);
                });
            });
        });
    } else if (localStorage.getItem("type") === "doctor") {
      await axios
        .get("http://localhost:5000/api/doctor/getOne", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then(async (response) => {
          setUser(response.data);
          await axios
            .get(`http://localhost:5000/api/room/GetAllDoc/${user.id}`)
            .then(async (res) => {
              setRooms(res.data);
              await axios
                .get("http://localhost:5000/api/patient/getAll")
                .then(async (resp) => {
                  setPatients(resp.data);
                });
            });
        });
    }
  };

  const createRoom = async (sender: any, receiver: any) => {
    if (localStorage.getItem("type") === "patient") {
      await axios
        .post("http://localhost:5000/api/room/makeRoom", {
          PatientId: parseInt(sender),
          DoctorId: parseInt(receiver),
        })
        .then(() => {
          fetch();
        });
    } else {
      await axios
        .post("http://localhost:5000/api/room/makeRoom", {
          PatientId: parseInt(receiver),
          DoctorId: parseInt(sender),
        })
        .then(() => {
          fetch();
        });
    }
  };

  useEffect(() => {
    fetch();
    if(Object.keys(user).length === 0) {
      setReFtech(!reFetch)
    }
  }, [reFetch]);
  return (
    <div className="chatList">
      {!openConvo ? (
        <div>
          <div className="drop-menu">
            <select
              onChange={(e) => {
                createRoom(user.id, e.target.value);
              }}
            >
              {localStorage.getItem("type") === "doctor"
                ? patients.map((patient: any) => {
                    return (
                      <option key={patient.id} value={patient.id}>
                        {patient.name}
                      </option>
                    );
                  })
                : doctors.map((doctor: any) => {
                    return (
                      <option key={doctor.id} value={doctor.id}>
                        {doctor.name}
                      </option>
                    );
                  })}
            </select>
          </div>
          {rooms.map((room: any) => {
            return (
              <div
                className="room-container"
                key={room.id}
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
        </div>
      ) : null}

      {openConvo ? (
        <Chat messages={currentRoom.messages} room={currentRoom} id={user.id} />
      ) : null}
    </div>
  );
}

export default ChatRooms;
