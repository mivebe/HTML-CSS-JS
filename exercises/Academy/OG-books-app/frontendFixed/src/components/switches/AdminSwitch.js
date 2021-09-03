import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AdminAllUsers from '../admin/adminAllUsers/AdminAllUsers';
import AdminBooks from '../admin/adminBooks/AdminBooks';
import AdminCreateBook from '../admin/adminCreateBook/AdminCreateBook';
import AdminFullBook from '../admin/adminFullBook/AdminFullBook';
import NotFound from '../Not-found';

const AdminSwitch = () => {

    return (<Switch>
        <Route path="/admin/books" exact>
            <AdminBooks />
        </Route>
        <Route path="/admin/books/create" exact>
            <AdminCreateBook />
        </Route>
        <Route path="/admin/books/:id">
            <AdminFullBook />
        </Route>
        <Route path="/admin/users">
            <AdminAllUsers />
        </Route>
        <Route path="*" component={NotFound} />
    </Switch>);
}

export default AdminSwitch;