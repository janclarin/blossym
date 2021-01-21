# Blossym

## Required Libraries
-- react-bootstrap
-- react-redux
-- truffle
-- ganache 
-- Web3.js
-- infura 

## Development setup

### Install dependencies

Run `npm install -g truffle ganache-cli`.

On Windows, also run `npm install -g windows-build-tools`.

### Start environment

1. Run `ganache-cli` in a terminal to start a local Ethereum test network (note the test public/private keys)
2. In a separate terminal, run `truffle compile` followed by `truffle migrate`
3. Run the web app in the client directory: `npm run start`

### Set up Metamask to connect to the local ganache test network

1. Open Metamask and change the network from Ethereum Mainnet to Localhost 8545
2. In Metamask, click on the avatar icon button and select Import Account
3. Copy and paste a private key string from the `ganache-cli` terminal
4. Click Import and enjoy your 100 test ETH
