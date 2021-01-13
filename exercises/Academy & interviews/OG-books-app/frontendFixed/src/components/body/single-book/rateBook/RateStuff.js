import React, { useState } from 'react';
import RateBook from '../rateBook/RateBook.js';
import AverageRate from '../averageRate/AverageRate.js';

const RateStuff = ({ bookId, token }) => {

    const [rate, setRate] = useState(0);

    return (<div className="rate-stuff">
        <AverageRate bookId={bookId} token={token} rate={rate} />
        <br />
        <RateBook bookId={bookId} setRate={setRate} token={token} />
    </div>);
}

export default RateStuff;