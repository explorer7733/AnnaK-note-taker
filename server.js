// Import Express.js
const express = require('express');
// Import built-in Node.js 'path' module for file path
const path = require('path');
// Import built-in Node.js 'fs' module
const fs = require('fs');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

const allNotes = require('./db/db.json');

// Set up Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static middleware pointing to the public folder
app.use(express.static('public'));





// Create listen() function, which is responsible for listening for incoming connections on the specified port
app.listen(PORT, () =>
    console.log(`API server now on port ${PORT}`)
);