import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './AdminSimpleBookView.css'
import ListButton from './listAndUnlistButtons/listButton/ListButton'
import UnlistButton from './listAndUnlistButtons/unlistButton/UnlistButton'

const AdminSimpleBookView = ({ book, token }) => {

    const [listed, setListed] = useState(!book.unlisted);
    return (
        <div key={book.id} className="book">
            <div>
                <h4>{book.name}</h4>
            </div>
            <img src={book.image_URL} alt='Book cover' />
            <h5>{!listed ? 'Unlisted' : 'Listed'}</h5>
            <Link to={`/admin/books/${book.id}`}>
                <button id='admin_view_button' className='book_details_button' >Admin view</button>
            </Link>
            {!listed ? <ListButton token={token} bookId={book.id} toggle={setListed} />
                : <UnlistButton token={token} bookId={book.id} toggle={setListed} />
            }
        </div>
    )
}

export default AdminSimpleBookView;