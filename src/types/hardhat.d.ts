/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomiclabs/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "IERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20__factory>;
    getContractFactory(
      name: "IFlashLoanSimpleReceiver",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IFlashLoanSimpleReceiver__factory>;
    getContractFactory(
      name: "IPool",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IPool__factory>;
    getContractFactory(
      name: "IPoolAddressesProvider",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IPoolAddressesProvider__factory>;
    getContractFactory(
      name: "IERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20__factory>;
    getContractFactory(
      name: "IUniswapV2Router01",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IUniswapV2Router01__factory>;
    getContractFactory(
      name: "IUniswapV2Router02",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IUniswapV2Router02__factory>;
    getContractFactory(
      name: "V2Swap",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.V2Swap__factory>;
    getContractFactory(
      name: "V3FlashLoan",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.V3FlashLoan__factory>;
    getContractFactory(
      name: "V3FlashLoanArbitrage",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.V3FlashLoanArbitrage__factory>;

    getContractAt(
      name: "IERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20>;
    getContractAt(
      name: "IFlashLoanSimpleReceiver",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IFlashLoanSimpleReceiver>;
    getContractAt(
      name: "IPool",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IPool>;
    getContractAt(
      name: "IPoolAddressesProvider",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IPoolAddressesProvider>;
    getContractAt(
      name: "IERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20>;
    getContractAt(
      name: "IUniswapV2Router01",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IUniswapV2Router01>;
    getContractAt(
      name: "IUniswapV2Router02",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IUniswapV2Router02>;
    getContractAt(
      name: "V2Swap",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.V2Swap>;
    getContractAt(
      name: "V3FlashLoan",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.V3FlashLoan>;
    getContractAt(
      name: "V3FlashLoanArbitrage",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.V3FlashLoanArbitrage>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.utils.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
  }
}
