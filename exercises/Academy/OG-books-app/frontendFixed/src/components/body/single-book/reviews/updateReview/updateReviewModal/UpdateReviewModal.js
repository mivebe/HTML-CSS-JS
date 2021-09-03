import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './UpdateReviewModal.css'

const UpdateReviewModal = ({ bookId, token, toggle, setUpdater }) => {
    const { register, errors, handleSubmit } = useForm();
    const [updateText, setUpdateText] = useState('');
    const updateReviewCallback = () => {
        // e.preventDefault();
        fetch(`http://localhost:5000/books/${bookId}/reviews`,
            {
                method: 'PUT',
                body: JSON.stringify({ text: updateText }),
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            }
        )
            .then(res => res.json())

            .then(() => toggle(0))
            .then(() => setUpdater(1))
    }

    const revValidation = (value) => value.trim().length > 0 && value.trim().length <= 41

    return (<div>
        <div className='cover' onClick={() => toggle(0)} />
        <div className="update-modal">
            Write your new review here.
        <form className="update-review" onSubmit={handleSubmit(updateReviewCallback)} >
                <input type="text" value={updateText} ref={register({ required: true, validate: revValidation })} name="updateReview" onChange={(e) => setUpdateText(e.target.value)} placeholder="Type your review here" />
                {errors.updateReview && <div className="review-error">Reviews must be between 1-40 symbols</div>}
                <button type="Publish" id='publish_modal_button' >Publish</button>
            </form>
            <button id='cancel_modal_button' onClick={() => toggle(0)}>Cancel</button>
        </div>
    </div>)

}

export default UpdateReviewModal;
