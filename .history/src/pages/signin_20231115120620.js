import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate
import { auth } from '../config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import "./css/signup.css";

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate
  
  
  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // User signed in successfully
      navigate('/profile'); // Navigate to the profile page
    } catch (error) {
      console.error("Error signing in:", error);
      console.error("Error signing in:", error);
    }
  };

  return (
    <div className="container">
    <div className="header">
      {/*Title*/}
      <div className="text">Sign in</div>
      <div className="underline"></div>
    </div>

    <form className="signin-form">
      {/*Email field*/}
      <div className="input">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="input">
        {/*Password field*/}
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="btn-container">
        {/*Sign-in button*/}
        <button type="button" onClick={handleSignIn}>
          Sign In
        </button>
      </div>
      
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </form>
  </div>
  );
};

export default SignIn;
