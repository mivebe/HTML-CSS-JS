import React, { useEffect, useState } from 'react'
import { useBeforeunload } from 'react-beforeunload';
import { useHistory, useLocation, withRouter } from 'react-router-dom'
import useAuthorizedRequest from '../../../custom-hooks/useAuthorizedFetch';
import ReactCountdownClock from 'react-countdown-clock'
import DisplayQuestionWithAnswers from './DisplayQuestionWithAnswers';
import SubmitConfirmDialog from '../dumyComponents/SubmitConfirmDialog';
import ScoreModal from './scoreModal/ScoreModal';
import './SolveQuiz.css'
import { removeItemLocalStorage } from '../../account/localStorageService';

const SolveQuizPage = (props) => {

    const { id } = props.match.params;
    const fetchFunc = useAuthorizedRequest();
    const history = useHistory();
    const [quiz, setQuiz] = useState({});
    const [questions, setQuestions] = useState([]);
    const [givenAnswers, setGivenAnswers] = useState(new Map());
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const location = useLocation();
    useBeforeunload((ev) => {
        ev.preventDefault();
        submitQuiz();
    });

    window.history.pushState(null, null, location.href);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const [quizInfo] = await fetchFunc(`/quizzes/${id}`);
                if (!quizInfo) {
                    history.push('/');
                }
                else {
                    setQuiz(quizInfo);
                    setQuestions(quizInfo.questions);
                    setGivenAnswers(quizInfo.questions.reduce((acc, el) => {
                        return acc.set(el.id, new Set());
                    }, new Map()));
                }
            }
            catch (error) {
                history.push('/');
            };
        }
        fetchData();
    }, []);

    const submitQuiz = async () => {
        removeItemLocalStorage('currentQuiz');
        try {
            const body = { questions: [...givenAnswers].map(([questionId, value]) => ({ questionId, answers: [...value] })) };
            const { score } = await fetchFunc(`/quizzes/${id}/answers`, 'POST', { body });
            setScore(score);
            setShowScore(true);
        } catch (error) {
            history.push('/');
        }
    }

    return (
        <div className='solve_quiz_container'>
            <div className='solve_quiz_header'>
                <h1>{quiz.name}</h1>
            </div>
            <div className='solve_quiz_info'>
                <div className='solve_quiz_info_left_part'>
                    <h4>Created by {quiz.author_first_name} {quiz.author_last_name}</h4>
                    <div>
                        < SubmitConfirmDialog submitQuiz={submitQuiz} />
                    </div>
                </div>
                {quiz.time_limit && <div className='solve_quiz_info_right_part'>
                    <ReactCountdownClock seconds={quiz.time_limit}
                        color='#b478a3'
                        alpha={0.9}
                        size={120}
                        weight={16}
                        showMilliseconds={true}
                        onComplete={submitQuiz}
                        paused={showScore} />
                </div>}
            </div>
            <div className='solve_quiz_details_and_score_container'>
                {showScore && <ScoreModal score={score} />}
                <h4>(M) is for multiple choice question.(S) is for single choice question.</h4>
            </div>
            <div className='solve_quiz_questions_scrollable'>
                <div className='solve_quiz_questions_container'>
                    {questions.map((el) => {
                        return <DisplayQuestionWithAnswers key={el.id} question={el} givenAnswers={givenAnswers} />
                    })}
                </div>
            </div>
        </div>
    )
}

export default withRouter(SolveQuizPage)
