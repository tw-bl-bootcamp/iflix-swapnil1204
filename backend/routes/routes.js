const express = require('express');
const router = express.Router();
const user = require('../controller/user');
const movie = require('../controller/movie');
const token = require('../middleware/tokenVerification');
router.post('/login', user.login);
router.get('/movie',token.verifyToken,movie.movieList);
module.exports = router;