// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "@aave/protocol-v2/contracts/interfaces/ILendingPool.sol";
import "@aave/protocol-v2/contracts/interfaces/ILendingPoolAddressesProvider.sol";

contract CreatorCashout {
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
    event CashoutCompleted(bool success);

    function cashout(uint256 amount, address to) external {
        // Actually deposit into the lendingPool on behalf of the creator
        lendingPool.withdraw(address(usdc), amount, to);

        emit CashoutCompleted(true);
    }
}
