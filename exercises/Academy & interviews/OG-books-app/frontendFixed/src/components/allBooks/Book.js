import React from 'react'
import { Link } from 'react-router-dom'
import AverageRate from '../body/single-book/averageRate/AverageRate'
import './Book.css'

const Book = ({ book, returnBook }) => {

    return (
        <div key={book.id} className="book">
            <div>
                <h4>{book.name}</h4>
            </div>
            <div className='book_raiting'>
                <AverageRate bookId={book.id} />
            </div>
            <img src={book.image_URL} alt='Book cover' />
            <Link to={`/books/${book.id}`}>
                <button id='book_details_button' >More details</button>
            </Link>
            {returnBook ? <button className="return-button" onClick={() => returnBook(book.id)}>Return this book</button> : null}
        </div>
    )
}

export default Book