const ticketService = require('../service/ticket');
const send = require('../middleware/sendMail');
exports.ticket = (req, res) => {
    try {
        const credentials = req.body;
        ticketService.ticket(credentials, (err, result) => {
            if (result!=null) {
                send.mail(credentials);
                var response = {};
                response.success = true;
                response.message = "login successful";
                response.data = result;
                res.status(200).send(response);
            }
        })
    } catch (error) {
        res.status(500).send("something went wrong");
    }
}