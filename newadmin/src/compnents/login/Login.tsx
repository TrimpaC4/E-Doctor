"use client";

import LoginStyle from "./Login.module.css";
import { useState } from "react";

const Login: React.FC = () => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const handleEmailInput = (input: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInput(input.target.value);
  };

  const handlePasswordInput = (input: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordInput(input.target.value);
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
        <button>Sign in</button>
      </div>
    </div>
  );
};

export default Login;
