import { collection, query, where, getDocs } from 'firebase/firestore';
import { firestore } from '../config'; // Assuming you have your Firestore instance configured

// Specify the collection and the field you want to query
const collectionRef = collection(firestore, 'yourCollection');
const fieldToQuery = 'email';
const valueToMatch = 'example@example.com';

// Create a query to find the document based on the specified field and value
const q = query(collectionRef, where(fieldToQuery, '==', valueToMatch));

// Execute the query
const querySnapshot = await getDocs(q);

// Check if there are any matching documents
if (!querySnapshot.empty) {
  // Access the first matching document
  const firstDoc = querySnapshot.docs[0];

  // Access the reference to the document
  const userDocRef = firstDoc.ref;

  // Now you can use userDocRef to perform operations on that specific document
} else {
  console.log('No matching documents found.');
}
