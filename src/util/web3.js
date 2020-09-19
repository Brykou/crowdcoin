const Web3 = require("web3");

const web3 =
  typeof window !== "undefined" && window.web3
    ? new Web3(window.web3.currentProvider)
    : new Web3(new Web3.providers.HttpProvider(process.env.ETH_NODE_URL));

// Request to connect metamask
if (typeof window !== "undefined" && window.ethereum) {
  window.ethereum.request({ method: "eth_requestAccounts" });
}

export default web3;
