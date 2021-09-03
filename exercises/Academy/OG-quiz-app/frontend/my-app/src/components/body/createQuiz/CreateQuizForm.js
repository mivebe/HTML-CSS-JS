import React, { useContext, useState } from 'react';
import { CategoriesContext } from '../../contexts/CategoriesContext.js';
import { useForm } from 'react-hook-form';
import CreateQuizCategoriesDropdown from '../dumyComponents/CreateQuizCategoriesDropdown.js';
import useAuthorizedRequest from '../../../custom-hooks/useAuthorizedFetch.js';
import { toast } from 'react-toastify';
import ImportQuiz from './importQuiz/ImportQuiz.js';

const CreateQuizForm = ({ setQuizInfo }) => {
  const { categoriesCont } = useContext(CategoriesContext);
  const { register, handleSubmit, setValue } = useForm();
  const [category, setCategory] = useState(null);
  const fetchFunc = useAuthorizedRequest();
  const onSubmit = async (data) => {
    const convertedTimeLimit = data.timeLimit * 60
    if (data.timeLimit < 1 || data.timeLimit > 120 || isNaN(+data.timeLimit)) {
      toast.warning('Time limit must be number in a range of [1-120]', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2500,
      });
      setValue('timeLimit', '')
      return
    }
    if (data.name.length < 5) {
      toast.warning('Title of the quiz must be atleast 5 symbols.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2500,
      });
      return
    }
    if (!category) {
      toast.warning('You need to choose category.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2500,
      });
      return
    }
    try {
      const response = await fetchFunc('/quizzes', 'POST', {
        body: {
          name: data.name,
          timeLimit: convertedTimeLimit,
          categoryId: category,
        },
      });
      setQuizInfo(response[0]);
    } catch (error) {
      if (error.message === 'Quiz with that name already exist!') {
        toast.warning(error.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3500,
        });
        setValue('name', '')
      } else {
        console.log(error.message);
      }
    }
  };

  return (
    <div className='create_quiz_form_container'>
      <div className='create_quiz_form_dropdown'>
        <CreateQuizCategoriesDropdown
          setCategory={setCategory}
          categories={categoriesCont}
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type='text'
          placeholder='Title of the quiz'
          name='name'
          ref={register({ required: true })}
        ></input>

        <input
          type='text'
          placeholder='Time limit in minutes'
          name='timeLimit'
          ref={register({ required: true })}
        ></input>
        <button>Submit</button>
      </form>
      <ImportQuiz />
    </div>
  );
};

export default CreateQuizForm;
