import React from 'react';

const AdminDeleteReview = ({ setUpdater, token, reviewId }) => {

    const deleteReviewCallback = () => {

        fetch(`http://localhost:5000/admin/reviews/${reviewId}`,
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
            .then(() => setUpdater(prev => !prev))

    }
    return (<button onClick={deleteReviewCallback}>Delete</button>)
}
export default AdminDeleteReview;