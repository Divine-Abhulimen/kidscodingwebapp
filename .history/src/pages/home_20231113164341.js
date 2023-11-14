import React, { useEffect } from 'react';
import SideBar from './side-bar';
import { auth, database } from '../config';
import { doc, getDoc } from 'firebase/firestore';
import './css/index.css';
import { useUser } from '../UserContext';

function Home() {
    const { userData, setUserData, loading, setLoading } = useUser();

    useEffect(() => {
        const user = auth.currentUser;

        const fetchUserData = async () => {
            if (user) {
                try {
                    const cachedUserData = localStorage.getItem('userData');
                    if (cachedUserData) {
                        setUserData(JSON.parse(cachedUserData));
                    }

                    const userDocRef = doc(database, 'users', user.uid);
                    const userDoc = await getDoc(userDocRef);

                    if (userDoc.exists()) {
                        const newUserData = userDoc.data();
                        setUserData(newUserData);

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
    }, [setUserData, setLoading]);

    // ... rest of your component

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
