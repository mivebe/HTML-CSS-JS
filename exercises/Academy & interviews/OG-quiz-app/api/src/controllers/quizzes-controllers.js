import express from 'express';
import quizzesService from '../services/quizzes-services.js';
import quizData from '../data/quiz-data.js';
import { checkId } from '../validations/validator-middleware.js';
import { quizzesErrors } from '../errors/errors.js';
import { roleMiddleware } from '../auth/auth-middleware.js';

const quizzesController = express.Router();

quizzesController
  .get('/', async (req, res) => {
    const quizzes = await quizzesService.getAllQuizzes(quizData)();

    res.status(200).send(quizzes);
  })
  .get('/:id', async (req, res) => {
    const quizId = req.params.id;
    const userId = req.user.id;
    const { role } = req.user;
    if (checkId(res, quizId)) return;
    const quiz = await quizzesService.getSpecificQuiz(quizData)(
      quizId,
      userId,
      role
    );

    res.status(200).send(quiz);
  })
  .get('/:id/users', roleMiddleware('teacher'), async (req, res) => {
    const id = req.params.id;
    if (checkId(res, id)) return;
    const stundetsSolvedQuiz = await quizzesService.getAllUsersSolvedSpecQuiz(
      quizData
    )(id);

    res.status(200).send(stundetsSolvedQuiz);
  })
  .post('/', roleMiddleware('teacher'), async (req, res) => {
    const userId = req.user.id;
    const { name, timeLimit, categoryId } = req.body;
    const categoryCheck = await quizzesService.checkForCategories(quizData)();
    if (categoryCheck.length < 1) {
      return res
        .status(400)
        .send({ msg: quizzesErrors.THERE_IS_NO_CATEGORIES });
    }
    const createdQuiz = await quizzesService.postQuiz(quizData)(
      name,
      timeLimit,
      categoryId,
      userId
    );
    if (createdQuiz.length === 0) {
      return res.status(400).send({ msg: quizzesErrors.QUIZ_NAME_EXIST });
    }

    res.status(200).send(createdQuiz);
  })
  .post('/:id/answers', async (req, res) => {
    const quizId = req.params.id;
    const userId = req.user.id;
    const role = req.user.role;
    const answeredQuestions = req.body.questions;
    if (checkId(res, quizId)) return;
    const solvedQuiz = await quizzesService.getScore(quizData)(
      +quizId,
      answeredQuestions,
      +userId,
      role
    );

    res.status(200).send(solvedQuiz);
  })
  .post('/:id/questions', roleMiddleware('teacher'), async (req, res) => {
    const question = req.body.question;
    const quizId = req.params.id;

    const run = async () => {
      try {
        const postedQuestion = await quizzesService.postQuestion(
          quizData,
          quizzesErrors
        )(question, quizId);

        res.status(200).send(postedQuestion);
      } catch (error) {
        res.status(400).send({ msg: error.message });
      }
    };
    run();
  })
  .post('/:id', roleMiddleware('teacher'), async (req, res) => {
    const quizId = req.params.id;
    const run = async () => {
      try {
        const listedQuiz = await quizzesService.listQuizAndDeleteUnlistedWithSameName(
          quizData,
          quizzesErrors
        )(quizId);

        res.status(200).send(listedQuiz);
      } catch (error) {
        res.status(400).send({ msg: error.message });
      }
    };
    run();
  });

export default quizzesController;
