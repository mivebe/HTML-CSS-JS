import React from 'react';

const UnlistButton = ({ token, bookId, toggle }) => {

    const listBook = () => {
        fetch(`http://localhost:5000/admin/books/${bookId}`,
            {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            }
        )
            .then(res => res.json())
            .then(res => console.log(res))
            .then(() => toggle(0))


    }

    return (<button className='admin_buttons' onClick={listBook} >Unlist</button>)

}

export default UnlistButton;