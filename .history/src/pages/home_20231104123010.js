import React from 'react'
import SideBar from './side-bar'
import './css/index.css'
import { database } from '../config'
import { collection, doc, getDocs } from "firebase/firestore"; 
import ProfilePic from './css/images/ben-den-engelsen-YUu9UAcOKZ4-unsplash.jpg'
import courseImg from './css/images/annie.jpg'
import { useState, useEffect} from 'react'
function Home() {
    const [courseName, setCourseName] = useState('');

    const coursesRef = collection(database, 'Summer Camp');
    // ... (previous code for form submission)

    // State to store the retrieved data from Firestore
    const [fetchedData, setFetchedData] = useState([]);

    // Function to fetch data from Firestore
    const fetchData = async () => {
        try {
            console.log('Fetching data...');
            const querySnapshot = await getDocs(collection(database, 'Summer Camp'));
            const data = [];
            querySnapshot.forEach((doc) => {
                console.log('Document ID:', doc.id);
                data.push(doc.data());
            });
            console.log('Fetched data:', data);
            setFetchedData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }

        setCourseName = fetchedData.Description;
        console.log(courseName);
    };


    // Use useEffect to fetch data when the component mounts
    useEffect(() => {
        fetchData();
    }, []);
 
    return (
        <div className='page'>
            <SideBar />
            <div className='content'>
                <div className='top-bar'>

                    <div className='d-flex align-items-start top-text'>
                        <h4>Hello UserName</h4>
                        <p>Course Overview</p>
                    </div>

                    <div className='top-image'>
                        <section className='profilePicture' style={{background: {ProfilePic}}}>

                        </section>
                        <h4>UserName</h4>
                    </div>
                </div>

                <div className='courses'>
                <div className='card'>
                        <div className='image' style={{background: {courseImg}}}></div>
                        <div className='text'>
                            <h4></h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home