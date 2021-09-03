import React from 'react'

const SimpleQuizView = ({ quiz }) => {
    const convertedTimeLimit = Math.round(quiz.time_limit / 60)
    return (
        <div className='simple_quiz_view_conteiner'>
            <span>{quiz.name}</span>
            <span>{convertedTimeLimit} min.</span>
            <span>{quiz.category}</span>
        </div>
    )
}

export default SimpleQuizView
