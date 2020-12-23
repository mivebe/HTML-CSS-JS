import React, { useState } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from './components/contexts/AuthContext.js';
import jwt_decode from 'jwt-decode';
import LoggedSwitch from './components/switches/LoggedSwitch.js';
import NotLoggedSwitch from './components/switches/NotLoggedSwitch.js';
import { tokenValidation } from './components/account/tokenValidation.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getLocalStorage, removeItemLocalStorage } from './components/account/localStorageService';

function App() {
  const refreshToken = getLocalStorage('refreshToken');
  const token = getLocalStorage('token');
  const [authValue, setAuthValue] = useState({
    isLoggedIn: token && token !== 'null' ? true : false,
    user: token && token !== 'null' ? jwt_decode(token) : null,
    token: token,
  });
  const check = (!refreshToken | tokenValidation(refreshToken)) ? null : refreshToken;
  if (refreshToken && tokenValidation(refreshToken)) {
    removeItemLocalStorage('refreshToken')
  }

  return (
    <div className='App'>
      <BrowserRouter>
        <AuthContext.Provider
          value={{
            ...authValue,
            setLoginState: setAuthValue,
          }}
        >
          {!check ? <NotLoggedSwitch /> : <LoggedSwitch />}
        </AuthContext.Provider>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
