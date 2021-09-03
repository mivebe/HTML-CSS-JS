import React, { useContext } from 'react'
import "./Login.css"
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext.js'
import { useHistory } from 'react-router-dom'
import jwt_decode from "jwt-decode";

const Login = () => {
    const { register, errors, handleSubmit, setValue } = useForm();
    const auth = useContext(AuthContext)
    const history = useHistory()
    const onSubmit = (data) => {
        fetch(`http://localhost:5000/auth/signin`,
            {
                method: 'POST',
                body: JSON.stringify({
                    username: data.username,
                    password: data.password,
                }), headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            }
        )
            .then(res => res.json())
            .then(res => {
                if (res.msg || res.message) {
                    throw new Error(res.msg);
                }
                const token = res.token;
                localStorage.setItem('token', token)
                const user = jwt_decode(token);
                auth.setLoginState({ isLoggedIn: true, user: user, token: token })
                history.push('/home')
            })
            .catch(err => {
                setValue('username', '')
                setValue('password', '')
                alert("Wrong username or password!")

            });
    }

    return (
        <div className="login">
            <Link to='/'>
                <img
                    className='login_logo'
                    src='https://www.pngkey.com/png/full/246-2462602_e-library-logo-png.png'
                    alt='logo'
                />
            </Link>
            <div className="login_container">
                <h1>Sign-in</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h5>Username</h5>
                    <input type="text" ref={register({ required: true, minLength: 3, maxLength: 20 })} name="username" />
                    {errors.username && <span className="form-error">Username must be between 3 - 20 symbols</span>}

                    <h5>Password</h5>
                    <input type='password' ref={register({ required: true, minLength: 3, maxLength: 20 })} name="password"></input>
                    {errors.password && <span className="form-error">Password must be between 3 - 20 symbols</span>}

                    <br />
                    <button
                        className="login_signInButton"
                    >Submit</button>
                </form>
                <Link to='/register'>
                    <button
                        className="login_registerButton">Create your
                        Account
                 </button>
                </Link>
            </div>
        </div>
    )
}

export default Login