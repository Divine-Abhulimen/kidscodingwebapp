import { app } from './config';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, onSnapshot, collection, addDoc } from 'firebase/firestore';

// Initialize Firebase app
const firebaseConfig = {
  // Your Firebase config object
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase authentication and firestore
const auth = getAuth(app);
const firestore = getFirestore(app);

// Reference to the specific Firestore document
const userDocRef = doc(firestore, 'yourCollection', 'yourDocumentId');

// Listen for changes in the Firestore document
onSnapshot(userDocRef, async (docSnapshot) => {
  // Check if the document exists
  if (docSnapshot.exists()) {
    const userData = docSnapshot.data();

    // Extract relevant fields from the document
    const { email, name, password } = userData;

    try {
      // Create a new user with the extracted fields
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store additional user data in a separate Firestore collection
      const userCollectionRef = collection(firestore, 'userData');
      await addDoc(userCollectionRef, {
        uid: user.uid,
        name: name,
        // Add more fields as needed
      });

      console.log('New user created:', user);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  }
});

// Note: This is a simplified example. Make sure to handle errors and edge cases appropriately.
