import React from 'react'
import SideBar from './side-bar'
import './css/index.css'
import { db } from '../config'
import { collection, query, where, onSnapshot } from "firebase/firestore";
import ProfilePic from './css/images/ben-den-engelsen-YUu9UAcOKZ4-unsplash.jpg'
import courseImg from './css/images/annie.jpg'
function home() {

    const q = query(collection(db, "cities"), where("state", "==", "CA"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const cities = [];
        querySnapshot.forEach((doc) => {
            cities.push(doc.data().name);
        });
        console.log("Current cities in CA: ", cities.join(", "));
    });
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
                        <section className='profilePicture' style={{ background: { ProfilePic } }}>

                        </section>
                        <h4>UserName</h4>
                    </div>
                </div>

                <div className='courses'>
                    <div className='card'>
                        <div className='image' style={{ background: { courseImg } }}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default home