import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import * as tdly from "@tenderly/hardhat-tenderly";

dotenv.config();

tdly.setup({ automaticVerifications: true });

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

const config = {
  solidity: "0.8.4",
  networks: {
    tenderly: {
      url: process.env.TENDERLY_RPC,
      accounts: [process.env.PRIVATE_KEY],
    }
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  tenderly: {
    username: process.env.TENDERLY_USERNAME, // tenderly username (or organization name)
    project: process.env.TENDERLY_PROJECT, // project name
    privateVerification: false // if true, contracts will be verified privately, if false, contracts will be verified publicly
  }
};

export default config;
