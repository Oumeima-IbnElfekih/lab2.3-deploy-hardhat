// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

contract InstantPaymentHub {
    address public owner;

    mapping(address => uint256) public balances;

    event PaymentMade(
        address indexed sender,
        address indexed receiver,
        uint256 amount
    );

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can execute this");

        _;
    }

    constructor() {
        owner = msg.sender;
    }

    // Déposer de l'ether dans le contrat

    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

    // Effectuer un paiement instantané entre utilisateurs

    function instantPayment(address recipient, uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");

        balances[msg.sender] -= amount;

        balances[recipient] += amount;

        emit PaymentMade(msg.sender, recipient, amount);
    }

    // Retirer des fonds du contrat

    function withdraw(uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");

        payable(msg.sender).transfer(amount);

        balances[msg.sender] -= amount;
    }
}
