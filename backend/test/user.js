require('dotenv').config;
var chai = require('chai');
var assert = chai.assert;
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
const server = require('../server');
describe('/post login ', () => {
    it(" Login function send expected result", (done) => {
        let data = {username: "swapnil.bamb@Thoughtworks.com", password: "swapnil@1111S"}
        chai.request(server)
            .post('/login')
            .send(data)
            .end((err, res) => {
                assert.equal(200,res.status);
            })
        done();
    })
});
