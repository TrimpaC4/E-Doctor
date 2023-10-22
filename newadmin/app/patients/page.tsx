"use client"
import React, { useEffect } from 'react';
import { RootState, useAppDispatch, useAppSelector } from '../store';
import { addPatient,  getPatient, removePatient, selectPatient, updatePatient } from '../store/patientSlice';
import "./patient.css"
import Link from "next/link";
import Image from 'next/image'
import { useSelector } from 'react-redux';


const Page = () => {
  const patients = useAppSelector(selectPatient);
  const dispatch = useAppDispatch();
  console.log(patients.data)
  useEffect(() => {
    dispatch(getPatient())
  }, [dispatch]);

  return (
    <div>
                <h2 style={{textAlign:"center"}}>Patients List </h2>
                <button  className='btnAdd'  style={{ backgroundColor: '#008CBA' }}  > <Link href="/addPatient"> + Ptients </Link> </button>
         
              
              <div className='tablee'>
   <table className="table">
   <tr>
                <th scope="col"></th>
                <th scope="col">name</th>
                <th scope="col">age</th>
                <th scope="col">gendre</th>
                <th scope='col'>phone</th>
                <th scope='col'>Email</th>
                <th scope='col'>Adress</th>
              </tr>
              </table>
              </div>
             
      {patients.data.map((e, i) => (
        <div className='tablee' key={i}>
          <table className="table">
          
            <tbody>
              <tr className='tr'>
                <th scope="row">{e.id}</th>
                <th scope="row">
               
                  </th>
                <td className='td'>{e.name}</td>

                <td>{e.age}</td>
                <td>{e.gender}</td>
                <td>{e.phone}</td>
                <td>{e.email}</td>
                <td>{e.address}</td>
                {e.isBlocked ? <button onClick={()=>{
                  dispatch(updatePatient(e.id))
                }} >Unblock</button> : <button onClick={()=>{
                  dispatch(updatePatient(e.id))
                }} >block</button>}

                <button className='btnDelete' style={{ backgroundColor: 'red' }} onClick={(()=>{      console.log('this is if', e.id);
                   dispatch(removePatient(e.id));
                })} >delete</button>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
          

          {/* <form className="px-7 h-screen grid justify-center items-center">
    <div className="grid gap-6" id="form">
      <div className="w-full flex gap-3">
        <input className="capitalize shadow-2xl p-3 ex w-full outline-none focus:border-solid focus:border-[1px] border-[#035ec5] placeholder:text-black" type="text" placeholder="First Name" id="First-Name" name="First-Name" required=""/>
        <input className="p-3 capitalize shadow-2xl  glass w-full placeholder:text-black outline-none focus:border-solid focus:border-[1px] border-[#035ec5]" type="text" placeholder="Last Name" id="Last-Name" name="Last-Name"/>
      </div>
      <div className="grid gap-6 w-full">
        <input className="p-3 shadow-2xl  glass w-full placeholder:text-black outline-none focus:border-solid border-[#035ec5] focus:border-[1px]" type="Email" placeholder="Email" id="Email" name="email"/>
        <input className="p-3 shadow-2xl   glass w-full text-black outline-none focus:border-solid focus:border-[1px]border-[#035ec5]" type="date" required=""/>
      </div>
      <div className="flex gap-3">
        <input className="p-3 glass shadow-2xl  w-full placeholder:text-black outline-none focus:border-solid focus:border-[1px] border-[#035ec5]" type="password" placeholder="Password" id="password" name="password" required=""/>
        <input className="p-3 glass shadow-2xl  w-full placeholder:text-black outline-none focus:border-solid focus:border-[1px] border-[#035ec5]" type="password" placeholder="Confirm password" required=""/>
      </div>
      <button className="outline-none glass shadow-2xl  w-full p-3  bg-[#ffffff42] hover:border-[#035ec5] hover:border-solid hover:border-[1px]  hover:text-[#035ec5] font-bold" type="submit">Submit</button>
    </div>
  </form> */}

     

    </div>
  );
};

export default Page;