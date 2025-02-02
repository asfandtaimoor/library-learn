// import express from 'express';
// // import { getBooks } from '../controllers/bookController';

// const router = express.Router();

// router.get('/', (req, res) => {
//   res.send('Welcome to the Bookstore API!');
// });

// export default router;
const express = require('express');
const { getBooks } = require('../controllers/bookController');

const router = express.Router();

router.get('/', getBooks);

module.exports = router;
