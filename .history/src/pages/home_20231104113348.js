import React from 'react'
import SideBar from './side-bar'
import './css/index.css'
import { database } from '../config'
import { collection, doc, getDoc } from "firebase/firestore"; 
import ProfilePic from './css/images/ben-den-engelsen-YUu9UAcOKZ4-unsplash.jpg'
import courseImg from './css/images/annie.jpg'
import { useState, useEffect} from 'react'
function Home() {
    const [courseName, setCourseName] = useState('');
    const getClasses = async () => {
        const courses = doc(database, "Summer Camp", "Course name");
        const coursesSnap = await getDoc(courses);
    
        if (coursesSnap.exists()) {
            console.log('Courses: ', coursesSnap.data());
            setCourseName(coursesSnap.data().name); // Set the course name in the state
            console.log(courseName);
        }
    }
    getClasses();
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
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home