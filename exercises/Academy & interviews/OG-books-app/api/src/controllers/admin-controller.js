/* eslint-disable no-unused-vars */
import express from 'express';
import libraryData from '../data/library-data.js';
import adminServices from '../services/admin-service.js';
import { createValidator, bookNameSchema ,reviewSchema,banReasonSchema, createBookSchema} from '../validations/index.js';
const adminController = express.Router();
adminController
    .post('/books',createValidator(createBookSchema), async (req, res) => {
        
        const { name,description,imageURL,author,genre} = req.body;
        const newBook = await adminServices.createBook(libraryData)( name,description,imageURL,author,genre);
        

        res.status(201).send(newBook);
    })
    .delete('/books/:id', async (req, res) => {
        
        const id = req.params.id;
        const unlistedBook = await adminServices.unlistBook(libraryData)(id);
        
        res.status(200).send(unlistedBook);
    })
    .put('/books/:id',createValidator(bookNameSchema), async (req, res) => {
        
        const id = req.params.id;
        const { name } = req.body;
        
        if (name) {
            const unlistedBook = await adminServices.changeBookName(libraryData)(id, name);
        
            res.status(200).send(unlistedBook);
        }
    })
    .put('/books/:id/list', async (req, res) => {
        
        const id = req.params.id;
        
        
        const listedBook = await adminServices.listBook(libraryData)(id);
        
        res.status(200).send(listedBook);
        
    })
    .get('/books', async (req, res) => {
        const { search } = req.query;
        
        const books = await adminServices.getAllBooks(libraryData)(search);
        
        res.status(200).send(books);
        
    })
    .get('/books/:id', async (req, res) => {
        
        const id = req.params.id;
        
        const book = await adminServices.getBookById(libraryData)(+id);
        
        if (!book[0]) {
            
            return res.status(404).send({
                msg: 'The book is not found!',
            });
        }

        res.status(200).send(book);
    })
    .get('/books/:id/reviews', async (req, res) => {
        
        const id = req.params.id;
        if (isNaN(id)) {
        
            return;
        }
        const allReviews = await adminServices.getReviewsByBookId(libraryData)(+id);
        if (!allReviews) {
            res.status(400).send({ message: 'Invalid book id' });
        }
        res.status(200).send(allReviews);
    })
    .put('/reviews/:id',createValidator(reviewSchema), async (req, res) => {
        
        const id = req.params.id;
        const { text } = req.body;
        
        const updatedReview = await adminServices.updateReview(libraryData)(id, text.trim());
        
        res.status(200).send(updatedReview);
    })
     .delete('/reviews/:id', async (req, res) => {
        
        const id = req.params.id;
        
        const deletedReview = await adminServices.deleteReview(libraryData)(id);
        
        res.status(200).send(deletedReview);
    })
    .post('/users/:id/banstatus',createValidator(banReasonSchema),async (req, res) => {
        const userId = req.params.id;
        const { reason } = req.body;
    
        const bannedUser = await adminServices.banUser(libraryData)(userId, reason);
        
        if (!bannedUser) {
            res.status(400).send({ message: 'Invalid ban reason!' });
        }
        else if (!bannedUser[0]) { 
            res.status(400).send({ message: 'Invalid user id' });
        }
        const { password, ...userData } = bannedUser[0];
        res.status(201).send(userData);
    })
    .delete('/users/:id/banstatus', async (req, res) => {
        const userId = req.params.id;
    
        const unbannedUser = await adminServices.unbanUser(libraryData)(userId);
        
        if (!unbannedUser[0]) { 
            res.status(400).send({ message: 'Invalid user id' });
        }
        const { password, ...userData } = unbannedUser[0];
        res.status(201).send(userData);
    })
    .get('/users', async (req, res) => {
        
        const users = await adminServices.getAllUsers(libraryData)();
        
        res.status(200).send(users);
        
    });

export default adminController;