import React from 'react'
import '../quizViewForTeacher/QuizViewForTeacher.css'

const QuizViewForTeacherContainer = ({ student }) => {
    const date = new Date(student.date_of_solving)
    return (
        <div className='quiz_view_for_teacher_entry'>
            <span>{student.first_name} {student.last_name}</span>
            <span>{student.score}</span>
            <span>{date.toLocaleDateString()}</span>
        </div>)
}

export default QuizViewForTeacherContainer
