const theatreService = require('../service/theatre');
exports.theatre = (req, res) => {
    try {
        const credentials = req.body;
        theatreService.available(credentials, (err, result) => {
            if (result != null) {
                var response = {};
                response.success = true;
                response.message = "got list of movies";
                response.data = result;
                res.status(200).send(response);
            }
        })
    } catch (error) {
        res.status(500).send("something went wrong");
    }
}