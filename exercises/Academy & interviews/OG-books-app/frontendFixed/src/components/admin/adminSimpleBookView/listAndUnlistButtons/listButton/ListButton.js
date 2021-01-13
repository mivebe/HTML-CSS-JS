import React from 'react';

const ListButton = ({ token, bookId, toggle }) => {

    const listBook = () => {
        fetch(`http://localhost:5000/admin/books/${bookId}/list`,
            {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            }
        )
            .then(res => res.json())
            .then(res => console.log(res))
            .then(() => toggle(1))

    }

    return (<button className='admin_buttons' onClick={listBook} >List</button>)

}

export default ListButton;