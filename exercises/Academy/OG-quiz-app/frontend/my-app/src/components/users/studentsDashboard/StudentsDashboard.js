import React from 'react';
import './StudentsDashboard.css';
import Categories from '../../body/dashboard/categories/Categories.js';
import SimpleHistory from '../../body/dashboard/history/SimpleHistory';
import SimpleLeaderboard from '../../body/dashboard/leaderboard/SimpleLeaderboard';

const StudentsDashboard = () => {
  return (
    <div className='student_dashboard'>
      <div className='students_dashboard_categories'>
        <Categories /></div>
      <div className='students_dashboard_right_part'>
        <div className='students_dashboard_leaderboard'>
          <SimpleLeaderboard />
        </div>
        <div className='students_dashboard_history'>
          <SimpleHistory />
        </div>
      </div>
    </div>
  );
};

export default StudentsDashboard;
