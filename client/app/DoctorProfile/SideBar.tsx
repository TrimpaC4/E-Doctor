import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFileLines } from '@fortawesome/free-solid-svg-icons';
import logo1 from "../../assets/images/logo1.png"
import logo2 from "../../assets/images/logo2.png"
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const SideBar = () => {
  const navigate = useNavigate()
  const patient = useSelector((state : RootState)=> state.patient);
  const doctor = useSelector((state : RootState)=> state.doctor);

    const overview = faBars as IconProp;
    const calendar = faCalendar as IconProp;
    const user = faUser as IconProp;
    const clock = faClock as IconProp;
    const creditCard = faCreditCard as IconProp;
    const message = faEnvelope as IconProp;
    const blog = faFileLines as IconProp;
  return (

    <>
      {
      doctor.isAuthenticated ? <div className="DoctorProfile-sideBar">
      <div className="DoctorProfile-logo" onClick={()=>navigate("/")} >
        <img className="DoctorProfile-logo1" src={logo1} alt="" />
        <img className="DoctorProfile-logo2" src={logo2} alt="" />
      </div>
      
        <ul className="DoctorProfile-menu">
          <li onClick={()=>navigate("/doctorProfile")} ><FontAwesomeIcon className="DoctorProfile-icon" icon={overview} style={{color: "#070808",}} />Overview</li>
          <li onClick={()=>navigate("/doctorProfile/appointments")} ><FontAwesomeIcon className="DoctorProfile-icon" icon={calendar} style={{color: "#070808",}} />Appointment</li>
          <li onClick={()=>navigate("/doctorProfile/patients")} ><FontAwesomeIcon className="DoctorProfile-icon" icon={user} style={{color: "#070808",}} />My Patients</li>
          <li onClick={()=>navigate("/doctorProfile/schedule")} ><FontAwesomeIcon className="DoctorProfile-icon" icon={clock} style={{color: "#070808",}} />Schedule Timings</li>
          <li ><FontAwesomeIcon className="DoctorProfile-icon" icon={creditCard} style={{color: "#070808",}} />Payments</li>
          <li onClick={()=>navigate("/doctorProfile/docChat")} ><FontAwesomeIcon className="DoctorProfile-icon" icon={message} style={{color: "#070808",}} />Message</li>
          <li onClick={()=>navigate("/doctorProfile/review")} ><FontAwesomeIcon className="DoctorProfile-icon" icon={blog} style={{color: "#070808",}} />Blog</li>
        </ul>
    </div>
     : 
     <div className="DoctorProfile-sideBar">
     <div className="DoctorProfile-logo" onClick={()=>navigate("/")}>
       <img className="DoctorProfile-logo1" src={logo1} alt="" />
       <img className="DoctorProfile-logo2" src={logo2} alt="" />
     </div>
     
       <ul className="DoctorProfile-menu">
         <li onClick={()=>navigate("/doctorProfile/appointments")} ><FontAwesomeIcon className="DoctorProfile-icon" icon={calendar} style={{color: "#070808",}} />Appointment</li>
         <li ><FontAwesomeIcon className="DoctorProfile-icon" icon={creditCard} style={{color: "#070808",}} />Payments</li>
         <li onClick={()=>navigate("/doctorProfile/docChat")} ><FontAwesomeIcon className="DoctorProfile-icon" icon={message} style={{color: "#070808",}} />Message</li>
       </ul>
   </div>
    }
    </>
    
  )
}

export default SideBar