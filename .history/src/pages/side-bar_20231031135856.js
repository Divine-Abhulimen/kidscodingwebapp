import React from 'react'
import './css/side-panel.css'
import HomeIcons from './css/images/house-solid.svg'
import Attendance from './css/images/people-solid.svg'
import BookSolid from './css/images/book-solid.svg'
import Chat from './css/images/chat-solid.svg'
import Jigsaw from './css/images/Jigsaw.svg'
import Gift from './css/images/gift-solid.svg'
import Logo from './css/images/8481fa_30e0db0f56c84764ae54c71e2541f09f~mv2.webp'
function Sidepanel() {
    return (
        <div className='side-panel'>
            <div className='side-nav'>
                <div className='logo'>
                    <img src={Logo} id='logoicon' />
                    <div className='text'>
                        <h1 id='logo-title'>Kids Coding</h1>
                        <p>Be The Future</p>
                    </div>
                </div>
                <a href="/" id='nav-item' className='active'><div className='profilePicture'><img src={HomeIcons} id='icon' /></div>Home</a>
                <a id='nav-item'><img src={Attendance} id='icon' />Attendance</a>
                <a id='nav-item'><img src={BookSolid} id='icon' />Courses</a>
                <a id='nav-item'><img src={Chat} id='icon' />Class Conversation</a>
                <a id='nav-item'><img src={Jigsaw} id='icon' /> Assessments</a>
                <a id='nav-item'><img src={Gift} id='icon' />Incentives</a>
            </div>
        </div>
    )
}

export default Sidepanel