import React, { useState } from 'react';
import './App.css';
import { BrowserRouter} from 'react-router-dom';
import { AuthContext } from './components/contexts/AuthContext.js'
import jwt_decode from "jwt-decode";
import LoggedSwitch from './components/switches/LoggedSwitch';
import NotLoggedSwitch from './components/switches/NotLoggedSwitch';

function App() {
  const token = localStorage.getItem('token')

  const [authValue, setAuthValue] = useState({
    isLoggedIn: (token && token !== 'null') ? true : false,
    user: (token && token !== 'null') ? jwt_decode(token) : null,
    token: token
  });

  return (
    <div className="App">
      <BrowserRouter>
        <AuthContext.Provider value={{
          ...authValue, setLoginState: setAuthValue
        }}>
          {!token ?
            <NotLoggedSwitch />
            : <LoggedSwitch />
          }
        </AuthContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
