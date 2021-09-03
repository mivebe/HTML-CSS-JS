import React, { useContext } from 'react';
import './Login.css';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext.js';
import { useHistory } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import useAuthorizedRequest from '../../custom-hooks/useAuthorizedFetch.js';
import { toast } from 'react-toastify';
import { setLocalStorage } from './localStorageService';

const Login = () => {
  const { register, errors, handleSubmit, setValue } = useForm();
  const auth = useContext(AuthContext);
  const history = useHistory();
  const fetchFunc = useAuthorizedRequest();
  const useOnSubmit = async (data) => {
    try {
      const response = await fetchFunc('/users/login', 'POST', {
        body: { username: data.username, password: data.password },
      });
      const refreshToken = response.refreshToken;
      const token = response.token;
      setLocalStorage('token', token);
      setLocalStorage('refreshToken', refreshToken);
      const user = jwt_decode(token);
      auth.setLoginState({ isLoggedIn: true, user: user, token: token });
      toast.success('Succes login', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });

      history.push('/dashboard');
    } catch (error) {
      setValue('username', '');
      setValue('password', '');
      toast.error(error.message, { position: toast.POSITION.TOP_CENTER });
    }
  };

  return (
    <div className='login'>
      <div className='login_container'>
        <h1>Sign-in</h1>
        <form onSubmit={handleSubmit(useOnSubmit)}>
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
          <button className='login_signInButton'>Submit</button>
        </form>
        <Link to='/register'>
          <button className='login_registerButton'>Create your Account</button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
