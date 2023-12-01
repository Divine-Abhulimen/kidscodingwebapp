// userCreationScript.js
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, database } from '../config';


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

  try {
    const querySnapshot = await getDocs(collection(database, 'square'));
    const users = [];

    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      users.push(userData);

      // Create a user account (you may need to customize this part based on your user creation logic)
      const { Email, Name, LastName } = userData;
      const password = '12345';

      // Log information for each user
      console.log(`Creating user account for ${Name} ${LastName} with email ${Email}`);

      // Your user creation logic goes here (e.g., create a new user with auth.createUserWithEmailAndPassword)
    });

    // Log all users retrieved from Firestore
    console.log('Users from Firestore:', users);
  } catch (error) {
    console.error('Error creating users:', error);
  }
};

export default createUsersFromFirestore;
