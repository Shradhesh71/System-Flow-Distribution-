// test/distribution.test.mjs
import * as chai from 'chai';
import chaiHttp from "chai-http";
import mongoose from "mongoose";
import app from "../app.mjs" // Adjust the path if your app.mjs is located elsewhere
import Astrologer from "../models/astrologer.js";

chai.use(chaiHttp);
const should = chai.should();

describe("FlowDistribution", () => {
  before((done) => {
    mongoose
      .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => Astrologer.deleteMany({}))
      .then(() => done());
  });

  after((done) => {
    mongoose.connection.close();
    done();
  });

  it("should distribute users evenly", async (done) => {
    const astrologersData = [
      { name: "Astrologer 1" },
      { name: "Astrologer 2" },
    ];

    Astrologer.insertMany(astrologersData).then(() => {
      chai
        .request(server)
        .post("/user")
        .send({
          users: [
            { name: "User 1" },
            { name: "User 2" },
            { name: "User 3" },
            { name: "User 4" },
          ],
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body[0].connections.should.equal(2);
          res.body[1].connections.should.equal(2);
          done();
        });
    });
  }).timeout(5000);

  it("should adjust flow for top astrologers", async (done) => {
    const astrologersData = [
      { name: "Astrologer 1", isTopAstrologer: true },
      { name: "Astrologer 2" },
    ];

    Astrologer.insertMany(astrologersData).then(() => {
      chai
        .request(server)
        .post("/user")
        .send({
          users: [{ name: "User 1" }, { name: "User 2" }, { name: "User 3" }],
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body[0].connections.should.equal(2);
          res.body[1].connections.should.equal(1);
          done();
        });
    });
  });

  it("should toggle top astrologer status", async (done) => {
    const astrologer = new Astrologer({
      name: "Astrologer 1",
      isTopAstrologer: false,
    });
    astrologer.save().then((savedAstrologer) => {
      chai
        .request(server)
        .post("/toggleTopAstrologer")
        .send({ id: savedAstrologer._id, status: true })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.find((ast) => ast._id === String(savedAstrologer._id))
            .isTopAstrologer.should.be.true;
          done();
        });
    });
  });
});
