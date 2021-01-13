import React from 'react'
import './Not-found.css'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div className='notFoundPage'>
            <h1>404 Page not found</h1>
            <section className="error-container">
                <span>4</span>
                <span><span className="screen-reader-text">0</span></span>
                <span>4</span>
            </section>
            <div className="link-container">
                <Link to='/home'>
                    <a target="_blank" className="more-link">Go back to the home page</a>
                </Link>
            </div>
        </div>
    )
}

export default NotFound