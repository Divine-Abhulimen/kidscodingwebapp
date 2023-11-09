import React, { useState, useEffect } from 'react';
import { auth, database } from '../config';
import { doc, getDoc } from 'firebase/firestore';

const Dashboard = ({ user }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userDocRef = doc(database, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      }
    };

    fetchUserData();
  }, [user]);

  return (
    <div>
      <h2>Welcome, {user.displayName}</h2>
      {userData && (
        <div>
          <p>Email: {user.email}</p>
          <p>Name: {userData.name}</p>
          <p>Number of Classes Remaining: {userData.classesRemaining}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
