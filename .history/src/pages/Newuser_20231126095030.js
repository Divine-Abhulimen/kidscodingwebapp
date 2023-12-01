import React, { useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
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
          const password = '123456'; // Set a default password

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

    // Call the function to fetch and log data
    fetchDataFromSquare();
  }, []); // Empty dependency array to run the effect only once

  return <div>Newuser</div>;
}

export default Newuser;
