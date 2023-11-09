import React, { useState } from 'react';
import { auth } from '../config';
import { signInWithEmailAndPassword } from 'firebase/auth'; 
import { Link } from 'react-router-dom'
const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // User signed in successfully
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
        console.log('User is authenticated:', authUser);
      } else {
        setUser(null);
        console.log('User is not authenticated');
      }
    });
  
    return unsubscribe;
  }, []);
  

  return (
    <div>
      <h2>Sign In</h2>
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
        <button type="button" onClick={handleSignIn}>
          Sign In
        </button>
        <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
      </form>
    </div>
  );
};

export default SignIn;
