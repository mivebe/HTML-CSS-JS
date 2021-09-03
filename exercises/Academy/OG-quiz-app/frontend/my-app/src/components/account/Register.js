import React, { useContext } from 'react';
import './Register.css';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext.js';
import jwt_decode from 'jwt-decode';
import useAuthorizedRequest from '../../custom-hooks/useAuthorizedFetch.js';
import { toast } from 'react-toastify';
import { setLocalStorage } from './localStorageService';

const Register = () => {
  const { register, handleSubmit, errors, setValue } = useForm();
  const auth = useContext(AuthContext);
  const history = useHistory();
  const fetchFunc = useAuthorizedRequest();
  const useOnSubmit = async (data) => {
    try {
      const response = await fetchFunc('/users', 'POST', {
        body: {
          firstName: data.firstName,
          lastName: data.lastName,
          username: data.username,
          password: data.password,
        },
      });
      const refreshToken = response.refreshToken;
      const token = response.token;
      setLocalStorage('token', token);
      setLocalStorage('refreshToken', refreshToken);
      const user = jwt_decode(token);
      auth.setLoginState({ isLoggedIn: true, user: user, token: token });
      toast.success('You have succesfuly create your account', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      history.push('/dashboard');
    } catch (error) {
      setValue('username', '');
      setValue('password', '');
      setValue('firstName', '');
      setValue('lastName', '');
      toast.error(error.message, { position: toast.POSITION.TOP_CENTER });
    }
  };

  return (
    <div className='register'>
      <div className='register_container'>
        <h1>Register</h1>
        <form onSubmit={handleSubmit(useOnSubmit)}>
          <input
            type='text'
            placeholder='First name'
            ref={register({ required: true, minLength: 3, maxLength: 20 })}
            name='firstName'
          />
          {errors.firstName && (
            <span className='form-error'>
              First name must be between 3 - 20 symbols
            </span>
          )}

          <input
            type='text'
            placeholder='Last name'
            ref={register({ required: true, minLength: 3, maxLength: 20 })}
            name='lastName'
          />
          {errors.lastName && (
            <span className='form-error'>
              Last name must be between 3 - 20 symbols
            </span>
          )}

          <input
            type='text'
            placeholder='Username'
            ref={register({ required: true, minLength: 3, maxLength: 20 })}
            name='username'
          />
          {errors.username && (
            <span className='form-error'>
              Username must be between 3 - 20 symbols
            </span>
          )}

          <input
            type='password'
            placeholder='Password'
            ref={register({ required: true, minLength: 3, maxLength: 20 })}
            name='password'
          ></input>
          {errors.password && (
            <span className='form-error'>
              Password must be between 3 - 20 symbols
            </span>
          )}
          <br />

          <button className='register_registerButton'>Submit</button>
        </form>
        <Link to='/login'>
          <button className='register_loginButton'>Already have Account</button>
        </Link>
      </div>
    </div>
  );
};

export default Register;
