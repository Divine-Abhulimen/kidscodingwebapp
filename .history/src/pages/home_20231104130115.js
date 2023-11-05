import React, { useState, useEffect } from 'react';
import SideBar from './side-bar';
import './css/index.css';
import { database } from '../config';
import { collection, getDocs } from 'firebase/firestore';

function Home() {
    const [courseName, setCourseName] = useState('');
    const [courseDescription, setCourseDescription] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(database, 'Summer Camp'));
                if (!querySnapshot.empty) {
                    const doc = querySnapshot.docs[0];
                    const data = doc.data();
                    setCourseName(data.courseName || '');
                    setCourseDescription(data.courseDescription || '');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // Fetch data when the component mounts
    }, []); // An empty dependency array ensures it runs only on the initial render

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
                        {/* Display profile picture here */}
                        <h4>UserName</h4>
                    </div>
                </div>

                <div className='courses'>
                    <div className='card'>
                        <div className='text'>
                            <h4>{courseName}</h4>
                            <p>{courseDescription}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
