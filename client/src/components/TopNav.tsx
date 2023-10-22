"use client"
import React ,{useEffect} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useSelector ,useDispatch} from 'react-redux';
import { RootState,AppDispatch } from '../redux/store';
import { getOnePatient } from '../redux/patientSlice';
import { getOneDoctor } from '../redux/doctorSlice';


interface patientInfo {
  avatarUrl: string;
}


const TopNav = () => {
  const question = faCircleQuestion as IconProp;
  const bell = faBell as IconProp;
  
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
  
  return (
    <div className="DoctorProfile-top">
      <div className="DoctorProfile-top-left">
        <input className="DoctorProfile-search" type="text" placeholder="Search Appointment,Patient or etc" />
      </div>
      <div className="DoctorProfile-top-right">
        <FontAwesomeIcon className="DoctorProfile-main-icon" icon={question} style={{ color: "white", }} />
        <FontAwesomeIcon className="DoctorProfile-main-icon" icon={bell} style={{ color: "white", }} />
        <div className="DoctorProfile-user">
          <div className="DoctorProfile-image-frame">
            <img src={patient.avatarUrl || doctor.avatarUrl} alt="" />
          </div>
          <div className="DoctorProfile-details">
            <span className="DoctorProfile-name">{patient.name || doctor.name}</span>
            <span>{doctor.department}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopNav