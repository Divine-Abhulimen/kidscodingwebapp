import React, { useState, useEffect } from 'react';
import { auth, database } from '../config';
import { doc, getDoc } from 'firebase/firestore';

const Profile = ({ user }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userDocRef = doc(database, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
  
        if (userDoc.exists()) {
          const userData = userDoc.data();
          console.log('User Data:', userData);
          setUserData(userData);
        }
      }
    };
  
    fetchUserData();
  }, [user]);
  

  return (
    <div>
      <h2>Your Profile</h2>
      {user && (
        <div>
          <p>Name: {userData && userData.name ? userData.name : user.displayName}</p>
          <p>Email: {user.email}</p>
          <p>Number of Classes Remaining: {userData && userData.classesRemaining ? userData.classesRemaining : 'N/A'}</p>
        </div>
      )}
    </div>
  );
  
};

export default Profile;
