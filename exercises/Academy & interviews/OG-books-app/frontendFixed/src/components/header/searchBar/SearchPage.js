import React, { useEffect, useState, useContext } from 'react'
import Book from '../../allBooks/Book.js'
import { withRouter } from "react-router";
import { useLocation } from "react-router-dom";
// import token from '../../../token.js'
import { AuthContext } from '../../contexts/AuthContext.js'

const SearchPage = () => {
    const temp = new URLSearchParams(useLocation().search)
    const search = temp.get('search')
    const [searchBooks, setSearch] = useState([])
    const auth = useContext(AuthContext)

    useEffect(() => {
        fetch(`http://localhost:5000/books?search=${search}`,
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
            .then((res) => setSearch(res))
    }, [search, auth.token])

    return (
        <div className='all_books'>{
            searchBooks.length > 0 ?
                searchBooks.map((el) => {
                    return <Book key={el.id} book={el} />
                }) :
                <h1>There is no books with that name.</h1>
        }</div>
    )
}

export default withRouter(SearchPage);