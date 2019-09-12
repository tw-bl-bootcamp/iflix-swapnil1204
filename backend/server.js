const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
require('dotenv').config();
//var http = require('http').Server(app);
var server = app.listen(process.env.port, function () {
    console.log(`listening on localhost:${process.env.port}`);
});

const cors =require('cors');

/** Configuring the database. */
const dbConfig = require('../backend/config/database.config');
dbConfig.connection();

/**configure routes to serve request & apply routes to our application  */
const routes = require('./routes/routes');
app.use('/', routes);

/** for testing purpose needed to export instance of this application */
module.exports = app;