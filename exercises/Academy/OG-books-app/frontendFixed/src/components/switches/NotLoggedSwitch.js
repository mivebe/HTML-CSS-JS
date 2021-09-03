import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import NotFound from '../Not-found';
import NotLogedInHome from '../body/home/NotLogedInHome';
import Register from '../body/account/Register';
import Login from '../body/account/Login';

const NotLoggedSwitch = () => {

    return (<Switch>
        <Redirect path='/' exact to='/home' />
        <Route path='/home' exact>
            <NotLogedInHome />
        </Route>
        <Route path='/register'>
            <Register />
        </Route>
        <Route path='/login'>
            <Login />
        </Route>
        <Route path="*" component={NotFound} />
    </Switch>);
}
 
export default NotLoggedSwitch