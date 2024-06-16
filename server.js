// Import Express.js
const express = require('express');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Set up Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static middleware pointing to the public folder
app.use(express.static('public'));

// Routes to the apiRoutes.js file and htmlRoutes.js file
const apiRoutes = require('./public/routes/apiRoutes');
const htmlRoutes = require('./public/routes/htmlRoutes');

app.use ('/api/notes', apiRoutes);
app.use ('/', htmlRoutes);

// Create listen() function, which is responsible for listening for incoming connections on the specified port
app.listen(PORT, () =>
    console.log(`API server now on port ${PORT}`)
);