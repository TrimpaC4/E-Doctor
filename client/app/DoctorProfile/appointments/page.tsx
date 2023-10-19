"use client"
import React, { useEffect } from 'react'
import './style.css'
import OneAppointment from './OneAppointment'
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../src/redux/store";
import { getOnePatient } from '../../../src/redux/patientSlice';
import { getOneDoctor } from '../../../src/redux/doctorSlice';

const AllAppointments = () => {
  const doctor: any = useSelector((state: RootState) => state.doctor.doctorInfo)
  const patient: any = useSelector((state: RootState) => state.patient.patientInfo)
  const dispatch: AppDispatch = useDispatch()
  useEffect(() => {
    const type = localStorage.getItem("type")
    if (type === "patient") {
      dispatch(getOnePatient())
    } else if (type === "doctor") {
      dispatch(getOneDoctor())
    }
  }, [])  
  const type = localStorage.getItem('type');
  return (
    <div className="appointments-container">
      {type === "patient" ?
        patient.Appointments?.map((appo: any, i: number) => !appo.isFinished ? <OneAppointment key={i} appo={appo} /> : null) :
        doctor.Appointments?.map((appo: any, i: number) => !appo.isFinished ? < OneAppointment key={i} appo={appo} /> : null)
      }
      hello
    </div>
  )
}

export default AllAppointments