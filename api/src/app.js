const express = require('express');
const cors = require('cors');
const repos = require('./routes/repos');
var tools = require('./tools');

// CORS header configuration
const corsOptions = {
  methods: 'GET',
  allowedHeaders: 'Content-Type,Authorization',
};

const app = express();

// Routes
app.use('/repos', cors(corsOptions), repos => {
  var data = '';
  var urls = [
    '../data/repos.json',
    'https://api.github.com/users/silverorange/repos'
  ];

  console.log('ready for /repos');
});

// error handling middleware should be loaded after the loading the routes
app.use('/', (err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;

  const formattedError = {};
  formattedError.status = err.status;
  formattedError.message = err.message;

  res.status(status);
  res.send(JSON.stringify(formattedError));
});

module.exports = app;
