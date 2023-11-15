import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from './config';
import { onAuthStateChanged } from 'firebase/auth';


const AuthenticationButton = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Add an observer to watch for changes in the user's authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    // Clean up the observer when the component is unmounted
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      // Redirect or handle any other logic after signing out
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (user) {
    // User is signed in
    return (
      <button className="btn" type="button" onClick={handleSignOut}>
        Sign Out
      </button>
    );
  } else {
    // User is not signed in
    return (
      <Link to="/signin">
        <button className='btn'>
          Sign In
        </button>
      </Link>
    );
  }
};

export default AuthenticationButton;
