import React, { useContext } from 'react'
import './Header.css'
import { Link, useHistory } from 'react-router-dom'
import SearchBar from './searchBar/SearchBar.js'
import { AuthContext } from '../contexts/AuthContext.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminDropDown from './adminDropDown/AdminDropDown.js'

const Header = () => {
    const auth = useContext(AuthContext)
    const history = useHistory()
    const logout = () => {
        auth.setLoginState({ isLoggedIn: false })
        localStorage.clear()
        history.push('/')
    }

    return (
        <div className='header'>
            <Link to='/'>
                <img
                    className='header_logo'
                    src='https://www.pngkey.com/png/full/246-2462602_e-library-logo-png.png'
                    alt='logo'
                />
            </Link>
            <AdminDropDown />
            <SearchBar />
            <div className='header_nav'>
                <div className='header_option'>
                    <span className='header_optionLineOne'>
                        Greeatings
                    </span>
                    <span className='header_optionLineTwo'>
                        {auth.user ? `${auth.user.username}` : "Guest"}
                    </span>
                </div>

                <div className='header_option'>
                    <Link to='/books' className='header_link_allBooks'>
                        <button className='header_link_allBooks' id='all_books_button'>
                            Check <br />
                        all books
                    </button>
                    </Link>
                </div>
                <Link className='header_optionBorrowedBooks' to='/user'>
                    <div className='header_optionBorrowedBooks' id='borrowed_books_button' >
                        Borrowed <br />
                        books
                    </div>
                </Link>
                <div className='header_option' >
                    <Link to='/register'>
                        <span id='header_registerButton'>
                            {auth.isLoggedIn ? "" : "Register"}
                        </span>
                    </Link>
                    {auth.isLoggedIn ?
                        <Link to='/home'>
                            <button onClick={() => { logout() }} className='header_logout'>
                                Logout
                        </button>
                        </Link> :
                        <Link to="/login">
                            <span className='header_optionLineTwo' id='header_loginButton'>
                                Login
                            </span>
                        </Link>
                    }
                </div>
            </div>
        </div>
    )
}

export default Header