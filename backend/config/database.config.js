const mongoose = require('mongoose')
const mongoUrl = "mongodb://localhost:27017/iFlix"

class DatabaseConfig {
    constructor() {}
    connection() {
        mongoose.connect(mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        mongoose.connection.on('connected', function () {
            console.log("Mongoose connection is open to ", mongoUrl);
        });

        mongoose.connection.on('error', function (err) {
            console.log("Mongoose default connection has occured " + err + " error");
        });

        mongoose.connection.on('disconnected', function () {
            console.log("Mongoose default connection is disconnected");
        });

        process.on('SIGINT', function () {
            mongoose.connection.close(function () {
                console.log("Mongoose default connection is disconnected due to application termination");
                process.exit(0)
            });
        });
    }
}

var db = new DatabaseConfig()
module.exports = db