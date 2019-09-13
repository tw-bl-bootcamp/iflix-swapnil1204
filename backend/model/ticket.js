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