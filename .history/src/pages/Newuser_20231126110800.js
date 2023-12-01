import React, { useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, onSnapshot, createUserWithEmailAndPassword } from 'firebase/firestore';
import { app, auth } from '../config';

function Newuser() {
  useEffect(() => {
    const firestore = getFirestore(app);

    const fetchDataFromSquare = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'square'));

        querySnapshot.forEach(async (doc) => {
          const data = doc.data();
          const email = data.Email;
          const password = '12345'; // Set a default password

          try {
            // Create a user with email and password
            await createUserWithEmailAndPassword(auth, email, password);

            console.log(`User created for email: ${email}`);
          } catch (error) {
            console.error(`Error creating user for email ${email}:`, error);
          }

          console.log('Document ID:', doc.id);
          console.log('Name:', data.Name);
          console.log('Last Name:', data['Last Name']); // Square uses space in field names
          console.log('Email:', email);
          console.log('---------------------------');
        });
      } catch (error) {
        console.error('Error fetching data from "square" collection:', error);
      }
    };

    // Set up a real-time listener for the "square" collection
    const unsubscribe = onSnapshot(collection(firestore, 'square'), () => {
      // Fetch and create users whenever the "square" collection changes
      fetchDataFromSquare();
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []); // Empty dependency array to run the effect only once

  return <div>Newuser</div>;
}

export default Newuser;
