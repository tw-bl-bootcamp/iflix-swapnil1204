var jwt = require('jsonwebtoken');
class TokenVerification {
    constructor() {}
    checkToken(req, res, next) {
        try {
            var auth = req.headers['token'];
            if (auth) {
                jwt.verify(auth, process.env.secretTokenKey, (err, decoded) => {
                    if (err) {
                        return res.send({
                            success: false,
                            message: 'Invalid token'
                        });
                    } else {
                        req.decoded = decoded;
                        console.log("token validation successfull", );
                        next();
                    }
                });
            } else {
                return res.send({
                    success: false,
                    message: 'No token provided.'
                });
            }
        } catch (error) {
            res.status(403).send(error); //forbidden i.e not allowed
        }
    }
}
module.exports = new TokenVerification();