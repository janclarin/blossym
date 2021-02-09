# Blossym

[Blossym](https://blossym.org) is a platform for fans to donate to creators they want to support and for creators to automatically earn yield on those fan donations, all in one place. Blossym enables uncensorable, simple donations with no middle-men taking a cut so that fan donations directly reach their favorite creators.

Blossym is currently running on the Kovan Ethereum test network. [Made](https://hack.ethglobal.co/showcase/blossym-recuZRZSYdWwKrHIp) for the [ETHGlobal MarketMake](https://marketmake.ethglobal.co/) hackathon.

[Demo video](https://www.youtube.com/watch?v=AclzZes5dUI)

## Features

### Home page

Fans can select from highlighted creators on the home page, as well as access the fan donation box directly from the creator via a URL.

### Fan page

Fans donate ETH to their favorite artists, musicians, podcasters, writers, journalists, and other creators. They do so by entering the creator's ETH wallet address and the amount they want to donate. The donated ETH is then swapped into USDC via Uniswap and deposited into AAVE's lending pool on behalf of the creator, so the newly minted aUSDC (interest-bearing USDC) is sent to the creator's ETH wallet address.

### Creator page

Creators can view their aUSDC balance recent fan ETH donations, aUSDC interest rates, and estimated future earnings. They can also "cash out" their aUSDC which burns the aUSDC tokens to redeem USDC. Most importantly, they can easily share their fan donation link to either Twitter or Telegram, or by copying the URL. The creator's wallet address is automatically populated when a fan clicks the link.

### Future

In the future, we plan to allow creators to choose among different investment and asset allocation options, as well as allow creators to convert their USDC into USD in one-click. Additionally, we want to provide even more information to the creator, such as a chart to easily view balance changes. Lastly, we also plan to enable fan donations in different cryptocurrencies.

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
