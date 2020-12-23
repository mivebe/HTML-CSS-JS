import React from 'react'

const LeaderboardEntry = ({ leaderboardEntry }) => {

    return (
        <div className='leaderboardEntry'>
            <span>{leaderboardEntry.first_name} {leaderboardEntry.last_name}</span>
            <span>{leaderboardEntry.points}</span>
            <span>{leaderboardEntry.quizzes_count}</span>
        </div>)
}

export default LeaderboardEntry;