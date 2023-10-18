"use client"
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { addPatient, getPatient, selectPatient } from '../store/patientSlice';
import "./patient.css"
import Link from "next/link";


const Page = () => {
  const dispatch = useAppDispatch();
  const patients = useAppSelector(selectPatient);

  console.log("these are patients", patients.data);

  useEffect(() => {
    dispatch(getPatient());
  }, [dispatch]);

  return (
    <div>
                <h1>List Patients</h1>
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
                <td className='td'>{e.name}</td>
                <td>{e.age}</td>
                <td>{e.gender}</td>
                <td>{e.phone}</td>
                <td>{e.email}</td>
                <td>{e.address}</td>
                <button className='btnDelete' style={{ backgroundColor: 'red' }} >delete</button>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default Page;