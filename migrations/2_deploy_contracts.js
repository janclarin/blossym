var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var FanProxy = artifacts.require("./FanProxy.sol");

module.exports = function (deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(FanProxy);
};
