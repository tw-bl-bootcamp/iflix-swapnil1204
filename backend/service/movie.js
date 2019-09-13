const movieModel = require('../model/movie')
class MovieService {
    constructor() {}
    movieList(credentials, callback) {
        try {
            movieModel.movieList(credentials, (error, result) => {
                if (result) {
                    callback(null, result);
                }
            })
        } catch (error) {
            res.status(500).send("something went wrong");
        }
    }
}
module.exports = new MovieService();