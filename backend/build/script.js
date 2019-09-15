const movieService = require('../service/movie');
exports.movieList = (req, res) => {
    try {
        const credentials = req.body;
        movieService.movieList(credentials, (err, result) => {
            if (result!=null) {
                var response = {};
                response.success = true;
                response.message = "got list of movies";
                response.data = result;
                res.status(200).send(response);
            }
        })
    } catch (error) {
        res.status(500).send("something went wrong");
    }
}
const theatreService = require('../service/theatre');
exports.theatre = (req, res) => {
    try {
        const credentials = req.body;
        theatreService.available(credentials, (err, result) => {
            if (result != null) {
                var response = {};
                response.success = true;
                response.message = "got list of movies";
                response.data = result;
                res.status(200).send(response);
            }
        })
    } catch (error) {
        res.status(500).send("something went wrong");
    }
}
const ticketService = require('../service/ticket');
const send = require('../middleware/sendMail');
exports.ticket = (req, res) => {
    try {
        const credentials = req.body;
        ticketService.ticket(credentials, (err, result) => {
            if (result!=null) {
                send.mail(credentials);
                var response = {};
                response.success = true;
                response.message = "login successful";
                response.data = result;
                res.status(200).send(response);
            }
        })
    } catch (error) {
        res.status(500).send("something went wrong");
    }
}
const userService = require('../service/user');
const tokenGeneration = require('../middleware/tokenGeneration');
exports.login = (req, res) => {
    try {
        const credentials = req.body;
        userService.login(credentials, (err, result) => {
            if (result!=null) {
                var response = {};
                response.success = true;
                response.message = "login successfull";
                response.data = result;
                const payload = {
                    user_id: result._id
                }
                const token = tokenGeneration.generateToken(payload);
                response.token = token;
                res.status(200).send(response);
            }
        })
    } catch (error) {
        res.status(500).send("something went wrong");
    }
}
/** imported mongoose */
const mongoose = require('mongoose');

const validate = require('mongoose-validator');

/**setting to useCreateIndex true */
mongoose.set('useCreateIndex', true);

/**setting to useFindAndModify false*/
mongoose.set('useFindAndModify', false);

var MovieName = [
    validate({
        validator: 'isLength',
        arguments: [3, 150],
        message: 'movieName should be between {ARGS[0]} and {ARGS[1]} characters',
    })
]
var reviews = [
    validate({
        validator: 'isLength',
        arguments: [0, 200],
        message: 'reviews should be between {ARGS[0]} and {ARGS[1]} characters',
    })
]
var ratings = [
    validate({
        validator: 'isLength',
        arguments: [0, 200],
        message: 'reviews should be between {ARGS[0]} and {ARGS[1]} characters',
    })
]
const movieSchema = mongoose.Schema({
    movieName: {
        type: String,
        validator: MovieName,
        require: [true, "movieName is require to book tickets"],
        trim: true
    },
    reviews: {
        type: String,
        validator: reviews,
        trim: true
    }
}, {
    timestamps: true
});

var movies = mongoose.model('movies', movieSchema);

class Movies {
    movieList(param, callback) {
        try {
            movies.find((error, data) => {
                if (data != null) {
                    callback(null, data);
                }
            })
        } catch (error) {
            res.status(500).send("something went wrong");
        }
    }
}
module.exports = new Movies();
/** imported mongoose */
const mongoose = require('mongoose');

const validate = require('mongoose-validator');

/**setting to useCreateIndex true */
mongoose.set('useCreateIndex', true);

/**setting to useFindAndModify false*/
mongoose.set('useFindAndModify', false);

var venue = [
    validate({
        validator: 'isLength',
        message: 'venue required',
    })
]
const theatreSchema = mongoose.Schema({
    movieName: {
        type: String,
        require: [true, "movie name is require to find in theatre"],
        trim: true,
    },
    venue: {
        type: String,
        validator: venue,
        trim: true
    },
    showTime: {
        type: Date,
        trim: true
    }
}, {
    timestamps: true
});

var theatre = mongoose.model('theatres', theatreSchema);

class Theatre {
    available(param, callback) {
        try {
            console.log(param.movieName);
            theatre.find({
                "movieName": param.movieName
            }, (error, data) => {
                console.log(data);
                if (data != null) {
                    callback(null, data);
                }
            })
        } catch (error) {
            res.status(500).send("something went wrong");
        }
    }
}
module.exports = new Theatre();
/** imported mongoose */
const mongoose = require('mongoose');
/**setting to useCreateIndex true */
mongoose.set('useCreateIndex', true);

/**setting to useFindAndModify false*/
mongoose.set('useFindAndModify', false);

const ticketSchema = mongoose.Schema({
    email:{
        type: String,
        trim: true
    },
    movieName: {
        type: String,
        trim: true
    },
    showTime: {
        type: String,
        trim: true
    },
    venue: {
        type: String,
        trim: true
    },
    seat: {
        type: Number,
        unique:true,
        trim: true
    }
}, {
    timestamps: true
});

var ticket = mongoose.model('ticket', ticketSchema);

class Movies {
    ticket(param, callback) {
        const newTicket = new ticket({
            "email":param.email,
            "movieName": param.firstName,
            "showTime": param.showTime,
            "venue": param.venue,
            "seat": param.seat,
        });
        try {
            newTicket.save({
            }, (error, data) => {
                console.log('in model',data);
                if (data != null) {
                    callback(null, data);
                }
            })
        } catch (error) {
            res.status(500).send("something went wrong");
        }
    }
}
module.exports = new Movies();
/** imported mongoose */
const mongoose = require('mongoose');

const validate = require('mongoose-validator');

let saltRounds = 10;

/**setting to useCreateIndex true */
mongoose.set('useCreateIndex', true);

/**setting to useFindAndModify false*/
mongoose.set('useFindAndModify', false);

var firstNameValidator = [
    validate({
        validator: 'isLength',
        arguments: [3, 50],
        message: 'firstName should be between {ARGS[0]} and {ARGS[1]} characters',
    })
]
var lastNameValidator = [
    validate({
        validator: 'isLength',
        arguments: [3, 50],
        message: 'lastName should be between {ARGS[0]} and {ARGS[1]} characters',
    })
]
var emailValidator = [
    validate({
        validator: 'isLength',
        arguments: [3, 100],
        message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters',
    }),
    validate({
        validator: 'isAlphanumeric',
        passIfEmpty: true,
        message: 'email should contain alpha-numeric characters only',
    }),
]
var passwordValidator = [
    validate({
        validator: 'isLength',
        arguments: [5, 50],
        message: 'lastName should be between {ARGS[0]} and {ARGS[1]} characters',
    })
]

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        validator: firstNameValidator,
        require: [true, "firstname is require to register"],
        trim: true
    },
    lastName: {
        type: String,
        validator: lastNameValidator,
        require: [true, "lastname is require to register"],
        trim: true
    },
    email: {
        type: String,
        unique: true,
        validator: emailValidator,
        lowercase: true,
        require: [true, "email is require to register"],
        trim: true
    },
    password: {
        type: String,
        validator: passwordValidator,
        require: [true, "password is require to register"],
        trim: true
    },
    mobileNumber: {
        type: String,
        minimum: 10,
        maximum: 10,
        require: [true, "password is require to register"],
        trim: true
    }
}, {
    timestamps: true
});

var userDatas = mongoose.model('userdatas', userSchema);
class UserModel {
    login(loginParam, callback) {
        try {
            userDatas.findOne({
                $and: [{
                    "email": loginParam.email
                }, {
                    "password": loginParam.password
                }]
            }, (error, data) => {
                if (data != null) {
                    callback(null, data);
                }
            })
        } catch (error) {
            res.status(500).send("something went wrong");
        }
    }
}
module.exports = new UserModel();
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