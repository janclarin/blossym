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

    // USDC
    IERC20 usdc = IERC20(0x6B175474E89094C44Da98b954EedeAC495271d0F);
    // Referral program for AAVE (https://docs.aave.com/developers/referral-program)
    uint16 referralCode = 0;

    // Constructor takes the address of the AAVE protocol addresses provider. Should not change once deployed.
    // (https://docs.aave.com/developers/deployed-contracts)
    constructor(address _lendingPoolAddressesProvider) public {
        addressesProvider = ILendingPoolAddressesProvider(
            _lendingPoolAddressesProvider
        );
        lendingPool = ILendingPool(addressesProvider.getLendingPool());
    }

    // Signals to the front end whether or not the donation was successful
    event DonationCompleted(bool success);

    function donate(uint256 amount, address to) external {
        require(amount > 0, "Amount needs to be greater than 0");

        // Transfer USDC to this contract
        usdc.transferFrom(msg.sender, address(this), amount);

        // Approve contract to deposit it into the lendingPool
        usdc.safeApprove(address(lendingPool), amount);

        // Actually deposit into the lendingPool on behalf of the creator
        lendingPool.deposit(address(usdc), amount, to, referralCode);

        emit DonationCompleted(true);
    }
}
