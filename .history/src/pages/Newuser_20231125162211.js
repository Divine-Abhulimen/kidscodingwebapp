import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, setDoc, doc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

// Initialize Firebase
const firebaseConfig = {
  // Your Firebase config here
};

const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

const createFirebaseUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('User created:', user.uid);
    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    return null;
  }
};

const createUsersFromFirestore = async () => {
  try {
    const usersCollectionRef = collection(firestore, 'square');
    const querySnapshot = await getDocs(usersCollectionRef);

    querySnapshot.forEach(async (doc) => {
      const userData = doc.data();
      const email = userData.Email;
      const password = '12345';

      // Check if the user already exists (optional)
      // You can skip creating a new user if you want to avoid duplicates
      // For example, check if the user's email is already registered

      // Create user account
      await createFirebaseUser(email, password);

      // Optionally, you can store additional information in a separate 'users' collection
      const usersCollection = collection(firestore, 'users');
      const userDocRef = doc(usersCollection, email);
      await setDoc(userDocRef, {
        email: email,
        lastName: userData['Last Name'],
        name: userData['Name'],
      });
    });
  } catch (error) {
    console.error('Error fetching data from Firestore:', error);
  }
};

// Call the function to create users from Firestore
createUsersFromFirestore();
