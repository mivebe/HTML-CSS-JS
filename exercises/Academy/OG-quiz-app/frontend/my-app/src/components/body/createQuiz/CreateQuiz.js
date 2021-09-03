import React, { useState } from 'react';
import CreateQuizForm from './CreateQuizForm.js';
import CreateQuestionForm from './CreateQuestionForm.js';
import useAuthorizedRequest from '../../../custom-hooks/useAuthorizedFetch.js';
import { toast } from 'react-toastify';
import Question from '../dumyComponents/Question.js';
import './CreateQuiz.css'
import ExportQuizModal from '../dumyComponents/ExportQuizModal';

const CreateQuiz = () => {
  const [quizInfo, setQuizInfo] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [toExport, setToExport] = useState();
  const fetchFunc = useAuthorizedRequest();
  const onsubmit = async () => {
    if (questions.length >= 2) {
      try {
        const [response] = await fetchFunc(`/quizzes/${quizInfo.id}`, 'POST');
        toast.success('Quiz was successfully created.', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1500,
        });
        setToExport(await response);
      } catch (error) {
        console.log(error.message);
      }
    } else {
      return toast.error('There must be atleast 2 questions!', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const backToQuizFormOnClick = () => {
    setQuizInfo(null)
    setToExport(null)
    setQuestions([])
  }

  if (!quizInfo) {
    return <CreateQuizForm setQuizInfo={setQuizInfo} />;
  }

  return (
    <div className='create_quiz_container'>
      <div className='create_question_full_container'>
        <CreateQuestionForm quizId={quizInfo.id} setQuestions={setQuestions} />
      </div>
      <div className='submit_quiz_button_container'>
        <button className='submit_quiz_button' onClick={onsubmit}>Submit Quiz</button>
      </div>
      <div className='quiz_info_container'>
        {quizInfo ? (
          <>
            <div className='quiz_header_info'>
              <span>Quizz title: {quizInfo.name}</span>
              <span>Category: {quizInfo.category}</span>
              <span>Time limit: {quizInfo.time_limit / 60} min.</span>
              {toExport && <ExportQuizModal handleClick={backToQuizFormOnClick} toExport={toExport} />}
            </div>
            <div className='scrollable_created_quizes'>
              <div className='created_questions_container'>
                {questions.map((el) => (
                  <Question key={el.id} question={el} />
                ))}
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default CreateQuiz;
