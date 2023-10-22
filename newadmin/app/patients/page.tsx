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

                <h2 style={{textAlign:"center", fontFamily:"-moz-initial"}}>Patients List </h2>
                <button  className='btnAdd'    > <Link href="/addPatient"> + Ptients </Link> </button>
         
              
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
                <th scope='col'>update</th>
                <th scope='col'>delete</th>
              </tr>
              {
                patients.data.map((e,key)=>{ 
                  return  <tr key={key} className='one'>
                <th scope="col"></th>
                <th scope="col">{e.name}</th>
                <th scope="col">{e.age}</th>
                <th scope="col">{e.gender}</th>
                <th scope='col'>{e.phone}</th>
                <th scope='col'>{e.email}</th>
                <th scope='col'>{e.address}</th>
                <th scope='col'> {e.isBlocked ? <button  id='block' style={{background:"red"}} onClick={()=>{
                  dispatch(updatePatient(e.id))
                }} >Unblock</button> : <button id='block' style={{background:"green"}} onClick={()=>{
                  dispatch(updatePatient(e.id))
                }} >block</button>}</th>
                <th scope='col'><button  id='block' style={{background:"red"}}  onClick={(()=>{      console.log('this is if', e.id);
                   dispatch(removePatient(e.id));
                })} >delete</button></th>
              </tr>
                })
              }
              </table>
              </div>
             
     

     

    </div>
  );
};

export default Page;