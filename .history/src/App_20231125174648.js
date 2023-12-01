import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth'; // Import the Firebase auth module
import { auth } from './config';
import Home from './pages/home';
import SignIn from './pages/signin';
import SignUp from './pages/signup';
import AdditionalInfo from './pages/additionalinfo'; // Import the AdditionalInfo component
import Profile from './pages/profile'; // Import the Profile component
import { database } from './config'; // Adjust the path based on your project structure
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import createUsersFromFirestore from './pages/Newuser';

function App() {
  useEffect(() => {
    createUsersFromFirestore(); // Call the function when the component mounts
  }, []);
  
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);

        const logoutTimer = setInterval(async () => {
          await signOut(auth);
          clearInterval(logoutTimer);
        }, 15 * 60 * 60 * 1000); // 15 hours in milliseconds
      } else {
        setUser(null);
      }
    });

    return unsubscribe;
  }, []);

  const deductClasses = async (userId) => {
    try {
      const userDocRef = doc(database, 'users', userId);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const updatedClassesRemaining = userData.classesRemaining - 1;

        await updateDoc(userDocRef, { classesRemaining: updatedClassesRemaining });
      }
    } catch (error) {
      console.error('Error deducting classes:', error);
    }
  };

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
        {/* Add a new route for the AdditionalInfo form */}
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
