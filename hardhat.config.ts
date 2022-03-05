import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import * as dotenv from "dotenv";
import "hardhat-gas-reporter";
import { HardhatUserConfig, task } from "hardhat/config";
import "solidity-coverage";

dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.10",
      },
    ],
  },
  defaultNetwork: "rinkeby",
  networks: {
    ropsten: {
      url: process.env.ROPSTEN_SERVER_URL,
      accounts: [process.env.PRIVATE_KEY ?? ""],
    },
    kovan: {
      url: process.env.KOVAN_SERVER_URL,
      accounts: [process.env.PRIVATE_KEY ?? ""],
    },
    rinkeby: {
      url: process.env.RINKEBY_SERVER_URL,
      accounts: [process.env.PRIVATE_KEY ?? ""],
    },
    bscTestnet: {
      url: process.env.BSC_TEST_SERVER_URL,
      accounts: [process.env.PRIVATE_KEY ?? ""],
    },
  },
  typechain: {
    outDir: "src/types",
    target: "ethers-v5",
    alwaysGenerateOverloads: false, // should overloads with full signatures like deposit(uint256) be generated always, even if there are no overloads?
    externalArtifacts: ["externalArtifacts/*.json"], // optional array of glob patterns with external artifacts to process (for example external libs from node_modules)
  },
};

export default config;
