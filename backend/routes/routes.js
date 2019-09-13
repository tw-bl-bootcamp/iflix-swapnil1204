const express = require('express');
const router = express.Router();
const user = require('../controller/user');
const movie = require('../controller/movie');
const token = require('../middleware/tokenVerification');
const theatre = require('../controller/theatre');
const ticket = require('../controller/ticket')
router.post('/login', user.login);
router.get('/movie',token.verifyToken,movie.movieList);
router.get('/availability',token.verifyToken,theatre.theatre);
router.post('/ticket',token.verifyToken,ticket.ticket);
module.exports = router;