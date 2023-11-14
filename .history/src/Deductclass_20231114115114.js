import { doc, updateDoc } from 'firebase/firestore';
import { auth, database } from '../config';

// Function to deduct a class
const deductClass = async () => {
  try {
    const user = auth.currentUser;

    if (user) {
      const userDocRef = doc(database, 'users', user.uid);

      // Fetch the current document data
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const currentClassesRemaining = userDoc.data().classesRemaining;

        if (currentClassesRemaining > 0) {
          // Deduct a class and update the document
          const updatedClassesRemaining = currentClassesRemaining - 1;

          await updateDoc(userDocRef, {
            classesRemaining: updatedClassesRemaining,
          });

          console.log('Class deducted successfully!');
        } else {
          console.log('No classes remaining');
        }
      } else {
        console.log('User document does not exist');
      }
    } else {
      console.log('User not signed in');
    }
  } catch (error) {
    console.error('Error deducting class:', error);
  }
};

export default deductClass;
