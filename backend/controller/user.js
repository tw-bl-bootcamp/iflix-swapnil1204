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