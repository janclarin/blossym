const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");

const mnemonicPhrase = "<YOUR 12 word mnemonic here>";

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      network_id: "*",
      host: "localhost",
      port: 8545,
    },
    kovan: {
      provider: () =>
        new HDWalletProvider({
          mnemonic: {
            phrase: mnemonicPhrase,
          },
          providerOrUrl:
            "wss://kovan.infura.io/ws/v3/74542cc97cfd4b59b1c971c683ba5042",
        }),
      network_id: "42",
    },
  },
  compilers: {
    solc: {
      version: "0.6.12",
    },
  },
};
