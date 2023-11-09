import React, { useState } from 'react';
import { auth } from '../config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import "./css/signup.css";

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Get the navigate function

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // User signed up successfully

      // Redirect to the additional info page after successful sign-up
      navigate('/additionalinfo');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="container">
      <div className="header">
        {/*Title*/}
        <div className="text">Sign Up</div>
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
          <button className="signin-btn" type="button" onClick={handleSignUp}>
            Sign Up
          </button>
        </div>

        <div className="links">
          {/*Sign-up page redirection*/}
          <p>
            Have an account?<Link className="link" to="/signin">Sign in</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
