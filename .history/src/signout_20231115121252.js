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
//     <button type="button" onClick={handleSignOut}>
//       Sign Out
//     </button>
//   );
// };

// export default SignOutButton;

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config';

const AuthenticationButton = () => {
  const [user] = useAuthState(auth);

  if (user) {
    // User is signed in
    return (
      <button onClick={() => auth.signOut()}>
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

export default AuthenticationButton;
