import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI, {
    //  useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Failed to connect to MongoDB', err);
  });

const app = express();
const port = 8000;
// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Schema

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Book = mongoose.model('Book', bookSchema);

app.get('/', (req, res) => {
  res.send('Welcome to the Bookstore API!');
});

// Books Routes

let books = [
  {
    id: 1,
    title: 'The Accursed God',
  },
  {
    id: 2,
    title: 'The Silent Patient',
  },
  {
    id: 3,
    title: 'Where the Crawdads Sing',
  },
  {
    id: 4,
    title: 'The Night Circus',
  },
  {
    id: 5,
    title: 'Educated',
  },
  {
    id: 6,
    title: 'Becoming',
  },
  {
    id: 7,
    title: 'The Great Alone',
  },
  {
    id: 8,
    title: 'Little Fires Everywhere',
  },
  {
    id: 9,
    title: 'The Goldfinch',
  },
  {
    id: 10,
    title: 'The Book Thief',
  },
];

// Get all books
app.get('/api/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).send;
  }
});

// Get a single book
app.get('/api/books/:id', async (req, res) => {
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
app.post('/api/book', async (req, res) => {
  if (!req.body.title || req.body.title.length < 3) {
    return res
      .status(400)
      .send('Title is required and should be a minimum of 3 characters');
  } else {
    const book = new Book({
      title: req.body.title,
    });

    await book.save();
    res.status(201).send(book);
  }
});

// Update a book
app.put('/api/books/:id', (req, res) => {
  let book = books.find((book) => book.id === parseInt(req.params.id));
  if (!book) {
    return res.status(404).send('The BooK with the given Id was not found');
  }

  book.title = req.body.title;
  res.status(200).send(book);
});

// Delete a book
app.delete('/api/books/:id', (req, res) => {
  let book = books.find((book) => book.id === parseInt(req.params.id));

  if (!book) {
    return res.status(404).send('The book with the given ID was not found');
  } else {
    books = books.filter((book) => book.id !== parseInt(req.params.id));
    res.status(200).send(books);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
