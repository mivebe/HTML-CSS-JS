import React, { useContext } from 'react'
import Book from './Book'
import './AllBooks.css'
import { BooksContext } from '../contexts/BooksContext'

const AllBooks = () => {
    const books = useContext(BooksContext)

    return (
        <div>
            <div className='all_books'>
                {books.map((el) => {
                    return <Book key={el.id} book={el} />
                }
                )}
            </div>
        </div>
    )
}

export default AllBooks