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

  useEffect(() => {
    const user = auth.currentUser;

    const fetchUserData = async () => {
      if (user) {
        try {
          const userDocRef = doc(database, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const newUserData = userDoc.data();
            setUserData(newUserData);

            // Cache the fetched user data in localStorage
            localStorage.setItem('userData', JSON.stringify(newUserData));
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [auth.currentUser?.uid]); // Ensure useEffect runs when UID changes

  const handleMarkAttendance = async () => {
    // In a real scenario, you'd generate a QR code and handle its scanning
    // Here, I'll simulate marking attendance by deducting a class directly

    try {
      const user = auth.currentUser;

      if (user) {
        const userDocRef = doc(database, 'users', user.uid);

        // Fetch the current document data
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const currentClassesRemaining = userDoc.data().classesRemaining;

          if (currentClassesRemaining > 0) {
            // Deduct a class and update the document
            const updatedClassesRemaining = currentClassesRemaining - 1;

            await updateDoc(userDocRef, {
              classesRemaining: updatedClassesRemaining,
            });

            // Fetch and set updated user data
            await fetchUserData();

            console.log('Attendance marked successfully!');
          } else {
            console.log('No classes remaining');
          }
        } else {
          console.log('User document does not exist');
        }
      } else {
        console.log('User not signed in');
      }
    } catch (error) {
      console.error('Error marking attendance:', error);
    }
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
