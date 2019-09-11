require('dotenv').config;
var chai = require('chai');
var assert = chai.assert;
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
const server = require('../server');
describe('/post login ', () => {
    it(" Login function send expected result", (done) => {
        let data = {
            email: "swapnil.bamb@Thoughtworks.com",
            password: "swapnil@1111S"
        }
        chai.request(server)
            .post('/login')
            .send(data)
            .end((err, res) => {
                assert.equal(200, res.status);
            })
        done();
    })
    it(" Login function send expected message", (done) => {
        let data = {
            email: "swapnil.bamb@Thoughtworks.com",
            password: "swapnil@1111S"
        }
        chai.request(server)
            .post('/login')
            .send(data)
            .end((err, res) => {
                assert.equal(res.body.message, "login successfull");
            })
        done();
    })
    it(" Login function return true", (done) => {
        let data = {
            email: "swapnil.bamb@Thoughtworks.com",
            password: "swapnil@1111S"
        }
        chai.request(server)
            .post('/login')
            .send(data)
            .end((err, res) => {
                assert.isTrue(res.body.success);
            })
        done();
    })
    it("res object has property of username", (done) => {
        var data = {
            "email":"swapnil.bamb@thoughtworks.com",
            "password":"swapnil@123S"
        }
        chai.request(server)
            .post('/login')
            .send(data)
            .end((err, res) => { assert.property({ data: {password: 'swapnil123@@S'}}, 'data');
                assert.property({ data: {email: 'swapnil.bamb@Thoughtworks.com'}}, 'data');
            })
        done();
    })
    it("res is a object", (done) => {
        var data = {
            "email":"swapnil.bamb@thoughtworks.com",
            "password":"swapnil@123S"
        }
        chai.request(server)
            .post('/login')
            .send(data)
            .end((err, res) => { 
                assert.isObject(res);
            })
        done();
    })
});