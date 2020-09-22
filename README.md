# Crowdcoin

:warning:
This project is not meant to be used in production. It's an educational exercise used in this [Udemy course about Ethereum](https://www.udemy.com/course/ethereum-and-solidity-the-complete-developers-guide/)
:warning:

## Stack

- [NextJS](https://nextjs.org/)
- [Semantic UI](https://react.semantic-ui.com/)
- [Web3](https://web3js.readthedocs.io/en/v1.3.0-rc.0/)
- [Solidity](https://solidity.readthedocs.io/en/v0.6.0/)

## Use

### Install dependencies

Run `yarn`.

### Config

Create a `.env` file at the root of the project with the following values:

- MNEMONIC : The passphrase of a wallet that will be used to deploy the contract
- ETH_NODE_URL : An ETH node address that will be used for server side rendering, and for deploying the contract. You can create an account on [Infura](https://infura.io/) and get an HTTPS address for a testnet like `Ropsten` ( :warning: DO NO USE A MAINET ADDRESS :warning: )
- CONTRACT_ADDRESS : The address where your contract is deployed (see below)

### Compile and deploy the smart contract

Be sure you have a `MNEMONIC` env var set in your .env file.

```
yarn compile
yarn deploy
```

Retrieve the output address and used it in your .env file as `CONTRACT_ADDRESS`.

### Run the app

`yarn dev` or `yarn build && yarn start` (See NextJS documentation for more details).
