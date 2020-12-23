import { createContext } from 'react';
import { getLocalStorage } from '../account/localStorageService';

export const AuthContext = createContext({
  token: getLocalStorage('token'),
  user: null,
  isLoggedIn: false,
  setLoginState: () => { },
});
