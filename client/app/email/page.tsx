// EmailForm.js (your Next.js component)
"use client"
import { useState } from 'react';
import axios from 'axios';

const EmailForm = () => {
  const [email, setEmail] = useState('');

  const sendEmail = async () => {
    try {
      await axios.post('/send-email', { email });
      alert('Email sent successfully');
    } catch (error) {
      console.error(error);
      alert('Email sending failed');
    }
  };

  return (
    <div>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={sendEmail}>Send Email</button>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={sendEmail}>Send Email</button>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={sendEmail}>Send Email</button>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={sendEmail}>Send Email</button>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={sendEmail}>Send Email</button>
    </div>
  );
};

export default EmailForm;
