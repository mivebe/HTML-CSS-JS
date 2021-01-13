import React from 'react'
import { Route, Switch } from 'react-router-dom';
import SingleBook from '../body/single-book/Single-book';
import UserPage from '../body/userPage/UserPage';
import NotFound from '../Not-found';
import AdminSwitch from './AdminSwitch';

const NotBannedSwitch = ({ user }) => {
    return (<Switch>
        <Route path="/books/:id">
            <SingleBook />
        </Route>
        <Route path="/user" exact>
            <UserPage />
        </Route>
        {user.role === 'admin' &&
            <AdminSwitch />
        }
        <Route path="*" component={NotFound} />
    </Switch>);
}

export default NotBannedSwitch;