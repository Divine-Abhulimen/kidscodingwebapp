import React from 'react';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth'; // Import useAuthState
import { auth } from './config';

const AuthenticationButton = () => {
  const [user] = useAuthState(auth); // useAuthState hook

  const SignOutButton = () => {
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
        <button type="button" onClick={handleSignOut}>
          Sign Out
        </button>
      );
    } else {
      // User is not signed in
      return (
        <Link to="/signin">
          <button>
            Sign In
          </button>
        </Link>
      );
    }
  };

  return <SignOutButton />;
};

export default AuthenticationButton;
