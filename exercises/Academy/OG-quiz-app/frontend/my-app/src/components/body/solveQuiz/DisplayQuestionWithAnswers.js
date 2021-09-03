import React from 'react'

const DisplayQuestionWithAnswers = ({ question, givenAnswers }) => {

    const questionId = question.id;
    const chooseAnswer = (answerId, givenAnswers) => () => {
        if (!givenAnswers.get(questionId).has(answerId)) {
            givenAnswers.get(questionId).add(answerId);
        }
        else {
            givenAnswers.get(questionId).delete(answerId);
        }
    }

    return (
        <div className='solve_quiz_question'>
            <div className='solve_quiz_question_header_container'>
                <div className='solve_quiz_question_text'>
                    <span>{question.question}</span>
                </div>
                <div className='solve_quiz_question_points_and_type'>
                    <span>Points: {question.points}  </span>
                    {question.isMultiple ? <span>Type: (M)</span> : <span>Type: (S)</span>}
                </div>
            </div>
            <div className='solve_quiz_question_answers_container'>
                {question.answers.map((el) => {
                    return (<div className='solve_quiz_question_answer' key={el.id}>
                        <input type='checkbox' onChange={chooseAnswer(el.id, givenAnswers)} />
                        <span>{el.answer}</span>
                    </div>)
                })}
            </div>
        </div>
    )
}

export default DisplayQuestionWithAnswers
