"use client";

import LoginStyle from "./Login.module.css";
import { useState } from "react";
import axios from 'axios';

const Login: React.FC = () => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [message, setMessage] = useState('');

  const handleEmailInput = (input: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInput(input.target.value);
  };

  const handlePasswordInput = (input: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordInput(input.target.value);
  };

  const handleSignIn = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/AdminDoc/signin', {
        email: emailInput,  // Assuming your API expects "email" and "password" properties
        password: passwordInput,
      });
      
      if (response.status === 200) {
        const data = response.data;
        if (data.success) {
          setMessage('Sign-in successful');
        } else {
          setMessage(data.message);
        }
      } else {
        setMessage('An error occurred');
      }
    } catch (error) {
      console.error(error);
      setMessage('An error occurred');
    }
  };
  


  return (
    <div className={LoginStyle.AdminLoginMainContainer}>
      <div className={LoginStyle.LoginMainContainer}>
        <p>Sign in</p>
        <div className={LoginStyle.LoginInputs}>
          <input
            type="text"
            placeholder="Email or Username"
            value={emailInput}
            onChange={handleEmailInput}
          ></input>

          <input
            type="password"
            placeholder="Password"
            value={passwordInput}
            onChange={handlePasswordInput}
          ></input>
        </div>
        <button onClick={handleSignIn}>Sign in</button>
      </div>
    </div>
  );
};

export default Login;
