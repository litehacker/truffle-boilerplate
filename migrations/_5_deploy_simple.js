// migrations/2_deploy.js
const SimpleToken = artifacts.require("SimpleToken");
const Voting = artifacts.require("Voting");

module.exports = async function (deployer) {
  await deployer.deploy(SimpleToken);
  const token = await SimpleToken.deployed();

  await deployer.deploy(
    Voting,
    [
      "0x0C52061326F7D13BB7db0e3585f6eE2ec2f8D132",
      "0xd6D8f0E3CD28ccDf02Ba4933608f6Dd94Ff150AC",
      "0xC3EA42b644402783D4aD3C4BD70e3f25861AF207",
      "0x4245AAB58E3Ba50F3A577aBD1fcC2d63DF2f44C6",
      "0x914E8C46C5158854b2aaE332332ce2abC511D966",
    ],
    10,
    token.address
  );
};
