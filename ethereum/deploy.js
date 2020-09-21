/* eslint-disable no-console */
const Web3 = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const compiledFactory = require("./build/CampaignFactory.json");
require("dotenv").config();

const provider = new HDWalletProvider(process.env.MNEMONIC, process.env.ETH_NODE_URL);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.info(`Deployment from account ${accounts[0]}`);
  const result = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({ data: compiledFactory.evm.bytecode.object })
    .send({ from: accounts[0], gas: 1000000 });

  console.info(`Deployed to ${result.options.address}`);
  process.exit(0);
};

deploy();
