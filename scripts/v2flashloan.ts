import * as dotenv from "dotenv";
import { ethers } from "hardhat";
import V2FlashLoanArtifact from "../artifacts/contracts/V2FlashLoan.sol/V2FlashLoan.json";
import { V2FlashLoan } from "../typechain/V2FlashLoan";
dotenv.config();

const Flashloan: () => Promise<void> = async () => {
  console.log("start to deploy");

  // Connect to the network
  const provider = ethers.getDefaultProvider("ropsten");
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);

  const contract = new ethers.Contract(
    "0x2229A27d1FA94B51735C392407F88C09dD0B9E31",
    V2FlashLoanArtifact.abi,
    wallet
  ) as V2FlashLoan;

  console.log(contract.functions);

  const result = await contract.myFlashLoanCall(
    "0x7a250d5630b4cf539739df2c5dacb4c659f2488d",
    "0x1b02da8cb0d097eb8d57a175b88c7d8b47997506",
    "0xc778417e063141139fce010982780140aa0cd5ab",
    "0xad6d458402f60fd3bd25163575031acdce07538d",
    100000000000000000000
  );

  console.log(result.hash);
};

Flashloan();

export default Flashloan;
