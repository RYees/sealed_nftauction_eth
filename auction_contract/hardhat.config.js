/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: '0.8.9',
    defaultNetwor: 'sepolia',
    networks: {
      harhat: {},
      sepolia: {
        url: 'https://rpc.sepolia.dev',
        accounts: []
      }
    },
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
