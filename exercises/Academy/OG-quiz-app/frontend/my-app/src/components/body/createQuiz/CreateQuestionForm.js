import React, { useState } from 'react';
import AnswerInput from '../dumyComponents/AnswerInput.js';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import useAuthorizedRequest from '../../../custom-hooks/useAuthorizedFetch.js';

const CreateQuestionForm = ({ setQuestions, quizId }) => {
  const { register, handleSubmit, setValue } = useForm();
  const [answersFields, setAnswersField] = useState([
    {
      value: '',
      isCorrect: false,
    },
    {
      value: '',
      isCorrect: true,
    },
  ]);
  const fetchFunc = useAuthorizedRequest();
  const submitQuestion = async (data) => {
    const question = {
      question: data.question,
      points: data.points,
      isMultiple: null,
      correctAnswers: null,
      answers: [],
    };
    const filteredAnswers = answersFields.reduce((acc, answer) => {
      if (answer.isCorrect && answer.value.length > 0) {
        acc.correctAnswersCheck++;
      }
      if (answer.value.length > 0) {
        acc.set.add(answer.value);
      }
      if (answer.value.length > 0) {
        acc.answers.push(answer)
      }

      return acc
    }, {
      correctAnswersCheck: 0,
      set: new Set(),
      answers: []
    })

    if (
      isNaN(+question.points) ||
      +question.points < 1 ||
      +question.points > 6
    ) {
      return toast.error('Points must be a number between [1, 6]!', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    if (
      filteredAnswers.correctAnswersCheck >= filteredAnswers.answers.length &&
      filteredAnswers.answers.length > 0
    ) {
      return toast.error('Possible answers must be more then correct ones!', {
        position: toast.POSITION.TOP_CENTER,
      });
    }

    if (filteredAnswers.set.size < filteredAnswers.answers.length && filteredAnswers.answers.length > 0) {
      return toast.error('Answers must be unique!', {
        position: toast.POSITION.TOP_CENTER,
      });
    }

    if (filteredAnswers.answers.length < 2) {
      return toast.error('There must be atleste 2 answers!', {
        position: toast.POSITION.TOP_CENTER,
      });
    }

    if (filteredAnswers.correctAnswersCheck === 0) {
      return toast.error('There must be atleste 1 correct answer!', {
        position: toast.POSITION.TOP_CENTER,
      });
    }

    filteredAnswers.correctAnswersCheck > 1
      ? (question.isMultiple = true)
      : (question.isMultiple = false);
    question.correctAnswers = filteredAnswers.correctAnswersCheck;
    question.answers = filteredAnswers.answers;

    try {
      const response = await fetchFunc(`/quizzes/${quizId}/questions`, 'POST', {
        body: { question: question },
      });
      setQuestions((prevState) => [...prevState, response[0]]);
      setValue('question', '');
      setValue('points', '');
      setAnswersField([
        {
          value: '',
          isCorrect: false,
        },
        {
          value: '',
          isCorrect: false,
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAnswer = (key) => () => {
    if (answersFields.length > 2) {
      const temp = answersFields.slice();
      temp.splice(key, 1);
      setAnswersField(temp);
    }
  };

  const addAnswer = () => {
    if (answersFields.length <= 5) {
      setAnswersField([...answersFields, { value: '', isCorrect: false }]);
    } else {
      toast.warning('There is a maximum of 6 answers', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2500,
      });
    }
  };

  const isCorrect = (key) => () => {
    const shallowAnswers = [...answersFields];
    const itemToChange = shallowAnswers[key];
    itemToChange.isCorrect = !itemToChange.isCorrect;
    setAnswersField(shallowAnswers);
  };

  const textChange = (key) => (value) => {
    if (value.length > 120) {
      return toast.warning('Answer can contain maximum of 120 symbols!', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    const shallowAnswers = [...answersFields];
    const itemToChange = shallowAnswers[key];
    itemToChange.value = `${value}`;
    setAnswersField(shallowAnswers);
  };

  return (
    <div className='create_question_form_container'>
      <form onSubmit={handleSubmit(submitQuestion)}>
        <input
          type='text'
          placeholder='Points between [1-6]'
          ref={register({ required: true })}
          name='points'
        ></input>
        <input
          type='text'
          placeholder='question'
          ref={register({ required: true })}
          name='question'
        ></input>
        <button>Submit question</button>
      </form>
      <div className='create_answers_fields_container'>
        <div className='create_answers_container'>
          {answersFields.map((answer, index) => (
            <AnswerInput
              key={index}
              deleteAnswer={deleteAnswer(index)}
              checkboxValue={isCorrect(index)}
              textValue={textChange(index)}
              value={answer.value}
              isCorrect={answer.isCorrect}
            />
          ))}
        </div>
        <button className='create_answers_fields_add_button' onClick={addAnswer}>Add answer</button>
      </div>
    </div>
  );
};

export default CreateQuestionForm;
