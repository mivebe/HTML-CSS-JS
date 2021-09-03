import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import CreateReviewModal from './createReviewModal/CreateReviewModal.js'
const CreateReview = ({ bookId, token, setUpdater }) => {
    const { register, errors, handleSubmit } = useForm();
    const [err, setErr] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const createReviewCallback = () => {
        //e.preventDefault();
        setReviewText(prev => prev.trim())

        fetch(`http://localhost:5000/books/${bookId}/reviews`,
            {
                method: 'POST',
                body: JSON.stringify({ text: reviewText }),
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            }
        )
            .then(res => res.json())
            .then(res => {
                if (res.message.msg) { throw new Error('Exist') }
            })
            .then(() => setUpdater(1))
            .catch(() => setErr(1))
            .finally(() => setReviewText(''))
    }
    const revValidation = (value) => value.trim().length > 0 && value.trim().length <= 41
    return (
        <div className="Create review">
            <form onSubmit={handleSubmit(createReviewCallback)} className="Create_review" >
                <input id='create_review_input' type="text" value={reviewText} ref={register({ required: true, validate: revValidation })} name="createReview" onChange={(e) => setReviewText(e.target.value)} placeholder="Type your review here" />
                <button id='create_review_button' type="Publish"  >Publish</button>
                {errors.createReview && <div id="review-error">Reviews must be between 1-40 symbols</div>}
            </form>
            <div>
                {err ? <CreateReviewModal toggle={(a) => setErr(a)} /> : null}
            </div>
        </div>
    )
}

export default CreateReview;