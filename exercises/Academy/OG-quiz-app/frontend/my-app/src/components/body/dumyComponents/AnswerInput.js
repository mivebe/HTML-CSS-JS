import React from 'react';

const AnswerInput = ({
  deleteAnswer,
  value,
  isCorrect,
  checkboxValue,
  textValue,
}) => {
  return (
    <div className='create_answer'>
      <input
        className='create_answer_checkbox'
        onChange={checkboxValue}
        checked={isCorrect}
        type='checkbox'
      ></input>
      <input
        className='create_answer_text_input'
        value={value}
        onChange={(event) => textValue(event.target.value)}
        type='text'
      ></input>
      <button className='create_answer_delete_button' onClick={deleteAnswer}>Delete</button>
    </div>
  );
};

export default AnswerInput;
