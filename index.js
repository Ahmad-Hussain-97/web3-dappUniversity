const Web3 = require("web3");
const rpcURL = "https://ropsten.infura.io/v3/22f1231065ad4fef9893bc29f17f9e23";
const web3 = new Web3(rpcURL);
var Tx = require("ethereumjs-tx");

//Task 1: Connect and check account balance
function checkBalanceofAccount() {
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
function accessContracts() {
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

//Task 3: Inside ethereum transactions
function transferEther() {
  const from_account = "0x657ABc323D94452ca8c79F8c36AC69440681ab89";
  const to_account = "0xcE495ab03995785d1C891dad48e3112cCC2C039a";
  const privateKey1 = Buffer.from(
    "ae303023d55fdd322309d6db4526a7a0e79c8dffd2221858dff46b1b22d6572d",
    "hex"
  );
  const privateKey2 = Buffer.from(
    "f5cb0268cd208e3b7669bd1927307ea49f9f85958ca7edb182234cecd12921a6",
    "hex"
  );

  web3.eth.getTransactionCount(from_account, (err, txCount) => {
    if (err) {
      console.log(">>>>>Error:", err);
      return;
    }
    const txObject = {
      nonce: web3.utils.toHex(txCount),
      to: to_account,
      value: web3.utils.toHex(web3.utils.toWei("0.1", "ether")),
      gasLimit: web3.utils.toHex(21000),
      gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
    };
    const tx = new Tx.Transaction(txObject, { chain: "ropsten" });
    tx.sign(privateKey1);

    const serializedTx = tx.serialize();
    const raw = "0x" + serializedTx.toString("hex");

    web3.eth.sendSignedTransaction(raw, (err, txHash) => {
      if (err) {
        console.log(">>>>>Error:", err);
        return;
      }
      console.log("Transaction set, Hash:", txHash);
    });
  });
}

//Task 4: Deploying Smart Contracts with Web3.js
function deploySmartContract() {
  const owner_account = "0x657ABc323D94452ca8c79F8c36AC69440681ab89";
  const owner_key = Buffer.from(
    "ae303023d55fdd322309d6db4526a7a0e79c8dffd2221858dff46b1b22d6572d",
    "hex"
  );
  web3.eth.getTransactionCount(owner_account, (err, txCount) => {
    if (err) {
      console.log(">>>>>Error:", err);
      return;
    }
    // ERC-20 standard token
    const data =
      "0x60806040526040805190810160405280600a81526020017f4441707020546f6b656e000000000000000000000000000000000000000000008152506000908051906020019061004f92919061014e565b506040805190810160405280600481526020017f44415050000000000000000000000000000000000000000000000000000000008152506001908051906020019061009b92919061014e565b506040805190810160405280600f81526020017f4441707020546f6b656e2076312e300000000000000000000000000000000000815250600290805190602001906100e792919061014e565b503480156100f457600080fd5b506000620f4240905080600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555080600381905550506101f3565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061018f57805160ff19168380011785556101bd565b828001600101855582156101bd579182015b828111156101bc5782518255916020019190600101906101a1565b5b5090506101ca91906101ce565b5090565b6101f091905b808211156101ec5760008160009055506001016101d4565b5090565b90565b610b99806102026000396000f300608060405260043610610099576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde031461009e578063095ea7b31461012e57806318160ddd1461019357806323b872dd146101be5780635a3b7e421461024357806370a08231146102d357806395d89b411461032a578063a9059cbb146103ba578063dd62ed3e1461041f575b600080fd5b3480156100aa57600080fd5b506100b3610496565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156100f35780820151818401526020810190506100d8565b50505050905090810190601f1680156101205780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561013a57600080fd5b50610179600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610534565b604051808215151515815260200191505060405180910390f35b34801561019f57600080fd5b506101a8610626565b6040518082815260200191505060405180910390f35b3480156101ca57600080fd5b50610229600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919050505061062c565b604051808215151515815260200191505060405180910390f35b34801561024f57600080fd5b5061025861089b565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561029857808201518184015260208101905061027d565b50505050905090810190601f1680156102c55780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b3480156102df57600080fd5b50610314600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610939565b6040518082815260200191505060405180910390f35b34801561033657600080fd5b5061033f610951565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561037f578082015181840152602081019050610364565b50505050905090810190601f1680156103ac5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b3480156103c657600080fd5b50610405600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506109ef565b604051808215151515815260200191505060405180910390f35b34801561042b57600080fd5b50610480600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610b48565b6040518082815260200191505060405180910390f35b60008054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561052c5780601f106105015761010080835404028352916020019161052c565b820191906000526020600020905b81548152906001019060200180831161050f57829003601f168201915b505050505081565b600081600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905092915050565b60035481565b6000600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054821115151561067c57600080fd5b600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054821115151561070757600080fd5b81600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254019250508190555081600560008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a3600190509392505050565b60028054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156109315780601f1061090657610100808354040283529160200191610931565b820191906000526020600020905b81548152906001019060200180831161091457829003601f168201915b505050505081565b60046020528060005260406000206000915090505481565b60018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156109e75780601f106109bc576101008083540402835291602001916109e7565b820191906000526020600020905b8154815290600101906020018083116109ca57829003601f168201915b505050505081565b600081600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410151515610a3f57600080fd5b81600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a36001905092915050565b60056020528160005260406000206020528060005260406000206000915091505054815600a165627a7a723058204c3f690997294d337edc3571d8e77afc5b0e56a2f4bfae6fb59139c8e4eb2f7e0029";

    const txObject = {
      nonce: web3.utils.toHex(txCount),
      gasLimit: web3.utils.toHex(1000000),
      gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
      data: data,
    };
    const tx = new Tx.Transaction(txObject, { chain: "ropsten" });
    tx.sign(owner_key);

    const serializedTx = tx.serialize();
    const raw = "0x" + serializedTx.toString("hex");
    web3.eth.sendSignedTransaction(raw, (err, txHash) => {
      if (err) {
        console.log(">>>>>Error:", err);
        return;
      }
      console.log("Transaction sent, Hash:", txHash);
    });
  });
}

//Task 5: Calling Smart Contract Functions with Web3.js
function callingContractFunctions() {
  const account1 = "0x657ABc323D94452ca8c79F8c36AC69440681ab89";
  const account2 = "0xcE495ab03995785d1C891dad48e3112cCC2C039a";
  const privateKey1 = Buffer.from(
    "ae303023d55fdd322309d6db4526a7a0e79c8dffd2221858dff46b1b22d6572d",
    "hex"
  );
  const privateKey2 = Buffer.from(
    "f5cb0268cd208e3b7669bd1927307ea49f9f85958ca7edb182234cecd12921a6",
    "hex"
  );

  const contractAddress = "0xff84a3af17ffa5f5bd14e1abdb5c70f1a798f7fd";
  const contractABI = [
    {
      constant: true,
      inputs: [],
      name: "name",
      outputs: [{ name: "", type: "string" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { name: "_spender", type: "address" },
        { name: "_value", type: "uint256" },
      ],
      name: "approve",
      outputs: [{ name: "success", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "totalSupply",
      outputs: [{ name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { name: "_from", type: "address" },
        { name: "_to", type: "address" },
        { name: "_value", type: "uint256" },
      ],
      name: "transferFrom",
      outputs: [{ name: "success", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "standard",
      outputs: [{ name: "", type: "string" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [{ name: "", type: "address" }],
      name: "balanceOf",
      outputs: [{ name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "symbol",
      outputs: [{ name: "", type: "string" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { name: "_to", type: "address" },
        { name: "_value", type: "uint256" },
      ],
      name: "transfer",
      outputs: [{ name: "success", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        { name: "", type: "address" },
        { name: "", type: "address" },
      ],
      name: "allowance",
      outputs: [{ name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, name: "_from", type: "address" },
        { indexed: true, name: "_to", type: "address" },
        { indexed: false, name: "_value", type: "uint256" },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, name: "_owner", type: "address" },
        { indexed: true, name: "_spender", type: "address" },
        { indexed: false, name: "_value", type: "uint256" },
      ],
      name: "Approval",
      type: "event",
    },
  ];
  const contract = new web3.eth.Contract(contractABI, contractAddress);

  web3.eth.getTransactionCount(account1, (err, txCount) => {
    if (err) {
      console.log(">>>>>Error:", err);
      return;
    }
    const txObject = {
      nonce: web3.utils.toHex(txCount),
      gasLimit: web3.utils.toHex(800000),
      gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
      to: contractAddress,
      data: contract.methods.transfer(account2, 1000).encodeABI(),
    };
    const tx = new Tx.Transaction(txObject, { chain: "ropsten" });
    tx.sign(privateKey1);

    const serializedTx = tx.serialize();
    const raw = "0x" + serializedTx.toString("hex");

    web3.eth.sendSignedTransaction(raw, (err, txHash) => {
      if (err) {
        console.log(">>>>>Error:", err);
        return;
      }
      console.log("Tokens transferred successfully, Hash:", txHash);
    });
  });

  contract.methods.balanceOf(account1).call((err, balance) => {
    if (err) {
      console.log(">>>>>Error:", err);
      return;
    }
    console.log("Account 1 Balance:", balance);
  });

  contract.methods.balanceOf(account2).call((err, balance) => {
    if (err) {
      console.log(">>>>>Error:", err);
      return;
    }
    console.log("Account 2 balance:", balance);
  });
}

//Task 6: Smart Contract Events with Web3.js
function listAllEvents() {
  const abi = [
    {
      constant: true,
      inputs: [],
      name: "mintingFinished",
      outputs: [{ name: "", type: "bool" }],
      payable: false,
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "name",
      outputs: [{ name: "", type: "string" }],
      payable: false,
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { name: "_spender", type: "address" },
        { name: "_value", type: "uint256" },
      ],
      name: "approve",
      outputs: [],
      payable: false,
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "totalSupply",
      outputs: [{ name: "", type: "uint256" }],
      payable: false,
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { name: "_from", type: "address" },
        { name: "_to", type: "address" },
        { name: "_value", type: "uint256" },
      ],
      name: "transferFrom",
      outputs: [],
      payable: false,
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "decimals",
      outputs: [{ name: "", type: "uint256" }],
      payable: false,
      type: "function",
    },
    {
      constant: false,
      inputs: [],
      name: "unpause",
      outputs: [{ name: "", type: "bool" }],
      payable: false,
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { name: "_to", type: "address" },
        { name: "_amount", type: "uint256" },
      ],
      name: "mint",
      outputs: [{ name: "", type: "bool" }],
      payable: false,
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "paused",
      outputs: [{ name: "", type: "bool" }],
      payable: false,
      type: "function",
    },
    {
      constant: true,
      inputs: [{ name: "_owner", type: "address" }],
      name: "balanceOf",
      outputs: [{ name: "balance", type: "uint256" }],
      payable: false,
      type: "function",
    },
    {
      constant: false,
      inputs: [],
      name: "finishMinting",
      outputs: [{ name: "", type: "bool" }],
      payable: false,
      type: "function",
    },
    {
      constant: false,
      inputs: [],
      name: "pause",
      outputs: [{ name: "", type: "bool" }],
      payable: false,
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "owner",
      outputs: [{ name: "", type: "address" }],
      payable: false,
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "symbol",
      outputs: [{ name: "", type: "string" }],
      payable: false,
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { name: "_to", type: "address" },
        { name: "_value", type: "uint256" },
      ],
      name: "transfer",
      outputs: [],
      payable: false,
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { name: "_to", type: "address" },
        { name: "_amount", type: "uint256" },
        { name: "_releaseTime", type: "uint256" },
      ],
      name: "mintTimelocked",
      outputs: [{ name: "", type: "address" }],
      payable: false,
      type: "function",
    },
    {
      constant: true,
      inputs: [
        { name: "_owner", type: "address" },
        { name: "_spender", type: "address" },
      ],
      name: "allowance",
      outputs: [{ name: "remaining", type: "uint256" }],
      payable: false,
      type: "function",
    },
    {
      constant: false,
      inputs: [{ name: "newOwner", type: "address" }],
      name: "transferOwnership",
      outputs: [],
      payable: false,
      type: "function",
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, name: "to", type: "address" },
        { indexed: false, name: "value", type: "uint256" },
      ],
      name: "Mint",
      type: "event",
    },
    { anonymous: false, inputs: [], name: "MintFinished", type: "event" },
    { anonymous: false, inputs: [], name: "Pause", type: "event" },
    { anonymous: false, inputs: [], name: "Unpause", type: "event" },
    {
      anonymous: false,
      inputs: [
        { indexed: true, name: "owner", type: "address" },
        { indexed: true, name: "spender", type: "address" },
        { indexed: false, name: "value", type: "uint256" },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, name: "from", type: "address" },
        { indexed: true, name: "to", type: "address" },
        { indexed: false, name: "value", type: "uint256" },
      ],
      name: "Transfer",
      type: "event",
    },
  ];
  const address = "0xff84a3af17ffa5f5bd14e1abdb5c70f1a798f7fd";
  const contract = new web3.eth.Contract(abi, address);

  contract.getPastEvents(
    "AllEvents",
    {
      fromBlock: 0,
      toBlock: "latest",
    },
    (err, events) => {
      if (err) {
        console.log(">>>>>Error:", err);
        return;
      }
      console.log("<<<<<Events:", events);
    }
  );
}

//Task 7: Inspecting Blocks with Web3.js

function InspectTheBlocks() {
  web3.eth.getBlockNumber().then((data) => {
    console.log("Latest block number is:", data);
  });

  web3.eth.getBlock("latest").then((data) => {
    console.log("Latest block data is:", data);
  });

  web3.eth.getBlockNumber().then((latest) => {
    for (let i = 0; i < 10; i++) {
      web3.eth.getBlock(latest - i).then((data) => {
        console.log("Data @Block#" + (latest - i) + ":");
        console.log(data);
      });
    }
  });
}

//Task 8: Web3.js Utilities
function web3Utilities() {
  web3.eth.getGasPrice().then((result) => {
    console.log("Price of Gas:", web3.utils.fromWei(result, "ether"), "ethers");
  });

  console.log(
    "SHA3 encoding of string 'Dapp University':",
    web3.utils.sha3("Dapp University")
  );

  console.log(
    "Keccak256 hash of string 'Dapp University':",
    web3.utils.keccak256("Dapp University")
  );

  console.log("Randomly generated 32-bit hex:", web3.utils.randomHex(32));

  const _ = web3.utils._;
  _.each({ key1: "value1", key2: "value2" }, (value, key) => {
    console.log("Underscore utility key:", key, "value:", value);
  });
}

/*Test all tasks (call the functions)
1: checkBalanceofAccount()
2: accessContracts()
3: transferEther()
4: deploySmartContracts()
5: callingContractFunctions()
6: listAllEvents()
7: InspectTheBlocks()
8: web3Utilities()
 */
