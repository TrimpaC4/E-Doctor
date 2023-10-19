"use client"
import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import  './home.css';

const Home =() => {
  return (
    <React.Fragment> 
      <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">
        Nav
      </button>

      <div className="offcanvas offcanvas-start" data-bs-backdrop="static"  id="staticBackdrop" aria-labelledby="staticBackdropLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="staticBackdropLabel">Admin Dashboard</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <div>
            <ul className='sidebar' >
              <li className="sidebar-item" key="1">stat</li>
              <li className="sidebar-item" key="2">Patients</li>
              <li className="sidebar-item" key="3">Doctors</li>
              <li className="sidebar-item" key="4">Setting</li>
              <li className="sidebar-item" key="5">Logout</li>
            </ul>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Home