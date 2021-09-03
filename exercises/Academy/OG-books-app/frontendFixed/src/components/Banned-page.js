import React, { useContext } from 'react'
import './Not-found.css'
import { Link } from 'react-router-dom'
import { AuthContext } from './contexts/AuthContext'

const BannedPage = () => {
    const { user } = useContext(AuthContext);
    return (
        <div className='notFoundPage'>
            <h1>You are banned !</h1>
            <section className="error-container">
                <h2>Reason: </h2>
                <div>{user.reason}</div>
            </section>
            <div className="link-container">
                <Link to='/home'>
                    <a target="_blank" className="more-link">Go back to the home page</a>
                </Link>
            </div>
        </div>
    )
}

export default BannedPage