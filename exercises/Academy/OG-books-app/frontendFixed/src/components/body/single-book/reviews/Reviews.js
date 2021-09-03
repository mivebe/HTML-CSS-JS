import React, { useEffect, useState } from 'react';
import './Reviews.css'
import DeleteReview from './deleteReview/DeleteReview.js';
import UpdateReview from './updateReview/UpdateReview.js';
import CreateReview from './createReview/CreateReview.js'


const Reviews = ({ bookId, token, user }) => {
    const [updater, setUpdater] = useState(0);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {

        fetch(`http://localhost:5000/books/${bookId}/reviews`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
            .then(res => res.json())
            .then(res => {
                if (res.msg) {
                    throw new Error(res.msg)
                }

                setReviews(res.reverse())
            })
            .catch(err => console.log(err))
        setUpdater(0);
    }, [updater, bookId, token])

    const createReview = <CreateReview bookId={bookId} token={token} setUpdater={(a) => setUpdater(a)} />;
    if (reviews.length) {
        return (<div className="reviews">
            {createReview}
            {reviews.map((review) => (
                <li className='review-with-button' key={review.id}>

                    <div className='author-review'>
                        <p className="username">{review.display_name} : </p>
                        <p className="reviewText">{review.text}</p>

                    </div>
                    {(review.user_id === user.sub) && (<div>

                        <UpdateReview bookId={bookId} token={token} setUpdater={(a) => setUpdater(a)} />
                        <DeleteReview bookId={bookId} token={token} setUpdater={(a) => setUpdater(a)} />

                    </div>)
                    }
                </li>))
            }
        </div>);
    }

    return (<div>
        <span>No reviews for this book yet</span>
        {createReview}
    </div>);

};

export default Reviews;
