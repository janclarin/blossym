// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";

contract FanSwap {
    // Uniswap address on mainnet and testnets.
    address private constant UNISWAP_ROUTER_ADDRESS =
        0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
    // USDC address compatible with Aave for aUSDC.
    address private constant USDC_KOVAN_ADDRESS =
        0xe22da380ee6B445bb8273C81944ADEB6E8450422;

    IUniswapV2Router02 private uniswapRouter =
        IUniswapV2Router02(UNISWAP_ROUTER_ADDRESS);
    IERC20 private usdc = IERC20(USDC_KOVAN_ADDRESS);

    function swapToUSDC() external payable {
        require(msg.value > 0, "Cannot swap 0 ETH");

        // Minimum amount of USDC from the swap to be considered successful.
        uint256 amountOutMin = 0;

        // Approximately now for convenience on testnets.
        // On mainnet, this should be passed from frontend.
        uint256 deadline = block.timestamp + 15;

        // Swaps ETH from sender to USDC and sends swapped USDC back to sender.
        uniswapRouter.swapExactETHForTokens{value: msg.value}(
            amountOutMin,
            getPathForETHToUSDC(),
            msg.sender,
            deadline
        );
    }

    function getPathForETHToUSDC() private view returns (address[] memory) {
        address[] memory path = new address[](2);
        path[0] = uniswapRouter.WETH();
        path[1] = USDC_KOVAN_ADDRESS;
        return path;
    }
}
