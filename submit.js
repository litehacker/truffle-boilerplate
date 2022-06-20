const Web3 = require("web3");
const fs = require("fs");
require("dotenv").config();

const pk = process.env.PRIVATE_KEY;
const infuraID = process.env.INFURA_ID;
const contractAddress = process.env.CONTRACT_ADDRESS;
const myAddress = process.env.MY_ADDRESS;

const web3 = new Web3(new Web3.providers.HttpProvider(infuraID));

const getBalance = () => {
  web3.eth.getBalance(myAddress).then((balance) => {
    console.log(
      "the balance for address " +
        myAddress +
        " is " +
        web3.utils.fromWei(balance, "ether")
    );
  });
};

const VotingContractJSON = fs.readFileSync(
  "build/contracts/Voting.json",
  "utf-8"
);
const abi = JSON.parse(VotingContractJSON).abi;
const VotingContract = new web3.eth.Contract(abi, contractAddress);

const voteForCandidateABI = {
  inputs: [
    {
      internalType: "address",
      name: "candidate",
      type: "address",
    },
  ],
  name: "voteForCandidate",
  outputs: [],
  stateMutability: "nonpayable",
  type: "function",
};

const totalVotesFor = {
  inputs: [
    {
      internalType: "address",
      name: "candidate",
      type: "address",
    },
  ],
  name: "totalVotesFor",
  outputs: [
    {
      internalType: "int256",
      name: "",
      type: "int256",
    },
  ],
  stateMutability: "view",
  type: "function",
  constant: true,
};

const projectSubmitted = {
  inputs: [
    {
      internalType: "string",
      name: "_codeHash",
      type: "string",
    },
    {
      internalType: "string",
      name: "_authorName",
      type: "string",
    },
    {
      internalType: "address",
      name: "_sendHashTo",
      type: "address",
    },
  ],
  name: "projectSubmitted",
  outputs: [],
  stateMutability: "nonpayable",
  type: "function",
};

const CheckSumbittedABI = {
  inputs: [
    {
      internalType: "address",
      name: "_submission",
      type: "address",
    },
  ],
  name: "getSubmissionByContractAddress",
  outputs: [
    {
      components: [
        {
          internalType: "string",
          name: "hash",
          type: "string",
        },
        {
          internalType: "string",
          name: "authorName",
          type: "string",
        },
        {
          internalType: "address",
          name: "contractAddress",
          type: "address",
        },
        {
          internalType: "address",
          name: "walletAddress",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "timestamp",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "blockNum",
          type: "uint256",
        },
      ],
      internalType: "struct ProjectReceiver.Project",
      name: "",
      type: "tuple",
    },
  ],
  stateMutability: "view",
  type: "function",
};

const voteForCandidateTxData = web3.eth.abi.encodeFunctionCall(
  voteForCandidateABI,
  ["0x0C52061326F7D13BB7db0e3585f6eE2ec2f8D132"]
);

const projectSubmittedTxData = web3.eth.abi.encodeFunctionCall(
  projectSubmitted,
  [
    "2a2310cd5309e5e5d0b3da0b903b114bf6b76a9d5a218106ba023f2377145a74",
    "Giorgi",
    "0xa9b18c8291e05C7cd9c3030979553cB9e6742b86",
  ]
);

const CheckSumbittedTxData = web3.eth.abi.encodeFunctionCall(
  CheckSumbittedABI,
  ["0x0C52061326F7D13BB7db0e3585f6eE2ec2f8D132"]
);

const txA = {
  to: contractAddress,
  value: "0x00",
  gas: "0x30240",
  data: voteForCandidateTxData,
};

const txSubmit = {
  to: contractAddress,
  value: "0x00",
  gas: "0x30240",
  data: projectSubmittedTxData,
};

const VoteForSomeone = async () => {
  web3.eth.accounts.signTransaction(txA, pk).then((signedTX) => {
    console.log("========= SENDING TX =========");
    console.log("------------------------------");
    web3.eth
      .sendSignedTransaction(signedTX.rawTransaction, { from: myAddress })
      .then((r) => console.log(r));
  });
};

const Submit = async () => {
  web3.eth.accounts.signTransaction(txSubmit, pk).then((signedTX) => {
    console.log("========= txSubmit TX =========");
    console.log("------------------------------");
    web3.eth
      .sendSignedTransaction(signedTX.rawTransaction, { from: myAddress })
      .then((r) => console.log(r));
  });
};

const getVotes = async () => {
  await VotingContract.methods
    .totalVotesFor("0x0C52061326F7D13BB7db0e3585f6eE2ec2f8D132")
    .call()
    .then((r) => {
      console.log("totalVotesFor result ", r);
    });
};

const Submit2 = async () => {
  await VotingContract.methods
    .projectSubmitted(
      "2a2310cd5309e5e5d0b3da0b903b114bf6b76a9d5a218106ba023f2377145a74",
      "Giorgi",
      "0xa9b18c8291e05C7cd9c3030979553cB9e6742b86"
    )
    .call()
    .then((r) => {
      console.log("totalVotesFor result ", r);
    });
};

const CheckSubmition = async () => {
  await VotingContract.methods
    .getSubmissionByContractAddress(
      "0xB29c4BDee9C5b26cD48Ac8aa96D5E9dc8722aE79"
    )
    .call()
    .then((r) => {
      console.log("totalVotesFor result ", r);
    });
};

// getVotes();
Submit();
// Submit2();
// getBalance();
