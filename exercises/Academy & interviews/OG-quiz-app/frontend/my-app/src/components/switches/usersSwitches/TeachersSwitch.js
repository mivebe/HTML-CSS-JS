import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PageNotFound from '../../PageNotFound/PageNotFound.js';
import NavBar from '../../body/navBar/NavBar.js';
import TeachersDashboard from '../../users/teachersDashboard/TeachersDashboard.js';
import { CategoriesContext } from '../../contexts/CategoriesContext.js';
import CreateQuiz from '../../body/createQuiz/CreateQuiz.js';
import LeaderboardPage from '../../body/leaderboardPage/LeaderBoardPage.js';
import QuizzesInCategory from '../../body/quizzesInCategory/QuizzesInCategory.js';
import SolveQuizPage from '../../body/solveQuiz/SolveQuizPage.js';
import QuizViewForTeacher from '../../body/quizViewForTeacher/QuizViewForTeacher.js';

const TeachersSwitch = () => {
  const { categoriesCont } = useContext(CategoriesContext);
  return (
    <Switch>
      <Redirect path='/' exact to='/dashboard' />
      <Route path='/dashboard' exact>
        <NavBar />
        <TeachersDashboard />
      </Route>
      <Route path='/categories' exact>
        <NavBar />
      </Route>
      <Route path='/leaderboard'>
        <NavBar />
        <LeaderboardPage />
      </Route>
      <Route path='/categories/:id/quizzes' >
        <NavBar />
        <QuizzesInCategory />
      </Route>
      <Route path='/quizzes' exact>
        {categoriesCont.length > 0 ? (
          <>
            <NavBar /> <CreateQuiz />
          </>
        ) : (
            <Redirect to='/dashboard' />
          )}
      </Route>
      <Route path='/quizzes/:id' exact>
        <SolveQuizPage />
      </Route>
      <Route path='/quizzes/:id/users'>
        <NavBar />
        <QuizViewForTeacher />
      </Route>
      <Route path='*' component={PageNotFound} />
    </Switch>
  );
};

export default TeachersSwitch;
