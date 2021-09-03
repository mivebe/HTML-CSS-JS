import React from 'react'

const ExportQuiz = ({ toExport }) => {

    const quiz = {}
    quiz.name = toExport.name;
    quiz.timeLimit = toExport.time_limit / 60;
    quiz.category = toExport.category;

    quiz.questions = toExport.questions.map((question) => {

        const result = {};
        result.question = question.question;
        result.points = question.points;
        result.isMultiple = question.isMultiple;
        result.correctAnswers = question.correct_answers;
        result.answers = question.answers.map((answer) => {
            return {
                answer: answer.answer,
                isCorrect: answer.correct
            }
        })
        return result;
    })

    const fileData = JSON.stringify({ quiz });
    const blob = new Blob([fileData], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    return (
        <a href={url} download={`${toExport.name}_quiz.json`}>
            <button>Export Quiz</button>
        </a>
    )
}

export default ExportQuiz
