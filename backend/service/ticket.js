const ticketModel = require('../model/ticket')
class UserService {
    constructor() {}
    ticket(credentials, callback) {
        try {
            ticketModel.ticket(credentials, (error, result) => {
                if (error) {
                    callback(error)
                } else {
                    callback(null, result);
                }
            })
        } catch (error) {
            res.status(500).send("something went wrong");
        }
    }
}
module.exports = new UserService();