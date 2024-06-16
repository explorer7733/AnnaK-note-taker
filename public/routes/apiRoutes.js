// Import built-in Node.js 'path' module for file path
const path = require('path');

const {readFile} = require('node:fs/promises');

const router = require('express').Router();

// Import built-in Node.js 'fs' module
const fs = require('fs');

// Import npm package to create a unique ids
let uniqid = require('uniqid');
let data = [];

// Routing function
// GET route to notes.json file
router.get('/', async (req, res) => {
    data = await getData();
    console.log(data);
    res.json(data);
   
});

// POST route to notes.json file
router.post('/', (req, res) => {
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
router.delete('/:id', (req, res) => {
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
const getData = async () => {
    const data = await readFile(path.join(__dirname, '../../db/db.json'), {encoding: 'utf8'});
    return JSON.parse(data);
}
module.exports = router;


