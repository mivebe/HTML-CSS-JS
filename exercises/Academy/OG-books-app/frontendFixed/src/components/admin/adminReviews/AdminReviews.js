import React, { useEffect, useState } from 'react';
import './AdminReviews.css'
import AdminDeleteReview from './AdminDeleteReview';


const AdminReviews = ({ bookId, token }) => {
    const [updater, setUpdater] = useState(false);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {

        fetch(`http://localhost:5000/admin/books/${bookId}/reviews`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
            .then(res => res.json())
            .then(res => {
                if (res.message) {
                    throw new Error(res.message)
                }

                setReviews(res.reverse())
            })
            .catch(err => console.log(err))

    }, [updater, token, bookId])


    if (reviews.length) {
        return (<div className="reviews">
            {reviews.map((review) => (
                <li className='review-with-button' key={review.id}>

                    <div className="review">
                        <p className="username">{review.display_name} : </p>
                        <p className="reviewText">{review.text}</p>
                    </div>
                    <AdminDeleteReview reviewId={review.id} token={token} setUpdater={(a) => setUpdater(a)} />

                </li>))
            }
        </div>)
    }

    return (<div>
        <span>No reviews for this book yet</span>
    </div>);

};

export default AdminReviews;