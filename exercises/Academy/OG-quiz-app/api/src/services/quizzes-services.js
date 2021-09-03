import { quizzesErrors } from '../errors/errors.js';

const getAllQuizzes = (data) => async () => {
  return data.retrieveAllQuizzes();
};

const checkForCategories = (data) => async () => {
  return await data.retrieveAllCategories();
};

const getSpecificQuiz = (data) => async (quizId, userId, role) => {
  const quiz = await data.retrieveQuizById(quizId);
  if (quiz.length < 1) {
    return quiz;
  }

  if (role === 'student') {
    const [permit] = await data.quizPermitForUser(userId, quizId);
    if (permit) {
      return { msg: quizzesErrors.NO_PERMISSION };
    }
  }

  const questions = await data.retrieveAllQuiestionsByQuizId(quizId);
  quiz[0].questions = await Promise.all(
    questions.map(async (question) => ({
      ...question, answers: await data.retrieveAllAnswersByQuestionId(question.id),
    })),
  );

  return await quiz;
};

const getAllUsersSolvedSpecQuiz = (data) => async (id) => {
  return data.retrieveAllUsersSolvedSpecQuiz(id);
};

const postQuiz = (data) => async (name, timeLimit, categoriesId, userId) => {
  const existingQuiz = await data.retrieveQuizByName(name);
  if (existingQuiz.length > 0) {
    return [];
  }

  return await data.insertQuiz(name, +timeLimit, +categoriesId, +userId);
};

const postQuestion = (data, quizzesErrors) => async (questionObj, quizId) => {
  const { question, isMultiple, points, correctAnswers, answers } = questionObj;
  if (answers.length < 2) {
    throw new Error(quizzesErrors.ATLEAST_TWO_ANSWERS);
  }
  if (points < 1 || points > 6) {
    throw new Error(quizzesErrors.POINTS_RANGE);
  }
  if (isMultiple && correctAnswers === 1) {
    throw new Error(quizzesErrors.IS_MULTIPLE_NOT_CORECT_USED);
  }
  if (correctAnswers >= answers.length) {
    throw new Error(quizzesErrors.POSIBLE_ANSWERS_LESS_THEN_CORRECT);
  }
  const convertedAnswers = [];
  answers.forEach((el) => {
    const temp = [];
    temp.push('(');
    const res = Object.values(el);
    res[0] = `'${res[0]}'`;
    temp.push(res.join(','));
    convertedAnswers.push(temp.join(''));
  });
  const createdQuestion = await data.insertQuestionWithAnswers(
    question,
    isMultiple,
    points,
    quizId,
    correctAnswers,
    convertedAnswers,
  );
  createdQuestion[0].answers = JSON.parse(createdQuestion[0].answers);

  return createdQuestion;
};

const listQuizAndDeleteUnlistedWithSameName = (data, quizzesErrors) => async (
  id,
) => {
  const questions = await data.retrieveAllQuiestionsByQuizId(id);
  if (questions.length < 2) {
    throw new Error(quizzesErrors.QUIZ_MUST_HAVE_ATLEAST_TWO_QUESTIONS);
  }
  await data.listQuiz(id);
  const quiz = await getSpecificQuiz(data)(id);
  await data.deleteUnlistedByName(quiz[0].name);

  return quiz;
};

const getScore = (data) => async (quizId, answeredQuestions, userId, role) => {
  const [quiz] = await data.retrieveQuizById(quizId);
  if (!quiz) {
    return { msg: quizzesErrors.INVALID_QUIZ_ID };
  }

  if (role === 'student') {
    const [permit] = await data.quizPermitForUser(userId, quizId);
    if (permit) {
      return { msg: quizzesErrors.NO_PERMISSION };
    }
  }

  const questionsMap = answeredQuestions.reduce((acc, el) => {
    const answersSet = new Set(el.answers);
    acc.set(el.questionId, answersSet);
    return acc;
  }, new Map());
  const quizQuestions = await data.retrieveQuestionsWithCorrectAnswers(quizId);
  const score = quizQuestions.reduce((acc, question) => {
    if (
      questionsMap.has(question.id) &&
      questionsMap.get(question.id).size === question.correct_answers
    ) {
      const answersAreCorrect = JSON.parse(question.answers).reduce(
        (acc, el) => {
          if (questionsMap.get(question.id).has(el.answer_id)) {
            return acc;
          }
          return false;
        },
        true,
      );

      if (answersAreCorrect) {
        return acc + question.points;
      }
    }
    return acc;
  }, 0);
  if (role === 'student') {
    await data.solveQuiz(quizId, userId, score);
  }
  return { ...quiz, score: score };
};

export default {
  getAllQuizzes,
  getSpecificQuiz,
  getAllUsersSolvedSpecQuiz,
  postQuiz,
  postQuestion,
  listQuizAndDeleteUnlistedWithSameName,
  getScore,
  checkForCategories,
};
