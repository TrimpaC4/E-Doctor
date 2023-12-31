import React, { useEffect } from "react";
import CalendarComponent from "../CalendarComponent";
import Stocks from "../Stocks";
import Charts from "../Charts";
import DonePatients from "../DonePatients";
import DoctorCards from "../DoctorCards";
import AppointmentsList from "../AppointmentsList";
import Calendar from "react-calendar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../src/redux/store";
import { getOnePatient } from "../../../src/redux/patientSlice";
import { getOneDoctor } from "../../../src/redux/doctorSlice";
import "./style.css"
const Overview = () => {
  const doctor: any = useSelector((state: RootState) => state.doctor.doctorInfo);
  console.log(doctor)
  const dispatch: AppDispatch = useDispatch()
  useEffect(() => {
    const type = localStorage.getItem("type")
    if (type === "patient") {
      dispatch(getOnePatient())
    } else if (type === "doctor") {
      dispatch(getOneDoctor())
    }
  },[])

  return (
    <div style={{ backgroundColor: "#F7F6F6" }}>
      <div className="DoctorProfile-mid">
        <span className="DoctorProfile-welcome">Welcome, {doctor.name}</span>
        <span>Have a nice day at work</span>
      </div>
      <DoctorCards />
      <div className="DoctorProfile-middle">
        <AppointmentsList />
        <div className="DoctorProfile-statistics">
          <Stocks />
          <Charts />
        </div>
        <div className="DoctorProfile-Calendar-section">
          <Calendar className="DoctorProfile-calendar" />
        </div>
      </div>
      <DonePatients />
    </div>
  );
};

export default Overview;
