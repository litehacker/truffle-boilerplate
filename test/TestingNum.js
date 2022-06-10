const Num = artifacts.require("NumStore");

contract("NumStore", function () {
  it("Should result in value 3 initially", async function () {
    let instance = await Num.deployed();
    let expectedResult = 3;
    let initialResult = await instance.getNum();
    AuthenticatorAssertionResponse.equal(
      initialResult,
      expectedResult,
      "Initial results should be 3!"
    );
  });
});
