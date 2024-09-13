// src/components/ForgotPassword.jsx
import React, { useState } from 'react';
import { auth } from './firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import './Auth.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent!");
      alert('Password reset email sent!');
      navigate('/studentlogin');
    } catch (error) {
      console.error("Error resetting password: ", error);
    }
  };

  return (
    <div className="auth-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handlePasswordReset}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      <div className="auth-links">
        <button onClick={() => navigate('/studentlogin')}>Back to Login</button>
      </div>
    </div>
  );
};

export default ForgotPassword;
