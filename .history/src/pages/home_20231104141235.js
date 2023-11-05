import React, { useState, useEffect } from 'react';
import SideBar from './side-bar';
import './css/index.css';
import { database } from '../config';
import { collection, getDocs } from 'firebase/firestore';

function Home() {
    const [courseData, setCourseData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(database, 'Courses'));
                const data = [];

                querySnapshot.forEach((doc) => {
                    data.push({ id: doc.id, ...doc.data() });
                });

                setCourseData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // Fetch data when the component mounts
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
                        {/* Display profile picture here */}
                        <h4>UserName</h4>
                    </div>
                </div>

                <div className='cards'>
                    {courseData.map((course) => (
                        <div className='card' key={course.id}>

                            <div className='course-image'>

                            </div>

                            <div id='card-text'>
                                <h4>{course.Name}</h4>
                                <p>{course.Description}</p>
                            </div>
                            {/* Log data for this course */}
                            {console.log('Course Data:', course)}
                        </div>
                    ))}
                </div>

                <div className='class-plan'>
                    <h3 id='plan'>Class Plan</h3>

                    <button className='btn btn-success' id='create-plan'>Create Plan</button>
                </div>

                <div className='full-width'>
                    {courseData.map((course) => (
                        <div className='row'>
                            <p>{course.Name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
