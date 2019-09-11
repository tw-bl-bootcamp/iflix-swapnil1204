exports.login = (req, res) => {
    var response = {};
    response.message = "login successfull";
    res.status(200).send(response);
}