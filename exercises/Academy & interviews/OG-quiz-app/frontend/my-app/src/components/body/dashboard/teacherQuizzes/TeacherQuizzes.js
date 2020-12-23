import React, { useEffect, useState } from 'react'
import useAuthorizedFetch from '../../../../custom-hooks/useAuthorizedFetch.js'
import SimpleQuizView from '../../dumyComponents/SimpleQuizView.js'
import './TeacherQuizzes.css'

const TeacherQuizzes = () => {
    const fetchFunc = useAuthorizedFetch()
    const [teacherQuizzes, setTeacherQuizzes] = useState([])
    useEffect(() => {
        (async () => {
            try {
                const response = await fetchFunc('/users/quizzes')
                setTeacherQuizzes(response)
            } catch (error) {
                console.log(error.message);
            }
        })()

    }, [])

    return (
        <div className='teacher_quizzes_conteiner'>
            <h1 className='teacher_quizzes_header'>Your quizzes</h1>
            <div className='teacher_quizzes_explanations_conteiner'>
                <span>Quiz title</span>
                <span>Time limit</span>
                <span>Category</span>
            </div>
            <div className='scrollable_teacher_quizzes'>
                {teacherQuizzes.map((el) => <SimpleQuizView key={el.id} quiz={el} />)}
            </div>
        </div>
    )
}

export default TeacherQuizzes
