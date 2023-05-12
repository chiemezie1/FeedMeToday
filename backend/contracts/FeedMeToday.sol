// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract FeedMeToday {
    address public owner;
    uint internal maxBuyersPerDay = 3;
    uint internal totalBuyers;
    uint internal daycount;
    uint public lastResetTimestamp; 

    struct Buyer {
        address buyerAddress;
        uint amount;
        string foodChoice;
        string massage;
    }

    mapping(address => Buyer) public buyers;
    mapping(uint => mapping(uint => address)) public dailyBuyers;

    string[] public favoriteFoodChoices;

    event OfferMade(address buyerAddress, uint amount, string foodChoice, string massage);

    constructor() {
        owner = msg.sender;
        lastResetTimestamp = block.timestamp; 
    }
        modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the contract owner");
        _;
    }

  // Function to allow users to make an offer to buy you food
    function makeOffer(string memory foodChoice, uint amount, string memory massage) public payable {
        resetDayIfNecessary();
        require(totalBuyers < maxBuyersPerDay, "Thanks You... Maximum number of buyers reached for the day");
        require(msg.value > 0, "Invalid payment amount");

        buyers[msg.sender] = Buyer(msg.sender, amount, foodChoice, massage);
        dailyBuyers[daycount][totalBuyers] = msg.sender;
        totalBuyers++;

        emit OfferMade(msg.sender, msg.value, foodChoice, massage);
    }

    function getListOfDayBuyer() public view returns (address[] memory) {
        address[] memory buyersForDay = new address[](maxBuyersPerDay);

        for (uint i = 0; i < maxBuyersPerDay; i++) {
            buyersForDay[i] = dailyBuyers[daycount][i];
        }
        return buyersForDay;
    }

    // Function to retrieve the details of a specific buyer by address
    function getBuyer(address buyerAddress) public view returns (address, string memory, string memory) {
        require(buyers[buyerAddress].buyerAddress != address(0), "Invalid buyer address");

        Buyer storage buyer = buyers[buyerAddress];
        return (buyer.buyerAddress, buyer.foodChoice, buyer.massage);
    }

    // Function to retrieve the list of your favorite food choices
    function getFavoriteFoodChoices() public view returns (string[] memory) {
        return favoriteFoodChoices;
    }

    // Function to add a favorite food choice to the list
    function addFavoriteFoodChoice(string calldata foodChoice) public onlyOwner {
        favoriteFoodChoices.push(foodChoice);
    }

    // Function to remove a favorite food choice from the list
    function removeFavoriteFoodChoice(uint index) public onlyOwner {
        require(index < favoriteFoodChoices.length, "Invalid favorite food choice index");

        favoriteFoodChoices[index] = favoriteFoodChoices[favoriteFoodChoices.length - 1];
        favoriteFoodChoices.pop();
    }

    // Function to withdraw the contract's balance
    function withdrawBalance() public onlyOwner {
        uint balance = address(this).balance;
        require(balance > 0, "No balance to withdraw");

        payable(owner).transfer(balance);
    }

    // Internal function to reset the day count if 24 hours have passed
    function resetDayIfNecessary() internal {
        if (block.timestamp - lastResetTimestamp >= 24 hours) {
            daycount++;
            totalBuyers = 0;
            lastResetTimestamp = block.timestamp;
        }
    }
}