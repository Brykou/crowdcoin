const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

const FOLDER = "contracts";
const FILE = "Campaign.sol";
const BUILD_FOLDER = "build";

// Reset the directory
const buildPath = path.resolve(__dirname, BUILD_FOLDER);
fs.removeSync(buildPath);
fs.ensureDirSync(buildPath);

// Read the contract
const contractSource = fs.readFileSync(path.resolve(__dirname, FOLDER, FILE), "utf8");
const input = {
  language: "Solidity",
  sources: {
    [FILE]: {
      content: contractSource,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

// Compile and write
const contracts = JSON.parse(solc.compile(JSON.stringify(input))).contracts[FILE];
Object.keys(contracts).forEach((contract) => {
  fs.outputJsonSync(path.resolve(buildPath, `${contract}.json`), contracts[contract]);
});
