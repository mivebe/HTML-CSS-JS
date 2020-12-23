import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useAuthorizedRequest from '../../../custom-hooks/useAuthorizedFetch'
import QuizViewForTeacherContainer from '../dumyComponents/QuizViewForTeacherContainer'
import './QuizViewForTeacher.css'

const QuizViewForTeacher = () => {
    const [students, setStudents] = useState([])
    const quizId = useParams().id
    const fetchFunc = useAuthorizedRequest()
    useEffect(() => {
        (async () => {
            const response = await fetchFunc(`/quizzes/${quizId}/users`)
            setStudents(response)
        })()
    }, [])
    return (
        <div className='quiz_view_for_teacher_container'>
            <h1 className='quiz_view_for_teacher_header'>Students who solved the quiz</h1>
            <div className='quiz_view_for_teacher_explanations_container'>
                <span>Student name</span>
                <span>Score</span>
                <span>Date of solving</span>
            </div>
            <div className='scrollable_quiz_view_for_teacher'>
                {students.length > 1
                    ? students.map((el, index) => <QuizViewForTeacherContainer student={el} key={index} />)
                    : <h1 className='quiz_view_for_teacher_no_students' >There is still no one who solved that quiz.</h1>}
            </div>
        </div>
    )
}

export default QuizViewForTeacher
