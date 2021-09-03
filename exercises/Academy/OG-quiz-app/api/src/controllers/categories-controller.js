import express from 'express';
import categoriesService from '../services/categories-services.js';
import quizData from '../data/quiz-data.js';
import { categoriesErrors } from '../errors/errors.js';
import { checkId, createValidator, queryValidator } from '../validations/validator-middleware.js';
import { limitOffsetSchema, createCategorySchema } from '../validations/index.js';
import { roleMiddleware } from '../auth/auth-middleware.js';

const categoriesController = express.Router();

categoriesController
  .get('/', async (req, res) => {
    const categories = await categoriesService.getAllCategories(quizData)();

    res.status(200).send(categories);
  })
  .get('/:id/quizzes', queryValidator(limitOffsetSchema), async (req, res) => {
    const categoryId = req.params.id;
    const userId = req.user.id;
    const { limit, offset } = req.query;
    
    if (checkId(res, categoryId)) return;

    const categoryQuizzes = await categoriesService.getAllQuizzesByCategory(quizData)(+categoryId, userId, offset, limit);

    res.status(200).send(categoryQuizzes);
  })
  .post('/', roleMiddleware('teacher'), createValidator(createCategorySchema), async (req, res) => {
    const { categoryName } = req.body;

    const category = await categoriesService.getCategoryByName(quizData)(
      categoryName,
    );

    if (category.length > 0) {
      return res.status(400).send({
        msg: categoriesErrors.CATEGORY_EXIST,
      });
    }

    const createdCategory = await categoriesService.createCategory(quizData)(
      categoryName,
    );

    res.status(200).send(createdCategory);
  });
export default categoriesController;
