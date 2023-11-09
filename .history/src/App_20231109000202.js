import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth'; // Import the Firebase auth module
import { auth } from './config';
import Home from './pages/home';
import SignIn from './pages/signin';
import SignUp from './pages/signup';
import AdditionalInfo from './pages/additionalinfo'; // Import the AdditionalInfo component
import Profile from './pages/profile'; // Import the Profile component

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return unsubscribe;
  }, []);

  // Define a function to check if the user has provided additional information
  const hasAdditionalInfo = (user) => {
    return user && user.displayName && user.email;
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        {/* Add a new route for the AdditionalInfo form */
        <Route
          path="/additionalinfo"
          element={
            hasAdditionalInfo(user) ? (
              <Navigate to="/profile" /> // Redirect to the Profile page if additional info exists
            ) : (
              <AdditionalInfo user={user} />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth'; // Import the Firebase auth module
import { auth } from './config';
import Home from './pages/home';
import SignIn from './pages/signin';
import SignUp from './pages/signup';
import AdditionalInfo from './pages/additionalinfo'; // Import the AdditionalInfo component
import Profile from './pages/profile'; // Import the Profile component

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return unsubscribe;
  }, []);

  // Define a function to check if the user has provided additional information
  const hasAdditionalInfo = (user) => {
    return user && user.displayName && user.email;
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        {/* Add a new route for the AdditionalInfo form */
        <Route
          path="/additionalinfo"
          element={
            hasAdditionalInfo(user) ? (
              <Navigate to="/profile" /> // Redirect to the Profile page if additional info exists
            ) : (
              <AdditionalInfo user={user} />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
