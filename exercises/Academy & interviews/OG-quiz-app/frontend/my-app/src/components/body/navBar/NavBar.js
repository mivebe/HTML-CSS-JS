import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import { AuthContext } from '../../contexts/AuthContext.js';
import { CategoriesContext } from '../../contexts/CategoriesContext.js';
import Logout from '../../account/Logout.js';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

const NavBar = () => {
  const auth = useContext(AuthContext);
  const { categoriesCont } = useContext(CategoriesContext);
  const history = useHistory();
  const onClick = () => {
    if (categoriesCont.length > 0) {
      history.push('/quizzes');
    } else {
      toast.warning('You need to create category first.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3500,
      });
    }
  };
  return (
    <div className='nav_bar'>
      <Link to='/dashboard'>
        <button className='nav_bar_button'>Dashboard</button>
      </Link>
      <Link to='/leaderboard'>
        <button className='nav_bar_button'>Leaderboard</button>
      </Link>
      {auth.user.role === 'teacher' ? (
        <button onClick={() => onClick()} className='nav_bar_button'>
          Create quiz
        </button>
      ) : null}
      {auth.user.role === 'student' ? (
        <Link to='/users/history'>
          <button className='nav_bar_button'>History</button>
        </Link>
      ) : null}
      <div className='nav_bar_message'>
        <h2>Have fun with your adventures:</h2>
        <p>{auth.user.username}</p>
        <Logout />
      </div>
    </div>
  );
};

export default NavBar;
