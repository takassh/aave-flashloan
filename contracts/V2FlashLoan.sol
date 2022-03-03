// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity 0.6.12;
pragma experimental ABIEncoderV2;

import {FlashLoanReceiverBase} from "@aave/protocol-v2/contracts/flashloan/base/FlashLoanReceiverBase.sol";
import {ILendingPool} from "@aave/protocol-v2/contracts/interfaces/ILendingPool.sol";
import {ILendingPoolAddressesProvider} from "@aave/protocol-v2/contracts/interfaces/ILendingPoolAddressesProvider.sol";
import {IERC20} from "@aave/protocol-v2/contracts/dependencies/openzeppelin/contracts/IERC20.sol";
import {V2Swap} from "./V2Swap.sol";
import {IUniswapV2Router02} from "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";
import {SafeMath} from "@aave/protocol-v2/contracts/dependencies/openzeppelin/contracts/SafeMath.sol";

/** 
    !!!
    Never keep funds permanently on your FlashLoanReceiverBase contract as they could be 
    exposed to a 'griefing' attack, where the stored funds are used by an attacker.
    !!!
 */
contract V2FlashLoan is FlashLoanReceiverBase {
    using SafeMath for uint256;

    address private loanCoinAddress;
    address private viaCoinAddress;
    address private swapRouterDEX1;
    address private swapRouterDEX2;

    // intantiate lending pool addresses provider and get lending pool address
    constructor()
        public
        FlashLoanReceiverBase(
            ILendingPoolAddressesProvider(
                0x1c8756FD2B28e9426CDBDcC7E3c4d64fa9A54728
            )
        )
    {}

    /**
        This function is called after your contract has received the flash loaned amount
     */
    function executeOperation(
        address[] calldata assets,
        uint256[] calldata amounts,
        uint256[] calldata premiums,
        address initiator,
        bytes calldata params
    ) external override returns (bool) {
        //
        // This contract now has the funds requested.
        // Your logic goes here.
        //

        V2Swap dex1 = new V2Swap(swapRouterDEX1);
        V2Swap dex2 = new V2Swap(swapRouterDEX2);

        uint256 amountOut = dex1.swapExactInputSingle(
            amounts[0],
            loanCoinAddress,
            viaCoinAddress
        );

        dex2.swapExactInputSingle(amountOut, viaCoinAddress, loanCoinAddress);

        // At the end of your logic above, this contract owes
        // the flashloaned amounts + premiums.
        // Therefore ensure your contract has enough to repay
        // these amounts.

        // Approve the LendingPool contract allowance to *pull* the owed amount
        for (uint256 i = 0; i < assets.length; i++) {
            uint256 amountOwing = amounts[i].add(premiums[i]);
            IERC20(assets[i]).approve(address(LENDING_POOL), amountOwing);
        }

        return true;
    }

    function myFlashLoanCall(
        address router1,
        address router2,
        address _loanCoinAddress,
        address _viaCoinAddress,
        uint256 loanAmount
    ) public {
        address receiverAddress = address(this);

        swapRouterDEX1 = router1;
        swapRouterDEX2 = router2;
        loanCoinAddress = _loanCoinAddress;
        viaCoinAddress = _viaCoinAddress;

        address[] memory assets = new address[](2);
        assets[0] = loanCoinAddress;

        uint256[] memory amounts = new uint256[](2);
        amounts[0] = loanAmount;

        // 0 = no debt, 1 = stable, 2 = variable
        uint256[] memory modes = new uint256[](2);
        modes[0] = 0;

        address onBehalfOf = address(this);
        bytes memory params = "";
        uint16 referralCode = 0;

        LENDING_POOL.flashLoan(
            receiverAddress,
            assets,
            amounts,
            modes,
            onBehalfOf,
            params,
            referralCode
        );
    }
}
