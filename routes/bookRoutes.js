const express = require('express');
const { getBooks, addBook, deleteBook } = require('../controllers/bookController');

const router = express.Router();

router.get('/', getBooks);
router.post('/', addBook);
router.delete('/:id', deleteBook);

module.exports = router;
