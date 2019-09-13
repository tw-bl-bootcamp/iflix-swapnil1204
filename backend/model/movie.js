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