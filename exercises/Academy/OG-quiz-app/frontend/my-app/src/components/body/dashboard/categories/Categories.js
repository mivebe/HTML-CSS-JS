import React, { useContext } from 'react';
import { CategoriesContext } from '../../../contexts/CategoriesContext.js';
import Category from '../../dumyComponents/Category.js';
import './Categories.css';

const Categories = () => {
  const { categoriesCont } = useContext(CategoriesContext);

  return (
    <>
      <h1 className='categories_header'>Categories</h1>
      <div className='scrollable'>
        <div className='categories_container'>
          {categoriesCont.map((el) => (
            <Category key={el.id} category={el} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Categories;
