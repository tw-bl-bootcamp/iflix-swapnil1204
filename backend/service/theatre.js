const theatreModel = require('../model/theatre')
class TheatreService {
    constructor() {}
    available(credentials, callback) {
        try {
            theatreModel.available(credentials, (error, result) => {
                if (result) {
                    callback(null, result);
                }
            })
        } catch (error) {
            res.status(500).send("something went wrong");
        }
    }
}
module.exports = new TheatreService();