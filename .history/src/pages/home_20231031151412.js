import React from 'react'
import SideBar from './side-bar'
import './css/index.css'
import ProfilePic from './css/images/ben-den-engelsen-YUu9UAcOKZ4-unsplash.jpg'
import courseImg from './css/images/annie.jpg'
function home() {
    return (
        <div className='page'>
            <SideBar />
            <div className='content'>
                

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