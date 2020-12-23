import React from 'react';

const Answer = ({ answer }) => {

  return (
    <div className='created_answer'>
      {answer.correct ? <span>Correct</span> : <span>Incorrect</span>}
      <h5>{answer.answer}</h5>
    </div>
  );
};

export default Answer;
