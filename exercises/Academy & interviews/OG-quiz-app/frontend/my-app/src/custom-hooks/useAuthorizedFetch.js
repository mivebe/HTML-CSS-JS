import { useHistory } from 'react-router-dom';
import { clearLocalStorage, getLocalStorage, setLocalStorage } from '../components/account/localStorageService.js';
import { tokenValidation } from '../components/account/tokenValidation.js';
const BASE_URL = 'http://localhost:5000';
const useAuthorizedRequest = () => {
  const refreshToken = getLocalStorage('refreshToken');
  const token = getLocalStorage('token');
  const history = useHistory();
  return async (
    url,
    method = 'GET',
    { body = {}, query = {} } = {}
  ) => {
    if (refreshToken && tokenValidation(refreshToken)) {

      clearLocalStorage();
      return history.push('/login');

    }
    if (refreshToken && token && tokenValidation(token)) {
    
      const request = await fetch(BASE_URL + '/users/refresh', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${refreshToken}`,
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },

      })
      const newToken = await request.json();
      setLocalStorage('token', newToken.token);
    };
    const confirmedToken= getLocalStorage('token')
    const queryString = Object.keys(query).reduce((acc, key) => {
      return acc.concat(`${key}=${query[key]}&`);
    }, '?');

    const options = {
      method: method,
      headers: {
        Authorization: `Bearer ${confirmedToken}`,
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
    };

    if (method !== 'GET') {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(BASE_URL + url + queryString, options);
    
    if (response.statusText === 'Unauthorized') {
      history.push('/login')
      throw new Error(response.statusText);
    }
    const responseInJson = await response.json();

    if (response.status < 400 && !responseInJson.msg) {
      return responseInJson;
    } else {
      throw new Error(
        responseInJson.msg ? responseInJson.msg : response.statusText
      );
    }
  };
}

export default useAuthorizedRequest;
