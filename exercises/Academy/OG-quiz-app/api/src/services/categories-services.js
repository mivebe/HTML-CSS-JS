const getAllCategories = (data) => async () => {
  return await data.retrieveAllCategories();
};

const getAllQuizzesByCategory = (data) => async (categoryId, userId, offset, limit) => {
  const quizzes = await data.retrieveQuizzesBySpecCategory(categoryId, userId, offset, limit);
  const [{ category } = {}] = await data.retrieveCategoryById(+categoryId);
  const [{ count } = { count: 0 }] = await data.retrieveQuizzesByCategoryCount(+categoryId);

  return { category, count, quizzes };
};

const getCategoryByName = (data) => async (categoryName) => {
  return await data.retrieveCategoryByName(categoryName);
};

const createCategory = (data) => async (categoryName) => {
  return await data.createCategory(categoryName);
};

export default {
  getAllCategories,
  getAllQuizzesByCategory,
  getCategoryByName,
  createCategory,
};
