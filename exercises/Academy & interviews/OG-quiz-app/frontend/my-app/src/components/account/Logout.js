import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext.js';
import { useHistory } from 'react-router-dom';
import { clearLocalStorage } from './localStorageService.js';

const Logout = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const onClickFunc = () => {
    auth.setLoginState({ isLoggedIn: false, user: null, token: null });
    clearLocalStorage()
    history.push('/');
  };
  return (
    <button
      onClick={() => {
        onClickFunc();
      }}
      className='nav_bar_logout_button'
    >
      Logout
    </button>
  );
};

export default Logout;
