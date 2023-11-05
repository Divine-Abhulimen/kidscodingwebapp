// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbU3d40IC4pAOG8kr2eDiSXAD2-r_X4Pw",
  authDomain: "spacestation-b18c6.firebaseapp.com",
  projectId: "spacestation-b18c6",
  storageBucket: "spacestation-b18c6.appspot.com",
  messagingSenderId: "333641139298",
  appId: "1:333641139298:web:8eeb685eb5339af8a0fd3b",
  measurementId: "G-RTYVBQEEZC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const database = getFirestore(app);

// import React from 'react'
// import SideBar from './side-bar'
// import './css/index.css'
// import { database } from '../config'
// import { collection, doc, getDocs } from "firebase/firestore";
// import ProfilePic from './css/images/ben-den-engelsen-YUu9UAcOKZ4-unsplash.jpg'
// import courseImg from './css/images/annie.jpg'
// import { useState, useEffect } from 'react'
// function Home() {
//     const [courseName, setCourseName] = useState('');
//     const [courseDescription, setCourseDescription] = useState('');

//     const coursesRef = collection(database, 'Summer Camp');
//     // ... (previous code for form submission)

//     // State to store the retrieved data from Firestore
//     const [fetchedData, setFetchedData] = useState([]);

//     const fetchData = async () => {
//         try {
//             console.log('Fetching data...');
//             const querySnapshot = await getDocs(collection(database, 'Summer Camp'));
//             const data = [];
//             querySnapshot.forEach((doc) => {
//                 console.log('Document ID:', doc.id);
//                 data.push(doc.data());
//             });
//             console.log('Fetched data:', data);
//             setFetchedData(data);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };

//     useEffect(() => {
//         fetchData(); // Fetch data when the component mounts

//         if (fetchedData.length > 0) {
//             // Ensure fetchedData is not empty before accessing its properties
//             setCourseDescription(fetchedData[0].Description); // Assuming you want to access the first document's Description
//             setCourseName(fetchedData[0].id); // Assuming you want to access the first document's ID

//         }
//     }, [fetchedData]);

//     // Rest of your component code


//     return (
//         <div className='page'>
//             <SideBar />
//             <div className='content'>
//                 <div className='top-bar'>
//                     <div className='d-flex align-items-start top-text'>
//                         <h4>Hello UserName</h4>
//                         <p>Course Overview</p>
//                     </div>
//                     <div className='top-image'>
          
//                     <section className='profilePicture' style={{ background: { ProfilePic } }}>

//                     </section>
//                     <h4>UserName</h4>
//                 </div>
//             </div>

//             <div className='courses'>
//                 <div className='card'>
//                     <div className='image' style={{ background: { courseImg } }}></div>
//                     <div className='text'>
//                         {courseName && courseDescription ? (
//                             <div>
//                                 <h4>{courseName}</h4>
//                                 <p>{courseDescription}</p>
//                             </div>
//                         ) : (
//                             <p>Loading course information...</p>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//         </div>
//     )



// }

// export default Home