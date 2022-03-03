// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity ^0.6.12;
pragma experimental ABIEncoderV2;

import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";
import "@uniswap/lib/contracts/libraries/TransferHelper.sol";

contract V2Swap {
    IUniswapV2Router02 public immutable swapRouter;

    constructor(address router) public {
        swapRouter = IUniswapV2Router02(router);
    }

    function swapExactInputSingle(
        uint256 amountIn,
        address from,
        address to
    ) external returns (uint256 amountOut) {
        TransferHelper.safeTransferFrom(
            from,
            msg.sender,
            address(this),
            amountIn
        );

        TransferHelper.safeApprove(from, address(swapRouter), amountIn);

        address[] memory path = new address[](2);
        path[0] = from;
        path[1] = to;

        uint256[] memory amountOuts = swapRouter.swapExactTokensForTokens(
            amountIn,
            0,
            path,
            msg.sender,
            block.timestamp
        );

        amountOut = amountOuts[0];
    }

    function swapExactOutputSingle(
        uint256 amountOut,
        uint256 amountInMaximum,
        address from,
        address to
    ) external returns (uint256 amountIn) {
        TransferHelper.safeTransferFrom(
            from,
            msg.sender,
            address(this),
            amountInMaximum
        );

        TransferHelper.safeApprove(from, address(swapRouter), amountInMaximum);

        address[] memory path = new address[](2);
        path[0] = from;
        path[1] = to;

        uint256[] memory amountIns = swapRouter.swapTokensForExactTokens(
            amountOut,
            amountInMaximum,
            path,
            msg.sender,
            block.timestamp
        );

        amountIn = amountIns[0];
        if (amountIn < amountInMaximum) {
            TransferHelper.safeApprove(from, address(swapRouter), 0);
            TransferHelper.safeTransfer(
                from,
                msg.sender,
                amountInMaximum - amountIn
            );
        }
    }
}
