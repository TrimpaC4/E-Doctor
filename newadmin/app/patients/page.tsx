"use client"
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { addPatient, getPatient, removePatient, selectPatient } from '../store/patientSlice';
import "./patient.css"
import Link from "next/link";
import Image from 'next/image'


const Page = () => {
  const patients = useAppSelector(selectPatient);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPatient());
  }, [dispatch]);

  return (
    <div>
                <h2 style={{textAlign:"center"}}>Patients List </h2>
                <button  className='btnAdd'  style={{ backgroundColor: '#008CBA' }}  > <Link href="/addPatient"> + Ptients </Link> </button>
         
              
              <div className='tablee' >
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
                <button >block</button>
                <button className='btnDelete' style={{ backgroundColor: 'red' }} onClick={(()=>{      console.log('this is if', e.id);
                   dispatch(removePatient(e.id));
                })} >delete</button>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default Page;