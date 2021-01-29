// SPDX-License-Identifier: agpl-3.0

pragma solidity ^0.6.0;

import {IERC20} from "../contracts/interfaces/IERC20.sol";
import {SafeERC20} from "../contracts/interfaces/SafeERC20.sol";

import {ILendingPool} from "../contracts/interfaces/ILendingPool.sol";
import {
    ILendingPoolAddressesProvider
} from "../contracts/interfaces/ILendingPoolAddressesProvider.sol";

contract FanDonation {
    using SafeERC20 for IERC20;

    ILendingPoolAddressesProvider addressesProvider;
    ILendingPool lendingPool;

    // Constructor takes the address of the AAVE protocol addresses provider. Should not change once deployed.
    // (https://docs.aave.com/developers/deployed-contracts)
    constructor(address _lendingPoolAddressesProvider) public {
        addressesProvider = ILendingPoolAddressesProvider(
            _lendingPoolAddressesProvider
        );
        lendingPool = ILendingPool(addressesProvider.getLendingPool());
    }

    address asset = address(0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48); // USDC
    uint16 referralCode = 0;

    // Signals to the front end whether or not the donation was successful
    event DonationCompleteStatus(bool success);

    function donate(uint256 amount, address _onBehalfOf) external {
        IERC20(asset).safeApprove(address(lendingPool), amount);
        lendingPool.deposit(asset, amount, _onBehalfOf, referralCode);
        emit DonationCompleteStatus(true);
    }
}
