"use client"
import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import  './home.css';

const home = () => {
  return (
        <div> 
           
           <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">
 open
</button>

<div className="offcanvas offcanvas-start" data-bs-backdrop="static" tabIndex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
  <div className="offcanvas-header">
    <h5 className="offcanvas-title" id="staticBackdropLabel">Admin Dachbord</h5>
    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div className="offcanvas-body">
    <div>
<ul className='sidebar' >
  <li type="button">  stat </li>
  <li type="button">  Ptients</li>
  <li type="button"> Doctors </li>
  <li type="button"> Setting </li>
  <li type="button">Logout </li>

</ul>

     </div>
  </div>
</div>
            

        </div>
         
  )



 
  
  
}

export default home
