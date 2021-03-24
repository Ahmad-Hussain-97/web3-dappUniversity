const Web3 = require("web3");
const rpcURL = "https://ropsten.infura.io/v3/22f1231065ad4fef9893bc29f17f9e23";
const web3 = new Web3(rpcURL);
var Tx = require("ethereumjs-tx");

//Task 1: Connect and check account balance
function checkAccountBalance() {
  const account_address = "0x687422eEA2cB73B5d3e242bA5456b782919AFc85";
  web3.eth.getBalance(account_address, (err, wei) => {
    if (err) {
      console.log(">>>>>Error:", err);
    } else {
      balance = web3.utils.fromWei(wei, "ether");
      console.log("<<<<<Balance:", balance);
    }
  });
}

//Task 2: Accessing smart contracts
function callViewState() {
  const contract_abi = [
    {
      inputs: [
        {
          internalType: "uint256",
          name: "newAge",
          type: "uint256",
        },
      ],
      name: "setAge",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "newName",
          type: "string",
        },
      ],
      name: "setName",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [],
      name: "getAge",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getName",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];

  const contract_address = "0xae9c87CBED76cD0243077D6483bB8257bb8bE450";
  const contract = new web3.eth.Contract(contract_abi, contract_address);

  contract.methods.getAge().call((err, result) => {
    if (err) {
      console.log(">>>>>Error:", err);
      return;
    }
    console.log("<<<<<Age:", result);
  });
}
