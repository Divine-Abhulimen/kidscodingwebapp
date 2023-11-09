import React, { useState } from 'react';
import { database } from '../config';
import { collection, doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const AdditionalInfo = ({ user }) => {
  const [name, setName] = useState('');
  const [classesRemaining, setClassesRemaining] = useState('');

  const navigate = useNavigate(); // Get the navigate function from react-router-dom

  const handleSave = async () => {
    // Create a reference to the 'users' collection in Firestore
    const usersCollection = collection(database, 'users');

    try {
      // Set the additional information in Firestore
      const userDocRef = doc(usersCollection, user.uid);

      // Use setDoc to create a new document if it doesn't exist or update the existing document
      await setDoc(userDocRef, {
        name,
        classesRemaining,
      });

      // Navigate to the dashboard or any other appropriate page
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving additional information:', error);
    }
  };

  return (
    <div>
      <h2>Additional Information</h2>
      <form>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Number of Classes Remaining:</label>
          <input
            type="number"
            value={classesRemaining}
            onChange={(e) => setClassesRemaining(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleSave}>
          Save Information
        </button>
      </form>
    </div>
  );
};

export default AdditionalInfo;
