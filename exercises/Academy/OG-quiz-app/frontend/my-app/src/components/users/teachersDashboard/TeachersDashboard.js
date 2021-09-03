import React from 'react';
import Categories from '../../body/dashboard/categories/Categories.js';
import './TeachersDashboard.css';
import CreateCategoryForm from '../../body/dashboard/createCategoryForm/CreateCategoryForm.js';
import TeacherQuizzes from '../../body/dashboard/teacherQuizzes/TeacherQuizzes.js';
const TeachersDashboard = () => {
  return (
    <div className='teachers_dashboard'>
      <div className='teachers_dashboard_categories'>{<Categories />}</div>
      <div className='teachers_dashboard_right_part'>
        <div className='teachers_dashboard_category_form'>
          <CreateCategoryForm />
        </div>
        <div className='teachers_dashboard_leaderboard'>{<TeacherQuizzes />}</div>
      </div>
    </div>
  );
};

export default TeachersDashboard;
