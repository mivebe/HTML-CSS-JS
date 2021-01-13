import React, { useState } from 'react';
import UpdateReviewModal from './updateReviewModal/UpdateReviewModal.js';

const UpdateReview = ({bookId,token, setUpdater }) => { 
   
    const [err, setErr] = useState(0);
    
    return (<span>
        <button onClick={() => setErr(1)}>Update</button>
        {err ? <UpdateReviewModal bookId={bookId} token={token} toggle={(a) => setErr(a)} setUpdater={setUpdater} /> : null}
        </span>)


}
export default UpdateReview;