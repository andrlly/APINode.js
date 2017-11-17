const app = require('../app');

const should = require('should');
const supertest = require('supertest');

describe('Calc', () => {

    it('should return valid calc data', done => {

        supertest(app)
        .get('/api/getAll')
        .set('Accept', 'application/json')
        .expect("Content-type",/json/)
        .expect(200)
        .end( (err, res) => {
            res.status.should.equal(200);
            res.error.should.equal(false);

            done();
        });
    });

    it('should return an error for an invalid calc', done => {

        supertest(app)
        .get('/allGet')
        .expect(404)
        .end( (err, res) => {
            if (err) throw err;
            res.status.should.equal(404);
            done();
        });

    });

    it("should add data to database", done => {

        supertest(app)
        .post('/api/calculate')
        .send({weight : 10, cotwo : 20})
        .expect("Content-type",/json/)
        .expect(200)
        .end( (err,res) => {
            res.status.should.equal(200);
            res.error.should.equal(false);
            done();
        });
    });

    it("should add wrong data to database", done => {

        supertest(app)
        .post('/api/calculate')
        .send({weight : 'string', cotwo : 20})
        .expect("Content-type",/json/)
        .expect(400)
        .end( (err,res) => {
            if (err) throw err;
            res.status.should.equal(400);
            done();
        });
    });

    it("should return 404", done => {
        supertest(app)
        .get("/random")
        .expect(404)
        .end( (err,res) => {
            if (err) throw err;
            res.status.should.equal(404);
            done();
        });
    })

});