import React, { useEffect, useState } from 'react';
import './RateBook.css';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';


const RateBook = ({ bookId, setRate, token }) => {
    const [value, setValue] = useState(0);
    const [showRateStars, setShowRateStars] = useState(false);
    useEffect(() => {
        fetch(`http://localhost:5000/books/${bookId}/rate/status`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
            }
        )
            .then(res => res.json())
            .then((res) => {
                if (res.canRate) {
                    setValue(res.rating);
                    setShowRateStars(true);
                }
            })
    }, [bookId, token])

    const rateBookCallback = (rate) => {

        fetch(`http://localhost:5000/books/${bookId}/rate`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ rating: `${rate}` })
            }
        )
            .then(res => res.json())
            .then(() => setRate(rate))

    }
    const removeRateCallback = (rate) => {

        fetch(`http://localhost:5000/books/${bookId}/rate`,
            {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            }
        )
            .then(res => res.json())
            .then(() => setRate(-1))

    }
    return (showRateStars &&
        (<div className="rate-stars">
            <Typography component="legend">Rate the book: </Typography>
            <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                    if (newValue) {
                        rateBookCallback(event.target.value);
                    }
                    else { removeRateCallback(0) }
                }}
            />
        </div>)
    );
}

export default RateBook;