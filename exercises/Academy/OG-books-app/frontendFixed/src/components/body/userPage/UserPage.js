import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Book from '../../allBooks/Book';
import { AuthContext } from '../../contexts/AuthContext';
import './UserPage.css';

const UserPage = () => {
    const [books, setBooks] = useState([]);
    const auth = useContext(AuthContext);
    const history = useHistory();
    useEffect(() => {

        fetch(`http://localhost:5000/books/borrowed`,
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
            .then(res => setBooks(res))
            .catch(err => console.log(err));

    }, [auth, history])

    const returnBook = (bookId) => {
        fetch(`http://localhost:5000/books/${bookId}`,
            {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${auth.token}`,
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            }
        )
            .then(res => res.json())
            .then(() => setBooks(books.filter(book => book.id !== bookId)))
            .catch(err => console.log(err));
    }

    return (<div className='all_books'>
        {books.length ? books.map((el) => <Book book={el} key={el.id} returnBook={returnBook} />) : <h1 className='no-borrowed'>You don't have borrowed books.</h1>}
    </div>)
}

export default UserPage;