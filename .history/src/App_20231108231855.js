import React, { useState } from 'react';
import Home from './pages/home';
import SignIn from './pages/signin';
import SignUp from './pages/signup';
import AdditionalInfo from './pages/additionalinfo'; // Import the AdditionalInfo component
import Dashboard from './pages/dashboard'; // Import the Dashboard component
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
  // Define a function to check if the user has provided additional information
  const hasAdditionalInfo = (user) => {
    return user.displayName && user.email;
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
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
