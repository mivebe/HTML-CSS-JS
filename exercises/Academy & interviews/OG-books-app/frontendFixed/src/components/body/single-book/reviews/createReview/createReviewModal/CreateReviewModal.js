import React from 'react'
import './CreateReviewModal.css'

const CreateReviewModal = ({ toggle }) => {

    return (<div className="create-modal">
        <h4>You have written a review for this book already. </h4>
        <h4> You can update it.</h4>
        <button id='update_review_cancel' onClick={() => toggle(0)}>Ok</button>
    </div>)



}

export default CreateReviewModal;