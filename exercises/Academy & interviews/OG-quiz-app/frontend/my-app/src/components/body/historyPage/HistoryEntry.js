import React from 'react'

const HistoryEntry = ({ historyEntry }) => {

    const date = new Date(historyEntry.date_of_solving);

    return (<div className='historyEntry'>
        <span>{historyEntry.quiz_name}</span>
        <span>{historyEntry.category}</span>
        <span>{historyEntry.score}</span>
        <span>{date.toLocaleDateString()}</span>
    </div>)
}

export default HistoryEntry;
