import React, { useContext, useEffect, useState } from 'react';
import './AdminBooks.css';
import { useHistory, withRouter } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import AdminSimpleBookView from '../adminSimpleBookView/AdminSimpleBookView';

const AdminBooks = () => {
    const history = useHistory();
    const [books, setBooks] = useState([]);
    const auth = useContext(AuthContext);
    const [searchValue, setSearchValue] = useState('');
    useEffect(() => {

        fetch(`http://localhost:5000/admin/books?search=${searchValue}`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${auth.token}`,
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            }
        )
            .then(res => res.json())
            .then(res => {

                if (!Array.isArray(res)) {
                    throw new Error(res);
                }
                return res;
            })
            .then(res => setBooks(res))
            .catch(() => history.push('/'));

    }, [history, searchValue, auth.token])

    return (<div>
        <div className='search-title'>
            <input type='textbox' placeholder='Sort by Title' value={searchValue} onChange={(ev) => setSearchValue(ev.target.value)} />
            <button className='admin_buttons' onClick={() => setSearchValue('')}>Clear</button>
        </div>
        <div className='admin-all-books'>
            {books.length ?
                books.map((el) => (
                    <AdminSimpleBookView key={el.id} token={auth.token} book={el} />
                ))
                : <h1>No books with "{searchValue}" in their title</h1>}
        </div>
    </div>)
}

export default withRouter(AdminBooks);