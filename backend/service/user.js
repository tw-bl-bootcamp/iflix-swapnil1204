const userModel = require('../model/user')
class UserService {
    constructor() {}
    login(credentials, callback) {
        try {
            userModel.login(credentials, (error, result) => {
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