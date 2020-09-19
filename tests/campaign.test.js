const assert = require("assert");
const Web3 = require("web3");
const ganache = require("ganache-core");
const compiledFactory = require("../ethereum/build/CampaignFactory.json");
const compiledCampaign = require("../ethereum/build/Campaign.json");

const web3 = new Web3(ganache.provider());

let accounts = null;
let factory = null;
let campaign = null;

beforeEach(async () => {
  const _accounts = await web3.eth.getAccounts();
  accounts = {
    MANAGER: _accounts[0],
    CONTRIBUTOR1: _accounts[1],
    CONTRIBUTOR2: _accounts[2],
    RECIPIENT: _accounts[3],
  };

  factory = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({ data: compiledFactory.evm.bytecode.object })
    .send({ from: accounts.MANAGER, gas: 1000000 });

  await factory.methods.createCampaign("100").send({ from: accounts.MANAGER, gas: 1000000 });
  const [campaignAddress] = await factory.methods.getCampaigns().call();

  campaign = await new web3.eth.Contract(compiledCampaign.abi, campaignAddress);
});

describe("Campaign", () => {
  it("deploys a factory and a campaign", () => {
    assert(factory.options.address);
    assert(campaign.options.address);
  });

  it("set callers as the manager", async () => {
    const manager = await campaign.methods.manager().call();
    assert.strictEqual(manager, accounts.MANAGER);
  });

  it("allows users to contribute and become an approver", async () => {
    await campaign.methods.contribute().send({ from: accounts.MANAGER, value: "200" });
    // A hashmap getter doesn't return the entire hashmap. It only allows for a direct lookup.
    // approvers is the hashmap getter, and we do a direct lookup for accounts[1]
    const isContributor = campaign.methods.approvers(accounts.MANAGER).call();
    assert(isContributor);
  });

  it("requires a minimum amount to contribute", async () => {
    try {
      await campaign.methods.contribute.send({ from: accounts.CONTRIBUTOR1, value: "1" }); // minimum is 100
      assert(false);
    } catch (error) {
      assert(error);
    }
  });

  it("allows a manager to make a request", async () => {
    const description = "Request description";
    const value = "100";
    await campaign.methods
      .createRequest(description, value, accounts.RECIPIENT)
      .send({ from: accounts.MANAGER, gas: 1000000 });

    const request = await campaign.methods.requests(0).call();
    assert.strictEqual(request.description, description);
    assert.strictEqual(request.value, value);
    assert.strictEqual(request.recipient, accounts.RECIPIENT);
  });

  it("processes request", async () => {
    await campaign.methods.contribute().send({ from: accounts.CONTRIBUTOR1, value: web3.utils.toWei("10", "ether") });
    await campaign.methods
      .createRequest("description", web3.utils.toWei("5", "ether"), accounts.RECIPIENT)
      .send({ from: accounts.MANAGER, gas: 1000000 });
    await campaign.methods.approveRequest(0).send({ from: accounts.CONTRIBUTOR1, gas: 1000000 });
    await campaign.methods.finalizeRequest(0).send({ from: accounts.MANAGER, gas: 1000000 });

    const balance = web3.utils.fromWei(await web3.eth.getBalance(accounts.RECIPIENT), "ether");
    assert.strictEqual(parseFloat(balance), 105);
  });
});
