const Web3 = require("web3");
const fs = require("fs");
require("dotenv").config();

const pk = process.env.PRIVATE_KEY;
const infuraID = process.env.INFURA_ID;
const contractAddress = process.env.CONTRACT_ADDRESS;
const myAddress = process.env.MY_ADDRESS;

let web3 = new Web3(new Web3.providers.HttpProvider(infuraID));

const getMyBalance = () => {
  web3.eth.getBalance(myAddress).then((balance) => {
    console.log(
      "the balance for address " +
        myAddress +
        " is " +
        web3.utils.fromWei(balance, "ether")
    );
  });
};
getMyBalance();

const entireJSON = fs.readFileSync("build/contracts/NumStore.json", "utf-8");
let abi = JSON.parse(entireJSON).abi;
let myContract = new web3.eth.Contract(abi, contractAddress);

myContract.methods
  .getNum()
  .call()
  .then((r) => {
    console.log("returned result ", r);
  });
