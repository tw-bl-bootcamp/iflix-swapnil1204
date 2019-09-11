const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
require('dotenv').config();
var http = require('http').Server(app);
var server = http.listen(process.env.port, function () {
    console.log(`listening on localhost:${process.env.port}`);
});
/** Configuring the database. */
const dbConfig = require('../backend/configs/Database.config.js');
dbConfig.connection();
