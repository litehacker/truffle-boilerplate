const Voting = artifacts.require("Voting");
const ERC20token = artifacts.require("ERC20token");
//const MyToken = artifacts.require("MyToken")

//uint256 _initialAmount, string memory _tokenName, uint8 _decimalUnits, string  memory _tokenSymbol
module.exports = async function (deployer) {
  await deployer.deploy(
    ERC20token,
    1000000000000,
    "VotingToken",
    6,
    "votingToken0"
  );
  const myToken = await ERC20token.deployed();

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
    myToken.address
  );
};
// 0x9d401800542065d51D14Db990e5e4b01658C7fA8 COIN
// 0x0ad7239ab6c130764a46d0c906B0e4f4D8A36CAD Coin 2
// 0xab7d8E55f8D8472CeC9809C83803b3494F6F80eF Voting contract
// 0xB29c4BDee9C5b26cD48Ac8aa96D5E9dc8722aE79 Voting contract 2
// SHA of contract 51fbf4edcb39350c1536d9979d79e7b6ef2b1ec780c96eb6493733b2d3bfa418

// interaction
// contract = await Voting.deployed()
// contract.totalVotesFor("0x0C52061326F7D13BB7db0e3585f6eE2ec2f8D132")
// contract.voteForCandidate("0x0C52061326F7D13BB7db0e3585f6eE2ec2f8D132")
