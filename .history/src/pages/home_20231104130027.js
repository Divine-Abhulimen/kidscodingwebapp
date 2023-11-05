import React, { useState, useEffect } from 'react';
import SideBar from './side-bar';
import './css/index.css';
import { database } from '../config';
import { collection, getDocs } from 'firebase/firestore';

function Home() {
    const [courseName, setCourseName] = useState('');
    const [courseDescription, setCourseDescription] = useState('');

    // State to store the retrieved data from Firestore
    const [fetchedData, setFetchedData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('Fetching data...');
                const querySnapshot = await getDocs(collection(database, 'Summer Camp'));
                const data = [];
                querySnapshot.forEach((doc) => {
                    console.log('Document ID:', doc.id);
                    data.push({ id: doc.id, ...doc.data() });
                });
                console.log('Fetched data:', data);
                setFetchedData(data);
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
                    {fetchedData.length > 0 ? (
                        <div className='card'>
                            <div className='image' style={{ background: `url(${fetchedData[0].courseImg})` }}></div>
                            <div className='text'>
                                <h4>{fetchedData[0].courseName}</h4>
                                <p>{fetchedData[0].courseDescription}</p>
                            </div>
                        </div>
                    ) : (
                        <p>Loading course information...</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;
