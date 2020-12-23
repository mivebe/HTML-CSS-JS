import React, { useContext } from 'react'
import { getLocalStorage } from '../../account/localStorageService';
import { AuthContext } from '../../contexts/AuthContext';
import CustomizedDialogs from '../dumyComponents/CustomizedDialogs';

const SimpleQuizView = ({ quiz, view }) => {
    const { user } = useContext(AuthContext)
    const date = new Date(quiz.date_of_solving)
    let convertedTimeLimit = Math.round(quiz.time_limit / 60)
    const currentQuiz = getLocalStorage('currentQuiz');
    return (
        <div className='category_quizzes_entry'>
            <div className='category_quizzes_entry_main_part'>
                <span>{quiz.name}</span>
                <span>{convertedTimeLimit} min.</span>
                <span>{quiz.first_name} {quiz.last_name}</span>
            </div>
            <div className='category_quizzes_entry_second_part'>
                {quiz.date_of_solving ?
                    <div className='category_quizzes_solved_info'>
                        <span>Solved at: {date.toLocaleDateString()}</span>
                        <span>Score: {quiz.score}</span>
                    </div> : (!currentQuiz && <CustomizedDialogs quizId={quiz.id} /> )}
                {user.role === 'teacher' ? <button className='category_quizzes_entry_view_button' onClick={() => view()}>View</button> : null}
            </div>
        </div>
    );
}

export default SimpleQuizView
