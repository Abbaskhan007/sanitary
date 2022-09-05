//https://eth-goerli.g.alchemy.com/v2/JGgqau5x9qTjutk-LJkCehrtYbFeE6IL


require("@nomicfoundation/hardhat-chai-matchers");
require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.0",
  networks: {
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/JGgqau5x9qTjutk-LJkCehrtYbFeE6IL",
      accounts: [
        "c002d2d74544a26fbb837da58228ec8333530084cbb4593a9a47d93e90364f25",
      ],
    },
  },
};
