// Import built-in Node.js 'path' module for file path
const path = require('path');

const router = require('express').Router();

// Import built-in Node.js 'fs' module
const fs = require('fs');

// Import npm package to create a unique ids
let uniqid = require('uniqid');

// Routing function
// GET route to notes.json file
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../../db/db.json'));
});

// POST route to notes.json file
router.post('/notes', (req, res) => {
    let dbNotes = fs.readFileSync(path.join(__dirname, '../../db/db.json'));
    dbNotes = JSON.parse(dbNotes);

    let newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uniqid(),
    };

    dbNotes.push(newNote);
    fs.writeFile(path.join(__dirname, '../../db/db.json'), JSON.stringify(dbNotes), (err) => {
        if (err) {
            console.error(err);
            res.json(err);
        } else {
            res.json(dbNotes);
        }
    });
});

// DELETE route to notes.json file
router.delete('/notes/:id', (req, res) => {
    let dbNotes = JSON.parse(fs.readFileSync(path.join(__dirname, '../../db/db.json')));
    let deleteNotes = dbNotes.filter(note => note.id !== req.params.id);
    fs.writeFile(path.join(__dirname, '../../db/db.json'), JSON.stringify(deleteNotes), (err) => {
        if (err) {
            console.error(err);
            res.json(err);
        } else {
            res.json(deleteNotes);
        }
    });
});

module.exports = router;


