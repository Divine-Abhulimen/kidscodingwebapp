import React from 'react'
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { firebaseConfig } from '../config';

function Newuser() {
    const fetchDataFromSquare = async () => {
        const firestore = getFirestore(app);
      
        try {
          const querySnapshot = await getDocs(collection(firestore, 'square'));
      
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            console.log('Document ID:', doc.id);
            console.log('Name:', data.Name);
            console.log('Last Name:', data['Last Name']); // Square uses space in field names
            console.log('Email:', data.Email);
            console.log('---------------------------');
          });
        } catch (error) {
          console.error('Error fetching data from "square" collection:', error);
        }
      };
      
      // Call the function to fetch and log data
      fetchDataFromSquare();
  return (
    <div>Newuser</div>
  )
}

export default Newuser