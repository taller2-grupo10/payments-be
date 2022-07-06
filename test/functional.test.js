var chai = require("chai");
var console = require("console");
var expect = chai.expect;
var assert = chai.assert;
var should = chai.should();
var describe = require("mocha").describe;
var it = require("mocha").it;
var before = require("mocha").before;

chai.use(require("chai-http"));
const testUrl = "http://0.0.0.0:7000";

describe("Wallet tests", () => {
  it("Create wallet", async () => {
    let response = await chai.request(testUrl).post("/wallet");
    expect(response).to.have.status(201);
    expect(response.body).to.be.a("object");
    expect(response.body.address).to.be.a("string");
  });

  it("Get wallet", async () => {
    let response = await chai.request(testUrl).get("/wallet");
    expect(response).to.have.status(200);
    expect(response.body).to.be.a("array");
    expect(response.body).to.have.lengthOf(1);
  });

  it("Get wallet by id", async () => {
    let response = await chai.request(testUrl).get("/wallet/1");
    expect(response).to.have.status(200);
    expect(response.body).to.be.a("object");
    expect(response.body.address).to.be.a("string");
  });

  it("Get wallet balance", async () => {
    let response = await chai.request(testUrl).get("/balance/1");
    expect(response).to.have.status(200);
    expect(response.body).to.be.a("object");
    expect(response.body.balance).to.be.a("string");
    expect(response.body.address).to.be.a("string");
  });
});

describe("Transaction tests", () => {
  it("Create transaction no funds", async () => {
    let response = await chai.request(testUrl).post("/deposit").send({
      senderId: 1,
      amountInEthers: "0.00001",
    });
    expect(response).to.have.status(402);
    expect(response.body).to.be.a("object");
    expect(response.body.error).to.be.a("string");
    expect(response.body.code).to.equal("INSUFFICIENT_FUNDS");
  });

  it("Get transaction", async () => {
    let response = await chai
      .request(testUrl)
      .get("/deposit/0x29849ac9f78f3189f3016d873b1bae60010ad310e0fbbb637147b8c324740fe2");
    expect(response).to.have.status(200);
    expect(response.body).to.be.a("object");
    expect(response.body.transactionHash).to.be.a("string");
  });
});
