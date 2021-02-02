const FanProxy = artifacts.require("./FanProxy.sol");

contract("FanProxy", (accounts) => {
  // This is not a real test for FanProxy final behavior.
  it("should send eth to creator address", async () => {
    const fanProxyInstance = await FanProxy.deployed();
    const fanAddress = accounts[0];
    const creatorAddress = accounts[1];
    const ethDonationAmount = web3.utils.toWei("5");

    await fanProxyInstance.swapAndDonateEth(creatorAddress, {
      from: fanAddress,
      value: ethDonationAmount,
    });

    const creatorBalance = await web3.eth.getBalance(creatorAddress);
    assert.equal(creatorBalance, web3.utils.toWei("105"));
  });
});
