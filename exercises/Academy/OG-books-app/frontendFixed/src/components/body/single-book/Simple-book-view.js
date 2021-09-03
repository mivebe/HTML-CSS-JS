import React, { useState, useEffect } from 'react';
import token from '../../../token.js'
import './Simple-book-view.css'
const SimpleBookView = () => {
    const [book, setBook] = useState({});
    useEffect(() => {
        fetch(`http://localhost:5000/books/4`,
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token,
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
                return res
            })
            .then(res => setBook(res[0]))
            .catch(err => console.log(err));

    }, [])


    return (
        <div key={book.id} className="book">
            <div className="book_info">
                <h2 className="book_name">{book.name}</h2>
            </div>
            <p>Reiting</p>
            <img src={book.image_URL} alt="Book cover" />
            <button className='book_details_button'>More details</button>
        </div>);

}

export default SimpleBookView;