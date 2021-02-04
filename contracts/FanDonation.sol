// SPDX-License-Identifier: agpl-3.0

pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "@aave/protocol-v2/contracts/interfaces/ILendingPool.sol";
import "@aave/protocol-v2/contracts/interfaces/ILendingPoolAddressesProvider.sol";

contract FanDonation {
    ILendingPoolAddressesProvider addressesProvider;
    ILendingPool lendingPool;

    // USDC Address on Kovan
    ERC20 usdc = ERC20(0xe22da380ee6B445bb8273C81944ADEB6E8450422);
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
        usdc.increaseAllowance(address(lendingPool), amount);

        // Actually deposit into the lendingPool on behalf of the creator
        lendingPool.deposit(address(usdc), amount, to, referralCode);

        emit DonationCompleted(true);
    }
}
