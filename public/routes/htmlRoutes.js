// Import built-in Node.js 'path' module for file path
const path = require('path');

const router = require('express').Router();

// GET route to notes.html file
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../notes.html'))
});

// GET should return the index.html file
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

module.exports = router;
