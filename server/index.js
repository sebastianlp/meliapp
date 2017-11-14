const express = require('express');
const routes = require('./routes'); 
const path = require('path');

const app = express();

// Register the routes
app.use('/api', routes);

app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

app.listen(3001);