// `import React from 'react';
// import { auth } from './config'; // Import your Firebase auth instance'
// import { signOut } from 'firebase/auth'; // Correct import for signOut function

// const SignOutButton = () => {
//   const handleSignOut = async () => {
//     try {
//       await signOut(auth);
//       // Redirect or handle any other logic after signing out
//     } catch (error) {
//       console.error('Error signing out:', error);
//     }
//   };

//   return (
//     
//   );
// };

// export default SignOutButton;
import React from 'react';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth'; // Import useAuthState
import { auth } from './config';

const AuthenticationButton = () => {
  const [user] = useAuthState(auth); // Use useAuthState to get the user's authentication state

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
