// src/components/Login.jsx
import React, { useState } from 'react';
import { auth } from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import './Auth.css';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successfull");
      navigate('/aboutprogram');
    }catch (error) {
      console.error("Error logging in: ", error);
      toast.error("Wrong Email or Password");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      <div className="auth-links">
        <button onClick={() => navigate('/signup')}>Signup</button>
        <button onClick={() => navigate('/forgot-password')}>Forgot Password</button>
        <button onClick={() => navigate('/')}>Go Back</button>
      </div>
    </div>
  );
};

export default Login;
