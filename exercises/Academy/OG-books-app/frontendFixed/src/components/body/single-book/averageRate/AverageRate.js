import React, { useEffect, useState, useContext } from 'react';
import './AverageRate.css';
import StarIcon from '@material-ui/icons/Star';
import { AuthContext } from '../../../contexts/AuthContext.js';
const AverageRate = ({ bookId, rate }) => {
    const { token } = useContext(AuthContext);
    const [avgRate, setAvgRate] = useState(0);
    useEffect(() => {

        if (bookId) {
            fetch(`http://localhost:5000/books/${bookId}/rate`,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    }

                }
            )
                .then(res => res.json())
                .then(res => {
                    if (res[0]) {
                        setAvgRate(res[0].avgRaiting)
                    }
                    else { setAvgRate(0) }
                })
        }
    }, [rate, bookId, token])

    return (<div className="rate-stuff">
        {avgRate ?
            <div id="average-rate">
                <h5>Average rating: {avgRate.toFixed(1)}
                </h5>
                <StarIcon style={{ color: "gold" }} />
            </div> :
            <span>No rates for this book yet</span>
        }
    </div>);
}

export default AverageRate;