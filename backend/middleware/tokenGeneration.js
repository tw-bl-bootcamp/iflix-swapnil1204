const jwt = require('jsonwebtoken');
class TokenGeneration {
    constructor(){};
    generateToken(payload) {
        const secretTokenKey = process.env.secretTokenKey;
        const token = jwt.sign({
            payload
        }, secretTokenKey, {
            expiresIn: '1d'
        })
        return token;
    }
}
module.exports = new TokenGeneration();