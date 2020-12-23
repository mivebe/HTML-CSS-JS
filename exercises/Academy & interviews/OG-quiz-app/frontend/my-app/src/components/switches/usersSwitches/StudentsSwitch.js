import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import StudentsDashboard from '../../users/studentsDashboard/StudentsDashboard.js';
import NavBar from '../../body/navBar/NavBar.js';
import PageNotFound from '../../PageNotFound/PageNotFound.js';
import HistoryPage from '../../body/historyPage/HistoryPage.js';
import LeaderboardPage from '../../body/leaderboardPage/LeaderBoardPage.js';
import QuizzesInCategory from '../../body/quizzesInCategory/QuizzesInCategory.js';
import SolveQuizPage from '../../body/solveQuiz/SolveQuizPage.js';

const StudentsSwitch = () => {
  return (
    <Switch>
      <Redirect path='/' exact to='/dashboard' />
      <Route path='/dashboard' exact>
        <NavBar />
        <StudentsDashboard />
      </Route>
      <Route path='/categories/:id/quizzes' >
        <NavBar />
        <QuizzesInCategory />
      </Route>
      <Route path='/users/history'>
        <NavBar />
        <HistoryPage />
      </Route>
      <Route path='/leaderboard'>
        <NavBar />
        <LeaderboardPage />
      </Route>
      <Route path='/quizzes/:id'>
        <SolveQuizPage />
      </Route>
      <Route path='*' component={PageNotFound} />
    </Switch>
  );
};

export default StudentsSwitch;
