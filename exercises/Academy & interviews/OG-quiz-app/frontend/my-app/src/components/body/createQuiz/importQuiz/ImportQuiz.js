import React, { useContext, useEffect, useState } from 'react'
import useAuthorizedRequest from '../../../../custom-hooks/useAuthorizedFetch';
import { CategoriesContext } from '../../../contexts/CategoriesContext';
import { toast } from 'react-toastify';

const ImportQuiz = () => {

    const fetchFunc = useAuthorizedRequest();
    const { categoriesCont } = useContext(CategoriesContext);
    const [quiz, setQuiz] = useState();
    const [errors, setErrors] = useState([]);
    const [categoryId, setCategoryId] = useState();
    const [fileName, setFileName] = useState('')

    const onImport = async (ev) => {

        ev.preventDefault();
        try {
            const response = await fetchFunc('/quizzes', 'POST', {
                body: {
                    name: quiz.name,
                    timeLimit: quiz.timeLimit * 60,
                    categoryId,
                },
            });

            await Promise.all(quiz.questions.map(async (el) => {

                return await fetchFunc(`/quizzes/${response[0].id}/questions`, 'POST', {
                    body: { question: el }
                });

            }));

            await fetchFunc(`/quizzes/${response[0].id}`, 'POST');

            toast.success('Quiz was successfully created.', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
            });

        } catch (error) {
            if (error.message) {
                setErrors(prev => [...prev, error.message]);
            } else {
                alert(error.message);
            }
        }
    }

    const handleChangeFile = (ev) => {
        setErrors([]);
        const currentFile = ev.target.files[0];
        if (!currentFile) {
            setErrors(['No selected file']);
        }
        else if (currentFile.type !== 'application/json') {
            setErrors(['File type should be .json']);
        }
        else {
            setFileName(currentFile.name)
            const fileData = new FileReader();
            fileData.onloadend = (e) => {
                const content = e.target.result;
                const parsedQuiz = JSON.parse(content);
                if (parsedQuiz.quiz) {
                    setQuiz(parsedQuiz.quiz);
                }
                else {
                    setErrors(prev => [...prev, 'Invalid quiz format']);
                }
            };
            fileData.readAsBinaryString(currentFile);
        }
    }

    useEffect(() => {

        if (quiz) {
            const importCategoryIndex = categoriesCont.findIndex((el) => el.category === quiz.category);
            if (!quiz.name) {
                setErrors(prev => [...prev, 'Quiz name is required']);
            }
            if (quiz.timeLimit < 1 || quiz.timeLimit > 120) {
                setErrors(prev => [...prev, 'Time limit must be in minutes in a range of [1-120]']);
            }
            if (!quiz.category || importCategoryIndex < 0) {
                setErrors(prev => [...prev, 'Invalid category']);
            }
            else { setCategoryId(categoriesCont[importCategoryIndex].id) }
            if (!quiz.questions || quiz.questions.length < 2) {
                setErrors(prev => [...prev, 'Quiz should have atleast 2 questions']);
            }
            else {
                const quizCheck = quiz.questions.reduce((acc, el) => {

                    if (!el.question || el.points < 1 || el.points > 6) {
                        return true;
                    }
                    if (!el.answers || el.answers.length < 2) {
                        return true;
                    }
                    else {
                        const answersCheck = el.answers.reduce((accTwo, elTwo) => {

                            if ((elTwo.answer || elTwo.answer === 0) && elTwo.isCorrect) {
                                return accTwo + 1;
                            }
                            return accTwo
                        }, 0)
                        return acc | el.correctAnswers !== answersCheck | answersCheck - 1 < el.isMultiple | (!el.isMultiple && answersCheck > 1);
                    }
                }, false)
                if (quizCheck) {
                    setErrors(prev => [...prev, 'Invalid questions/answers']);
                }
            }
        }
    }, [quiz]);

    return (
        <div>
            <form className='import_quiz_container' onSubmit={onImport}>
                <input id='file' type='file' onChange={handleChangeFile} />
                <label htmlFor="file">Click here for upload</label>
                {fileName ? <p>{fileName}</p> : null}
                <button className='import_quiz_submit_button' disabled={(quiz && errors.length) || !quiz}>Submit your file</button>
                {errors.length > 0 && errors.map((el, i) => (<span key={i}>{el}</span>))}
            </form>
        </div>
    )
}

export default ImportQuiz
