import express from 'express';
import bodyParser from 'body-parser';
import connectDB from './config/db.js';
import bookRoutes from './routes/books.js';

const app = express();
const port = 8000;

// Connect to MongoDB
connectDB();
// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Routes
app.use('/api/books', bookRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Bookstore API!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
