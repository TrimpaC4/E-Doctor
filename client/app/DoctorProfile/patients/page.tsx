
"use client"
import React,{useEffect} from 'react'
// import "./style.css"
import OnePatient from '../../../src/components/OnePatient'
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/redux/store";
import { getOnePatient } from '../../../src/redux/patientSlice';
import { getOneDoctor } from '../../../src/redux/doctorSlice';
import "./style.css"
const Patient = () => {
   const doctor: any = useSelector((state: RootState) => state.doctor.doctorInfo)||[]
   const dispatch: AppDispatch = useDispatch()
   useEffect(() => {
    const type = localStorage.getItem("type")
    if (type === "patient") {
      dispatch(getOnePatient())
    } else if (type === "doctor") {
      dispatch(getOneDoctor())
    }
  }, [])  
  console.log(doctor.appointments)
  return (
    
    <div className='Patients-content'>
      <div className='Patients-container'>
        <div className='Patients-container-header'>
          <span>Patient Name</span>
          <span>Visit Id</span>
          <span>Date</span>
          <span>Gender</span>
          <span>Diseases</span>
          <span>Status</span>
        </div>
        { doctor.appointments?.map((appo: any, i: number) =>  < OnePatient key={i} appo={appo} /> )}
      </div>
    </div>

  )
}
export default  Patient