// --- controllers/bookController.js ---
const db = require('../models/db');

const getBooks = (req, res) => {
  db.query('SELECT * FROM books', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

const addBook = (req, res) => {
  const { title, author, status, rating } = req.body;
  db.query('INSERT INTO books (title, author, status, rating) VALUES (?, ?, ?, ?)', [title, author, status, rating], (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(201).json({ id: result.insertId, title, author, status, rating });
  });
};

const updateBook = (req, res) => {
  const { id } = req.params;
  const { title, author, status, rating } = req.body;
  db.query('UPDATE books SET title = ?, author = ?, status = ?, rating = ? WHERE id = ?', [title, author, status, rating, id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Book updated' });
  });
};

const deleteBook = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM books WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Book deleted' });
  });
};

module.exports = { getBooks, addBook, updateBook, deleteBook };
