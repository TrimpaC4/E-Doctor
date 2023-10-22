"use client"
import "./style.css"
import React, { useEffect, useState } from 'react'
import logo from "../../assets/images/logo.png"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../redux/store"
import { logoutPatient } from "../../redux/patientSlice"
import { logoutDoctor } from "../../redux/doctorSlice"
import { useRouter } from 'next/navigation';
import dynamic from "next/dynamic";

import Image from "next/image"
const NavBar = (): React.JSX.Element => {
    const router = useRouter();
    const doctor = useSelector((state: RootState) => state.doctor)
    const patient = useSelector((state: RootState) => state.patient)
    const [path,setPath]= useState<string>("")
    const dipstach: AppDispatch = useDispatch()
    useEffect(()=>{
        if (typeof window !== "undefined") {
         setPath(window.location.href)}
    },[])
    return (
        <div className="nav-bar-container" style={{ display: path.includes("/doctorProfile") ? "none" : "flex" }}>
            <div className="nav-logo">
                <Image src={logo}  alt=""/>
                <div className="title-health-care">
                    <span className="health-title">Health</span>
                    <span className="care">Care</span>
                </div>
            </div>
            <div className="nav-buttons">
                <span className="item"
                   
                 ><Link href="/">Home</Link></span>
                <span className="item"
                     
                ><Link href="/services">services</Link></span>
                <span className="item"
                  
                ><Link href="/contact">Contact us</Link></span>
                <span className="item">Help</span>
                <span className="item">Blogs</span>
            </div>
            <div className="nav-last-buutons">
                <button onClick={() => {
                    !doctor.isAuthenticated && !patient.isAuthenticated ?
                        router.push("/register") :
                        patient.isAuthenticated ?
                        router.push("/doctorProfile/docChat") : 
                        router.push("/doctorProfile") 

                }}>{!doctor.isAuthenticated && !patient.isAuthenticated ? "Sign Up" : doctor.isAuthenticated?"Profile" : "Messages"}</button>
                <button onClick={() => {
                    doctor.isAuthenticated || patient.isAuthenticated ?
                        dipstach(logoutPatient()) &&
                        dipstach(logoutDoctor()) :
                        router.push("/login")
                }}>{doctor.isAuthenticated || patient.isAuthenticated ? "Log Out" : "Log In"}</button>
            </div>
        </div>
    )
}
export default dynamic (() => Promise.resolve(NavBar), {ssr: false})
