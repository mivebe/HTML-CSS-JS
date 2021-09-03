import { createContext } from 'react'


export const AuthContext = createContext({
    token: localStorage.getItem('token'),
    user: null,
    isLoggedIn: false,
    setLoginState: () => { }
})
