import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth'; // Import the Firebase auth module 
import { auth } from './config';
import Home from './pages/home';
import SignIn from './pages/signin';
import SignUp from './pages/signup';
import AdditionalInfo from './pages/additionalinfo'; // Import the AdditionalInfo component
import Dashboard from './pages/home'; // Import the Dashboard component

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
        <Route path='/profile' element={<Profile />} />
        {/* Add a new route for the AdditionalInfo form */}
        <Route
          path="/additionalinfo"
          element={
            hasAdditionalInfo(user) ? (
              <Navigate to="/dashboard" />
            ) : (
              <AdditionalInfo user={user} />
            )
          }
        />
        {/* Add a route for the dashboard */}
        <Route
          path="/dashboard"
          element={
            hasAdditionalInfo(user) ? <Dashboard user={user} /> : <Navigate to="/additionalinfo" />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
