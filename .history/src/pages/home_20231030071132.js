import React from 'react'
import SideBar from './side-bar'
import './css/index.css'
function home() {
    return (
        <div className='page'>
            <SideBar />
            <div className='content'>
                <div className='top-bar'>
                    <div className='ms-auto'>Home</div>
                </div>
            </div>
        </div>
    )
}

export default home