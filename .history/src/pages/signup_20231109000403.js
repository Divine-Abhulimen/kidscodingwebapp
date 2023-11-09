import React, { useState } from 'react';
import { auth } from '../config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

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
    <div>
      <h2>Sign Up</h2>
      <form>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleSignUp}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
