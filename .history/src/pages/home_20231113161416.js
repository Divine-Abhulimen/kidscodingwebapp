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


    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const user = auth.currentUser;

        const fetchUserData = async () => {
            if (user) {
                try {
                    // Check if user data is in localStorage
                    const cachedUserData = localStorage.getItem('userData');
                    if (cachedUserData) {
                        setUserData(JSON.parse(cachedUserData));
                    }

                    const userDocRef = doc(database, 'users', user.uid);
                    const userDoc = await getDoc(userDocRef);

                    if (userDoc.exists()) {
                        const newUserData = userDoc.data();
                        setUserData(newUserData);

                        // Cache the fetched user data in localStorage
                        localStorage.setItem('userData', JSON.stringify(newUserData));
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchUserData();
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
                        {loading ? (<h4> Loading...</h4>) : (
                            auth.currentUser && (
                                <h4>Hello {userData?.name || auth.currentUser.displayName}</h4>
                                )
                        )} 
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
                        <div className='grow'>
                            <p id='courseN'>{course.Name}</p>
                            <button className='btn btn-danger' id="view">View</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
