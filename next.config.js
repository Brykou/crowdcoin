const options = {
  poweredByHeader: false,
  env: {
    CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS,
    ETH_NODE_URL: process.env.ETH_NODE_URL,
  },
};

module.exports = options;
