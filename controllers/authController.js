// --- controllers/authController.js ---
const db = require('../models/db');

const register = (req, res) => {
  const { username, password } = req.body;
  db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(201).json({ id: result.insertId, username });
  });
};

const login = (req, res) => {
  const { username, password } = req.body;
  db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length === 0) return res.status(401).json({ message: 'Invalid credentials' });
    res.status(200).json(results[0]);
  });
};

module.exports = { register, login };