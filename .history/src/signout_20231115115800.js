import React from 'react';
import { auth } from './config'; // Import your Firebase auth instance

const SignOutButton = () => {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      // Redirect or handle any other logic after signing out
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <button type="button" onClick={handleSignOut}>
      Sign Out
    </button>
  );
};

export default SignOutButton;
