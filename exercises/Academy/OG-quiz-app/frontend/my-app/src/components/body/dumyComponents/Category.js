import React from 'react';
import { useHistory } from 'react-router-dom';

const Category = ({ category }) => {

  const history = useHistory();
  return (
    <div className='category'>
      <div className='category_el'>{category.category}</div>
      <button className='category_el' onClick={() => { history.push(`/categories/${category.id}/quizzes`) }}>Go to category</button>
    </div>
  );
};

export default Category;
