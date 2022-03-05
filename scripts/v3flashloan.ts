import * as dotenv from "dotenv";
import { ethers } from "hardhat";
import IERC20Artifact from "../artifacts/@aave/core-v3/contracts/dependencies/openzeppelin/contracts/IERC20.sol/IERC20.json";
import V3FlashLoanArtifact from "../artifacts/contracts/V3FlashLoan.sol/V3FlashLoan.json";
import { IERC20, V3FlashLoan } from "../src/types";

dotenv.config();

const Flashloan: () => Promise<void> = async () => {
  console.log("start to deploy");

  const V3FlashLoan = await ethers.getContractFactory("V3FlashLoan");
  const flashLoan = await V3FlashLoan.deploy();

  await flashLoan.deployed();

  console.log("FlashLoan deployed to:", flashLoan.address);

  console.log("start dapp");

  // Connect to the network
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RINKEBY_SERVER_URL ?? ""
  );
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);

  const contract = new ethers.Contract(
    flashLoan.address,
    V3FlashLoanArtifact.abi,
    wallet
  ) as V3FlashLoan;

  const aave = new ethers.Contract(
    "0x953af320e2bD3041c4e56BB3a30E7f613a1f3C1A",
    IERC20Artifact.abi,
    wallet
  ) as IERC20;

  const feeAmount = ethers.utils.parseUnits("0.09", 18);
  const loanAmount = ethers.utils.parseUnits("100", 18);

  const tx = await aave.transfer(contract.address, feeAmount);

  await tx.wait();

  console.log("transfered");

  const result = await contract.myFlashLoanCall(aave.address, loanAmount);

  const r = await result.wait();

  console.log(r.transactionHash);
};

Flashloan();

export default Flashloan;
