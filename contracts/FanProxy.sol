// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FanProxy {
    function swapAndDonateEth(address to) external payable {
        require(msg.value > 0, "Cannot swap and donate 0 ETH");

        // TODO: Remove this. Just for testing purposes.
        (bool success, ) = to.call{value: msg.value}("");
        require(success, "Transfer failed");

        // TODO: Swap ETH to USDC via FanSwap contract.

        // Should be the amount of USDC this contract has after FanSwap.swap().
        // Replace with IERC20(usdcAddress).balanceOf(address(this)).
        uint256 usdcAmount = 100;
        _donate(usdcAmount, to);
    }

    function _donate(uint256 usdcAmount, address to) private {
        require(usdcAmount > 0, "Cannot donate 0 USDC");
        // TODO: Remove require statement. Added to satisfy "unused var" linter.
        require(to != address(0), "Required just to use var");

        // TODO: Approve FanDonation contract to spend usdcAmount.
        // TODO: Call FanDonation.donate(usdcAmount, to);
    }
}
