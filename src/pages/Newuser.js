import React, { useState, useEffect } from 'react';
import {
  initializeApp,
  getApps,
  getApp,
} from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
} from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  getAuth,
} from 'firebase/auth';
import { app, auth } from '../config';

function Newuser() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDataFromSquare = async () => {
      const firestore = getFirestore(app);
      setLoading(true);

      try {
        const querySnapshot = await getDocs(collection(firestore, 'square'));

        querySnapshot.forEach(async (doc) => {
          const data = doc.data();
          const email = data.Email;
          const password = '123456'; // Set a default password

          try {
            const auth = getAuth();
            // Create a user with email and password
            await createUserWithEmailAndPassword(auth, email, password);

            // Call the Cloud Function to create users
            await fetch('YOUR_CLOUD_FUNCTION_URL', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email, name: data.Name, lastName: data['Last Name'] }),
            });

            console.log(`User created for email: ${email}`);
          } catch (error) {
            console.error(`Error creating user for email ${email}:`, error);
            setError(`Error creating user for email ${email}: ${error.message}`);
          }

          console.log('Document ID:', doc.id);
          console.log('Name:', data.Name);
          console.log('Last Name:', data['Last Name']); // Square uses space in field names
          console.log('Email:', email);
          console.log('---------------------------');
        });

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data from "square" collection:', error);
        setError(`Error fetching data from "square" collection: ${error.message}`);
        setLoading(false);
      }
    };

    // Set up a real-time listener for the "square" collection
    const unsubscribe = onSnapshot(collection(getFirestore(app), 'square'), () => {
      // Fetch and create users whenever the "square" collection changes
      fetchDataFromSquare();
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []); // Empty dependency array to run the effect only once

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && <p>New users created successfully!</p>}
    </div>
  );
}

export default Newuser;
