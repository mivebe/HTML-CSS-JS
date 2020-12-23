import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Register from '../account/Register';
import Login from '../account/Login';

const NotLoggedSwitch = () => {
  return (
    <Switch>
      <Redirect path='/' exact to='/login' />
      <Route path='/register'>
        <Register />
      </Route>
      <Route path='/login'>
        <Login />
      </Route>
      <Route path='*'>
        <Redirect to='/login' />
      </Route>
    </Switch>
  );
};

export default NotLoggedSwitch;
