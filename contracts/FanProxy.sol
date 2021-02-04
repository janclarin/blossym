// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./FanSwap.sol";

contract FanProxy {
    // USDC address compatible with Aave for aUSDC.
    address private constant USDC_KOVAN_ADDRESS =
        0xe22da380ee6B445bb8273C81944ADEB6E8450422;

    IERC20 private usdc = IERC20(USDC_KOVAN_ADDRESS);

    FanSwap private immutable fanSwap;

    constructor(address fanSwapAddress) public {
        fanSwap = FanSwap(fanSwapAddress);
    }

    function swapAndDonateETH(address to) external payable {
        require(msg.value > 0, "Cannot swap and donate 0 ETH");

        // Swaps ETH for USDC. Swapped USDC is returned to this contract, which
        // will be donated within the same transaction.
        fanSwap.swapToUSDC{value: msg.value}();

        uint256 swappedUSDCAmount = usdc.balanceOf(address(this));
        _donateUSDC(swappedUSDCAmount, to);
    }

    function _donateUSDC(uint256 amount, address to) private {
        require(amount > 0, "Cannot donate 0 USDC");
        // TODO: Remove require statement. Added to satisfy "unused var" linter.
        require(to != address(0), "Required just to use var");

        // TODO: Approve FanDonation contract to spend usdcAmount.
        // TODO: Call FanDonation.donate(usdcAmount, to);
    }
}
