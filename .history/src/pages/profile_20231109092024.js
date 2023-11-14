import React, { useState, useEffect } from 'react';
import { auth, database } from '../config';
import { doc, getDoc } from 'firebase/firestore';

const Profile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const user = auth.currentUser;

    const fetchUserData = async () => {
      if (user) {
        try {
          const userDocRef = doc(database, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            setUserData(userDoc.data());
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      {auth.currentUser && (
        <div>
        <h2>Hello {userData.name}</h2>
          {/* <p>Name: {userData?.name || auth.currentUser.displayName}</p> */}
          <p>Email: {auth.currentUser.email}</p>
          <p>Number of Classes Remaining: {userData?.classesRemaining || 'N/A'}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
