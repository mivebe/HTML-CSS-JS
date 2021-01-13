import React, { useState, useEffect, useContext } from 'react';
import './Single-book.css'
import Reviews from './reviews/Reviews.js'
import { useHistory, withRouter } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import RateStuff from './rateBook/RateStuff';
import BorrowButton from './borrowButton/BorrowButton';

const SingleBook = (props) => {
    const { id } = props.match.params;
    const [book, setBook] = useState({});
    const [isBorrowed, setIsBorrowed] = useState(0);
    const history = useHistory();
    const { token, user } = useContext(AuthContext);

    useEffect(() => {

        fetch(`http://localhost:5000/books/${id}`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            }
        )
            .then(res => res.json())
            .then(res => {
                if (!Array.isArray(res)) {
                    throw new Error(res.msg);
                }
                return res;
            })
            .then(res => {
                setBook(res[0]);
                setIsBorrowed(res[0].isBorrowed)
            })
            .catch(() => history.push('/*'));

    }, [id, history, token, isBorrowed])

    return (<div key={book.id} className="singleBook">
        <h2 className="bookName">{book.name}</h2>
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
            {isBorrowed ? <div>This book is borrowed at the moment. </div> : <BorrowButton id={id} token={token} setIsBorrowed={setIsBorrowed} />}
            <RateStuff bookId={id} token={token} />
            <Reviews bookId={id} token={token} user={user}></Reviews>
        </div>
    </div>);
}

export default withRouter(SingleBook);