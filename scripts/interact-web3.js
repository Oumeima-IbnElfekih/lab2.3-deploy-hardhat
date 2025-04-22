const { Web3 } = require('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const { abi } = require('../artifacts/contracts/InstantPaymentHub.sol/InstantPaymentHub.json'); // L'ABI du contrat
require("dotenv").config();
const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL;
const PRIVATE_KEY = process.env.YOUR_PRIVATE_KEY; // Replace with your private key

async function main() {
  // Use HDWalletProvider to connect to Sepolia
  const provider = new HDWalletProvider(PRIVATE_KEY, SEPOLIA_RPC_URL);
  const web3 = new Web3(provider);

  const contractAddress = "0x34f4e051D469D09018Bd260481DeE009837ffBf2"; // Replace with your deployed contract address

  const accounts = await web3.eth.getAccounts();
  console.log("Adresse du compte :", accounts[0]); // Display the account address

  const contract = new web3.eth.Contract(abi, contractAddress);

  // Deposit Ether into the contract
  await contract.methods.deposit().send({ from: accounts[0], value: web3.utils.toWei('1', 'ether') });
  console.log("1 Ether déposé dans le contrat");

  // Perform an instant payment
  const recipient = "0x68e0A29b4f1867A1C58e2F979F4Ec28118f39E79"; // Replace with recipient address
  await contract.methods.instantPayment(recipient, web3.utils.toWei('0.5', 'ether')).send({ from: accounts[0] });
  console.log("0.5 Ether payé à", recipient);

  // Withdraw Ether from the contract
  await contract.methods.withdraw(web3.utils.toWei('0.2', 'ether')).send({ from: accounts[0] });
  console.log("0.2 Ether retiré du contrat");

  provider.engine.stop(); // Stop the provider engine
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
