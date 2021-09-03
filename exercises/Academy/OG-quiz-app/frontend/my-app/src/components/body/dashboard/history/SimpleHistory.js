import React, { useEffect, useState } from 'react'
import useAuthorizedRequest from '../../../../custom-hooks/useAuthorizedFetch';
import HistoryEntry from '../../historyPage/HistoryEntry';
import './SimpleHistory.css'

const SimpleHistory = () => {

    const LIMIT = 5;
    const [historyArray, setHistoryArray] = useState([]);
    const fetchFunc = useAuthorizedRequest();

    useEffect(() => {

        const history = async (limit) => {
            try {
                const { history } = await fetchFunc('/users/history', 'GET', { query: { limit: limit } });
                setHistoryArray(history);
            }
            catch (error) {
                console.log(error.message);
            }
        };
        history(LIMIT);
    }, [])

    return (
        <div className='simple_history_conteiner'>
            <h1 className='simple_history_header'>Last five completed quizes</h1>
            <div className='simple_history_explanations_conteiner'>
                <span>Quiz Name</span>
                <span>Category</span>
                <span>Score</span>
                <span>Date of solving </span>
            </div>
            <div className='scrollable_simple_history'>
                {historyArray.length > 0
                    ? historyArray.map((el) => (<HistoryEntry key={el.quiz_id} historyEntry={el} />))
                    : <h1 className='history_entries_no_solved_quizzes' >You have not solved any quizzes yet.</h1>}
            </div>
        </div>
    )
}

export default SimpleHistory;