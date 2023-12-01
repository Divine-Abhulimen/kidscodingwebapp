// userCreationScript.js
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, setDoc, getDoc } from 'firebase/firestore';

const firebaseConfig = {
  // Your Firebase config here
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

const createUsersFromFirestore = async () => {
  try {
    const squareCollectionRef = collection(firestore, 'square'); // Replace with your actual collection name
    const squareSnapshot = await getDocs(squareCollectionRef);

    squareSnapshot.forEach(async (userDoc) => {
      const { Email, LastName, Name } = userDoc.data();

      // Check if the user already exists by email
      const existingUserDocRef = doc(firestore, 'users', Email);
      const existingUserDoc = await getDoc(existingUserDocRef);

      if (!existingUserDoc.exists()) {
        // Create a new user
        const newUser = {
          email: Email,
          password: '12345', // Set a default password
          displayName: Name,
        };

        // Add the new user to the 'users' collection
        await setDoc(existingUserDocRef, newUser);

        console.log(`User created: ${Email}`);
      } else {
        console.log(`User already exists: ${Email}`);
      }
    });

    console.log('User creation process completed.');
  } catch (error) {
    console.error('Error creating users:', error);
  }
};

export default createUsersFromFirestore;
