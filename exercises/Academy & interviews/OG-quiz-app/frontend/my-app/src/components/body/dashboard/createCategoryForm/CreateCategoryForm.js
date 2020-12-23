import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import useAuthorizedRequest from '../../../../custom-hooks/useAuthorizedFetch.js';
import { CategoriesContext } from '../../../contexts/CategoriesContext.js';
import './CreateCategoryForm.css'
import { toast } from 'react-toastify';

const CreateCategoryForm = () => {
  const { register, errors, handleSubmit, setValue } = useForm();
  const { setCategoriesState } = useContext(CategoriesContext);
  const fetchFunc = useAuthorizedRequest();
  const onSubmit = async (data) => {
    try {
      const response = await fetchFunc('/categories', 'POST', {
        body: { categoryName: data.category },
      });
      setCategoriesState((prevCategories) => [...prevCategories, response[0]]);
      toast.success('Category was successfully created.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      setValue('category', '');
    } catch (error) {
      console.log(error.message);
      if (error.message === 'Category with that name already exist!') {
        toast.warning(error.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2500,
        });
        setValue('category', '');
      }
    }
  };

  const numberChecker = (value) => isNaN(+value);

  return (
    <div className='create_category_form_container'>
      <h1 className='create_category_form_header'>Create your category</h1>
      <form className='create_category_form' onSubmit={handleSubmit(onSubmit)}>
        <input
          className='create_category_form_input'
          type='text'
          placeholder='Category'
          ref={register({ required: true, minLength: 2, validate: numberChecker })}
          name='category'
        ></input>
        {errors.category && <span>Category must contain atleast 1 letter and atleast 2 symbols</span>}
        <button className='create_category_form_button'>Submit</button>
      </form>
    </div>
  );
};

export default CreateCategoryForm;
