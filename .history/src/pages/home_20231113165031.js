import React, { useState, useEffect } from 'react';
import SideBar from './side-bar';
import { auth, database } from '../config';
import { doc, getDoc } from 'firebase/firestore';
import './css/index.css';
import { collection, getDocs } from 'firebase/firestore';
import { useUser } from '../Usercontext.js'; // Import your useUser hook

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

  const { user, loading } = useUser(); // Use the useUser hook

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
            {loading ? (<h4>Loading...</h4>) : (
              user && (
                <h4>Hello {user.name || auth.currentUser.displayName}</h4>
              )
            )}
          </div>
        </div>

        <div className='cards'>
          {courseData.map((course) => (
            <div className='card' key={course.id}>
              <div className='course-image'></div>
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
            <div className='grow' key={course.id}>
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
