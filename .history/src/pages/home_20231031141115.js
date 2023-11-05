import React from 'react'
import SideBar from './side-bar'
import './css/index.css'
import Profile from './css/images/profile.jpg'
import profilePic from './css/images/ben-den-engelsen-YUu9UAcOKZ4-unsplash.jpg'
import courseImg from './css/images/annie.jpg'
function home() {
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
                        <div className='profilePic' style={{background: {Profile}}}>

                        </div>
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

export default home