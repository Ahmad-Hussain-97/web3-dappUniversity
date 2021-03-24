const Web3 = require("web3");
const rpcURL = "https://ropsten.infura.io/v3/22f1231065ad4fef9893bc29f17f9e23";
const web3 = new Web3(rpcURL);
var Tx = require("ethereumjs-tx");

//Task 1: Connect and check account balance
function checkAccountBalance() {
  const account_address = "0x657ABc323D94452ca8c79F8c36AC69440681ab89";
  web3.eth.getBalance(account_address, (err, wei) => {
    if (err) {
      console.log("Error while checking balance:", err);
    } else {
      balance = web3.utils.fromWei(wei, "ether");
      console.log("Account balance retrieved:", balance);
    }
  });
}
