require("@nomicfoundation/hardhat-toolbox");
//this will help you to verify your address on Etherscan
require("@nomiclabs/hardhat-etherscan");
const dotenv = require('dotenv');

dotenv.config();

/** @type import('hardhat/config').HardhatUserConfig */
//@dev - pass the network properties
module.exports = {
  solidity: "0.8.9",
  networks: {
    rinkeby: {
      url: process.env.REACT_APP_RINKEY_RPC_URL,
      accounts: [process.env.REACT_APP_SPECIAL_KEY],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_KEY_FOR_REACT,
  },
};
