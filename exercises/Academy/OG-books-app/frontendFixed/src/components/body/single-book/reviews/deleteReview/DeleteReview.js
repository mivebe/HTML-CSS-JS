import React from 'react';

const DeleteReview = ({ setUpdater,token, bookId }) => {

    const deleteReviewCallback = () => {
        
        fetch(`http://localhost:5000/books/${bookId}/reviews`,
            {
                method: 'Delete',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            }
        )
            .then(res => res.json())
            .then(() => setUpdater(1))

    }
    return (<button onClick={deleteReviewCallback}>Delete</button>)
}
export default DeleteReview;