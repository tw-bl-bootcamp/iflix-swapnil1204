exports.login = (req, res) => {
    var response = {};
    response.success = true;
    response.message = "login successfull";
    var result = {
        username:"swapnil.bamb@Thoughtworks.com",
        password:"bamb"
    }
    response.data = result;
    res.status(200).send(response);
}