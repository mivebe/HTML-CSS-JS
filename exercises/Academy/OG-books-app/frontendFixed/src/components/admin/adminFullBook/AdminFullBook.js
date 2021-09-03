import React, { useContext, useEffect, useState } from 'react';
import './AdminFullBook.css'
import { useHistory, withRouter } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import AverageRate from '../../body/single-book/averageRate/AverageRate';
import ChangingTitle from './ChangingTitle';
import AdminReviews from '../adminReviews/AdminReviews';

const AdminFullBook = (props) => {

    const auth = useContext(AuthContext);
    const { id } = props.match.params;
    const history = useHistory();
    const [book, setBook] = useState({});

    useEffect(() => {

        fetch(`http://localhost:5000/admin/books/${id}`,
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
                return res;
            })
            .then(res => {
                setBook(res[0]);
            })
            .catch(() => history.push('/*'));

    }, [id, auth.token, history])

    return (<div key={book.id} className="singleBook">
        <ChangingTitle bookName={book.name} bookId={book.id} token={auth.token} />
        <img src={book.image_URL} alt="Book cover" />
        <div className="authorGenre">
            <h3>Author: {book.author}</h3>
            <h3>Genre: {book.genre}</h3>
        </div>
        <div className="description">
            <h4>Description:</h4>
            <p>{book.description}</p>
        </div>
        <div className='single_book_bottom'>
            {book.isBorrowed ? <div>This book is borrowed at the moment. </div> : <div>This book is not borrowed at the moment</div>}
            <AverageRate bookId={book.id} />
            <AdminReviews bookId={book.id} token={auth.token} />
        </div>
    </div>)
}

export default withRouter(AdminFullBook);