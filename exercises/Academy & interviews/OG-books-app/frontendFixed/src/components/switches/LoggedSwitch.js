import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from '../header/Header';
import { BooksProvider } from '../contexts/BooksContext';
import Home from '../body/home/Home';
import AllBooks from '../allBooks/AllBooks';
import SearchPage from '../header/searchBar/SearchPage';
import { AuthContext } from '../contexts/AuthContext';
import BannedPage from '../Banned-page';
import NotBannedSwitch from './NotBannedSwitch';

const LoggedSwitch = () => {
    const { user } = useContext(AuthContext);

    return (<Switch>
        <>
            <Header />
            <Switch>
                <Redirect path='/' exact to='/home' />
                <Route path='/home' exact>
                    <BooksProvider>
                        <Home />
                    </BooksProvider>
                </Route>
                <Route path="/books" exact>
                    <BooksProvider>
                        <AllBooks />
                    </BooksProvider>
                </Route>
                <Route path='/search'>
                    <SearchPage />
                </Route>
                {!user.isBanned ? <NotBannedSwitch user={user} />
                    : <Route path="*" component={BannedPage} />
                }
            </Switch>
        </>
    </Switch>
    );
}

export default LoggedSwitch