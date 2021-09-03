import express from 'express';
import reviewsService from '../services/reviews-service.js';
import libraryData from '../data/library-data.js';
import { createValidator,reviewSchema} from '../validations/index.js';
const reviewsController = express.Router();

reviewsController
  .get('/:id/reviews', async (req, res) => {
    const id = req.params.id;
    const reviews = await reviewsService.getReviewsByBookId(libraryData)(+id);

    if (!reviews) {
      return res.status(404).send({
        msg: 'Invalid book id!',
      });
    }

    res.status(200).send(reviews);
  })
  .post('/:id/reviews',createValidator(reviewSchema), async (req, res) => {
    const userId = req.user.id;
    const bookId = req.params.id;
    const { text } = req.body;
    const temp = await reviewsService.createBookReview(libraryData)(userId, bookId, text.trim());

    res.status(200).send({ message: temp });
  })
  .put('/:id/reviews',createValidator(reviewSchema), async (req, res) => {
    const userId = req.user.id;
    const bookId = req.params.id;
    const { text } = req.body;
    const temp = await reviewsService.updateBookReview(libraryData)(userId, bookId, text.trim());

    res.status(200).send({ msg: temp });
  })
  .delete('/:id/reviews', async (req, res) => {
    const userId = req.user.id;
    const bookId = req.params.id;
    const temp = await reviewsService.deleteBookReview(libraryData)(userId, bookId);

    res.status(200).send({ message: temp });
  });

export default reviewsController;
