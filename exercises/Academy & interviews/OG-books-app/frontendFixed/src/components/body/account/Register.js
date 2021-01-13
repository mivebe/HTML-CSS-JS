import React from 'react'
import "./Register.css"
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

const Register = () => {
    const { register, handleSubmit, errors } = useForm();
    const history = useHistory()
    const onSubmit = (data) => {
        fetch(`http://localhost:5000/auth`,
            {
                method: 'POST',
                body: JSON.stringify({
                    username: data.username,
                    password: data.password,
                    displayName: data.displayName
                }),
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjM0LCJ1c2VybmFtZSI6ImxsbGwiLCJyb2xlIjoiYmFzaWMiLCJpYXQiOjE2MDMzODcxNjMsImV4cCI6MTYwMzM5MDc2M30.7TC1vENjNiZjHRra6JkUG4jvG5H7R-hwF4XmenHLK0s',
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            }
        )
            .then(res => res.json())
            .then(res => {
                if (res.msg) {
                    throw new Error(res.msg);
                }
                history.push('/login')
            })
            .catch(err => console.log(err.masage));
    }


    return (
        <div className="register">
            <Link to='/'>
                <img
                    className='register_logo'
                    src='https://www.pngkey.com/png/full/246-2462602_e-library-logo-png.png'
                    alt='logo'
                />
            </Link>
            <div className="register_container">
                <h1>Register</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h5>Username</h5>
                    <input type="text" ref={register({ required: true, minLength: 3, maxLength: 20 })} name="username" />
                    {errors.username && <span className="form-error">Username must be between 3 - 20 symbols</span>}

                    <h5>Password</h5>
                    <input type='password' ref={register({ required: true, minLength: 3, maxLength: 20 })} name="password"></input>
                    {errors.password && <span className="form-error">Password must be between 3 - 20 symbols</span>}
                    <br />

                    <h5>Display Name</h5>
                    <input type='text' ref={register({ required: true, minLength: 3, maxLength: 20 })} name="displayName"></input>
                    {errors.displayName && <span className="form-error">DisplayName must be between 3 - 20 symbols</span>}

                    <button
                        className="register_registerButton"
                    >Submit</button>
                </form>
                <Link to='/login'>
                    <button
                        className="register_loginButton">Already have
                 Account</button>
                </Link>
            </div>
        </div>
    )
}

export default Register