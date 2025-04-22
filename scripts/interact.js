const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  const contractAddress = "0x34f4e051D469D09018Bd260481DeE009837ffBf2"; // Replace with your deployed contract address

  const contract = await ethers.getContractAt("InstantPaymentHub", contractAddress);

  // Deposit Ether into the contract
  const depositTx = await contract.deposit({ value: ethers.parseEther("0.001") }); // Deposit 0.001 Ether
  await depositTx.wait();
  console.log("0.001 Ether deposited into the contract");

  // Perform an instant payment
  const recipient = "0x68e0A29b4f1867A1C58e2F979F4Ec28118f39E79"; // Replace with recipient address
  const paymentTx = await contract.instantPayment(recipient, ethers.parseEther("0.001"));
  await paymentTx.wait();
  console.log("0.001 Ether paid to", recipient);

  // Withdraw Ether from the contract
  const withdrawTx = await contract.withdraw(ethers.parseEther("0.001"));
  await withdrawTx.wait();
  console.log("0.001 Ether withdrawn from the contract");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });