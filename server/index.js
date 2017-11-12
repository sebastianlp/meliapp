const express = require('express');
const routes = require('./routes'); 

const app = express();

// Register the routes
app.use('/api', routes);

app.listen(3001);