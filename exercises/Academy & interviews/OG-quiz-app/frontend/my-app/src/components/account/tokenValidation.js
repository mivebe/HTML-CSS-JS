import jwt_decode from 'jwt-decode';

export const tokenValidation = (token) => {
  if (token) {

    if (new Date() > new Date(jwt_decode(token).exp * 1000)) {
      
      return true;
    }
    return false;
  }
  return true
};
