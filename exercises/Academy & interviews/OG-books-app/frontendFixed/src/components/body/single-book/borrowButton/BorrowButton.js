import React from 'react';

const BorrowButton = ({ id, token, setIsBorrowed }) => {
    const borrowBook = () => {

        fetch(`http://localhost:5000/books/${id}`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            }
        )
            .then(res => res.json())
            .then(() => setIsBorrowed(1));
    }
    return (<button id='borrow_book_button' onClick={borrowBook}>Borrow this Book</button>);

}

export default BorrowButton;