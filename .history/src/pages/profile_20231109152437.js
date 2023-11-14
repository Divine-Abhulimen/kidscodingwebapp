import React, { useState, useEffect } from 'react';
import { auth, database } from '../config';
import { doc, getDoc } from 'firebase/firestore';
import Sidepanel from './side-bar';
import './css/profile.css'

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;

    const fetchUserData = async () => {
      if (user) {
        try {
          // Check if user data is in localStorage
          const cachedUserData = localStorage.getItem('userData');
          if (cachedUserData) {
            setUserData(JSON.parse(cachedUserData));
          }

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
  }, []);

  return (

  );
};

export default Profile;
