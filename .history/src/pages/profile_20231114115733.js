import React, { useState, useEffect } from 'react';
import { auth, database } from '../config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import Sidepanel from './side-bar';
import './css/profile.css';

const Profile = () => {
  const [userData, setUserData] = useState(() => {
    // Try to get user data from localStorage on initial load
    const cachedUserData = localStorage.getItem('userData');
    return cachedUserData ? JSON.parse(cachedUserData) : null;
  });
  const [loading, setLoading] = useState(true);

  // Declare fetchUserData outside useEffect
  const fetchUserData = async () => {
    try {
      const user = auth.currentUser;

      if (user) {
        const userDocRef = doc(database, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const newUserData = userDoc.data();
          setUserData(newUserData);

          // Cache the fetched user data in localStorage
          localStorage.setItem('userData', JSON.stringify(newUserData));
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Call fetchUserData directly
    fetchUserData();
  }, [auth.currentUser?.uid]); // Ensure useEffect runs when UID changes

  const handleMarkAttendance = async () => {
    // ... (unchanged)

    // Call fetchUserData after marking attendance to update the displayed data
    await fetchUserData();
  };

  return (
    <div className='profile-content'>
      <Sidepanel />
      {loading ? (
        <p>Loading...</p>
      ) : (
        auth.currentUser && (
          <div>
            <h2>Hello {userData?.name || auth.currentUser.displayName}</h2>
            <p>Email: {auth.currentUser.email}</p>
            <p>Number of Classes Remaining: {userData?.classesRemaining || 'N/A'}</p>

            <button onClick={handleMarkAttendance}>Mark Attendance</button>
          </div>
        )
      )}
    </div>
  );
};

export default Profile;
