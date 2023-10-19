"use client";
import Link from "next/link";
import React, { FunctionComponent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { addPatient, getPatient, selectPatient } from "../store/patientSlice";
import "./style.css";

const Add: FunctionComponent = () => {
  const [name, setName] = useState<String>("");
  const [age, setAge] = useState<String>("");
  const [email, setEmail] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const [phone, setPhone] = useState<String>("");
  const [cin, setCin] = useState<String>("");
  const [gender, setGender] = useState<String>("");
  const [image, setImage] = useState<String>("");
  const [address, setAddress] = useState<String>("");

  const dispatch = useAppDispatch();
  const patients = useAppSelector(selectPatient);
  return (
    <div className="input_main_container">
      <div className="input_container">
        <div className="inputt">
          <h1> add patient </h1>
          <input
            type="text"
            placeholder="name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="age"
            onChange={(e) => {
              setAge(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="phone"
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="address"
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="cin"
            onChange={(e) => {
              setCin(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="gender"
            onChange={(e) => {
              setGender(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="image"
            onChange={(e) => {
              setImage(e.target.value);
            }}
          />
          <button
            onClick={() => {
              dispatch(
                addPatient({
                  name,
                  age: +age,
                  email,
                  password,
                  phone: +phone,
                  cin,
                  gender,
                  avatarUrl: image,
                  address,
                })
              );
            }}
          >
            Create Patient
          </button>
        </div>
      </div>
    </div>
  );
};

export default Add;
