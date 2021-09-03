import React from 'react';
import Answer from './Answer';

const Question = ({ question }) => {

  return (
    <div className='created_question'>
      <h3 className='created_question_header_info'>Question: {question.question}</h3>
      <h4 className='created_question_header_info'>Points: {question.points}</h4>
      <div className='created_answers_container'>
        {question.answers.map((el) => (
          <Answer key={el.answer_id} answer={el} />
        ))}
      </div>
    </div>
  );
};

export default Question;
