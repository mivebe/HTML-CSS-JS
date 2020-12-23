import React, { useState, useEffect } from 'react'
import useAuthorizedRequest from '../../../../custom-hooks/useAuthorizedFetch';
import LeaderboardEntry from '../../leaderboardPage/LeaderboardEntry';
import './SimpleLeaderboard.css'

const SimpleLeaderboard = () => {

    const limit = 10;
    const [leaderboard, setLeaderboard] = useState([]);
    const fetchFunc = useAuthorizedRequest();

    useEffect(() => {

        const leaderboard = async (limit) => {
            try {
                const { leaderboard } = await fetchFunc('/users/leaderboard', 'GET', { query: { limit: limit } });
                setLeaderboard(leaderboard);
            }
            catch (error) {
                console.log(error.message);
            }
        };
        leaderboard(limit);
    }, [])

    return (
        <div className='simple_leaderboard_conteiner'>
            <h1 className='simple_leaderboard_header'>Leaderboard</h1>
            <div className='simple_leaderboard_explanations_conteiner'>
                <span>Student</span>
                <span>Score</span>
                <span>Quizzes taken</span>
            </div>
            <div className='scrollable_simple_leaderboard'>
                {leaderboard.map((el) => (<LeaderboardEntry key={el.user_id} leaderboardEntry={el} />))}
            </div>
        </div>
    )
}

export default SimpleLeaderboard
