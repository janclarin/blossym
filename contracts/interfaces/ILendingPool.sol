// SPDX-License-Identifier: agpl-3.0
pragma solidity 0.6.12;

import {
    ILendingPoolAddressesProvider
} from "./ILendingPoolAddressesProvider.sol";

interface ILendingPool {
    function deposit(
        address asset,
        uint256 amount,
        address onBehalfOf,
        uint16 referralCode
    ) external;
}
