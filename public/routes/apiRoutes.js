// Import built-in Node.js 'path' module for file path
const path = require('path');

// Import built-in Node.js 'fs' module
const fs = require('fs');

// Import npm package to create a unique ids
let uniqid = require('uniqid');

// Routing function
module.exports = (app) => {
    // GET route to notes.json file
    app.get('/api/notes', (req, res) => {
        res.sendFile(path.join(__dirname, '../db/db.json'))
    });

    // POST route to notes.json file
    app.post('/api/notes', (req, res) => {
        let dbNotes = fs.readFileSync('./db/db.json');
        dbNotes = JSON.parse(dbNotes);
        res.json(dbNotes);

        let newNote = {
            title: req.body.title,
            text: req.body.text,
            id: uniqid(),
        };

        dbNotes.push(newNote);
        fs.writeFileSync('./db/db.json', JSON.stringify(dbNotes), (err) => {
            if (err) {
                console.error(err);
            } else {
                res.json(dbNotes);
            }
        });

        // DELETE route to notes.json file
        app.delete('/api/notes/:id', (req, res) => {
            let dbNotes = JSON.parse(fs.readFileSync('./db/db.json'));
            let deleteNotes = dbNotes.filter(note => note.id !== req.params.id);
            fs.writeFileSync('./db/db.json', JSON.stringify(deleteNotes), (err) => {
                if (err) {
                    console.error(err);
                } else {
                    res.json(deleteNotes);
                }
            });
        })
    });
};


