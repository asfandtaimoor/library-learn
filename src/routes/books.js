import express from 'express';
import Book from '../models/books.js';

const router = express.Router();
// Books Routes

// // Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).send;
  }
});

// // Get a single book
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).send('The book with the given ID was not found');
    }

    res.status(200).send(book);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Post a book
router.post('/', async (req, res) => {
  if (!req.body.title || req.body.title.length < 3) {
    return res
      .status(400)
      .send('Title is required and should be a minimum of 3 characters');
  } else {
    const book = new Book({
      title: req.body.title,
    });

    await book.save();
    res.status(201).send(book); // Send the created book object
  }
});

// // Update a book
router.put('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).send('The book with the given ID was not found');
    }

    book.title = req.body.title;
    await book.save(); // Save the updated book to the database

    res.status(200).send(book);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// // Delete a book
router.delete('/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).send('The book with the given ID was not found');
    }

    res
      .status(200)
      .send(`Book with ID ${req.params.id} was deleted successfully`);
  } catch (error) {
    console.error(`Error deleting book with ID: ${req.params.id}`, error);
    res.status(500).send('Server error');
  }
});

export default router;
