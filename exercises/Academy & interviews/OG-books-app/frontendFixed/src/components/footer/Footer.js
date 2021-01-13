import React from 'react'
import './Footer.css'

const Footer = () => {
    return (
        <div className='footer'>
            <div className='footer_about_us'>
                <h2>About us</h2>
            </div>
            <div className='footer_contacts'>
                {/* <h2>Contacts:</h2> */}
                <p>Email:</p>
                <p>Telephone number:</p>
            </div>
        </div>
    )
}

export default Footer