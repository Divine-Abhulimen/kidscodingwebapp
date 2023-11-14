import React, { useEffect } from 'react';
import SideBar from './side-bar';
import { auth, database } from '../config';
import { doc, getDoc } from 'firebase/firestore';
import './css/index.css';
import { useUser } from '../Usercontext';

function Home() {
  const { userData, setUserData, loading, setLoading } = useUser();

  useEffect(() => {
    const user = auth.currentUser;

    const fetchUserData = async () => {
      if (user) {
        try {
          const cachedUserData = localStorage.getItem('userData');
          if (cachedUserData) {
            setUserData(JSON.parse(cachedUserData));
          }

          const userDocRef = doc(database, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const newUserData = userDoc.data();
            setUserData(newUserData);

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
  }, [setUserData, setLoading]);

  // ... rest of your component
}

export default Home;
