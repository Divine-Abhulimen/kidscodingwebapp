import React from 'react'
import SideBar from './side-bar'
import './css/index.css'
function home() {
    return (
        <div className='page'>
            <SideBar />
            <div className='content'>
                <div className='top-bar'>
                    <div className='ms-auto top-text'>
                            <h4>Hello UserName</h4>
                            <p>Course Overview</p>
                        <div className='mx-auto'>
                            <img src='' />
                            <h4>UserName</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default home