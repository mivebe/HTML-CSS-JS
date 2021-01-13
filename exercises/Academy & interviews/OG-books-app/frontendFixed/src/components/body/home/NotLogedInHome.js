import React from 'react'
import './NotLogedInHome.css'
import { useHistory } from 'react-router-dom'

const NotLogedInHome = () => {
    const history = useHistory()
    return (
        <div className='notLogedInHome'>
            <div className='container'>
                <div className='notLogedInHome_massage'>
                    <h1>Welcome to our eLibrary</h1>
                </div>
                <div className='notLogedInHome_log_reg'>
                    <div className='notLogedInHome_log'>
                        <button onClick={() => history.push('/login')}>Login</button>
                    </div>
                    <div className='notLogedInHome_reg'>
                        <button onClick={() => history.push('/register')}>Register</button>
                    </div>
                </div>
                <h1 className='notLogedInHome_About_us'>About us</h1>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
            </div>
        </div>
    )
}


export default NotLogedInHome