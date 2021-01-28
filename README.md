# Blossym

## Development setup

### Install dependencies

Run `npm install -g yarn` to install yarn.

Run `yarn global add truffle ganache-cli` to install global dependencies.

On Windows, also run `yarn global add windows-build-tools`.

Run `yarn install` to install project dependencies.

### Start environment

1. Run `ganache-cli` in a terminal to start a local Ethereum test network (note the test public/private keys)
2. In a separate terminal, run `truffle compile` followed by `truffle migrate`
3. Run the web app: `yarn run start`

### Set up Metamask to connect to the local ganache test network

1. Open Metamask and change the network from Ethereum Mainnet to Localhost 8545
2. In Metamask, click on the avatar icon button and select Import Account
3. Copy and paste a private key string from the `ganache-cli` terminal
4. Click Import and enjoy your 100 test ETH

### Adding new dependencies

To the root package, run `yarn add [--dev] <package-name>`.

To the client package, run `yarn workspace client add [--dev] <package-name>`.
