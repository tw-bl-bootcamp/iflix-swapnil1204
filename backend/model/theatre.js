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