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