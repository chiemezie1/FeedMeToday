import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import feedMeContractABI from './contracts/FeedMeToday.json';

const ContractPage = () => {
  const [contract, setContract] = useState(null);

  useEffect(() => {
    initializeContract();
  }, []);

  const initializeContract = async () => {
    try {
      const web3 = new Web3(window.ethereum);
      const networkId = await web3.eth.net.getId();
      const contractAddress = feedMeContractABI.networks[networkId].address;
      const contractInstance = new web3.eth.Contract(feedMeContractABI.abi, contractAddress);
      setContract(contractInstance);
    } catch (error) {
      console.log(error);
    }
  };

  const makeOffer = async () => {
    try {
      // Call the 'makeOffer' function of the contract
      const foodChoice = 'Pizza';
      const amount = 1;
      const massage = 'Please deliver to my address.';
      const tx = await contract.methods.makeOffer(foodChoice, amount, massage).send({ from: window.ethereum.selectedAddress });
      console.log(tx);
    } catch (error) {
      console.log(error);
    }
  };

  const getBuyer = async () => {
    try {
      // Call the 'getBuyer' function of the contract
      const buyerAddress = window.ethereum.selectedAddress;
      const result = await contract.methods.getBuyer(buyerAddress).call();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const getFavoriteFoodChoices = async () => {
    try {
      // Call the 'getFavoriteFoodChoices' function of the contract
      const result = await contract.methods.getFavoriteFoodChoices().call();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const addFavoriteFoodChoice = async () => {
    try {
      // Call the 'addFavoriteFoodChoice' function of the contract
      const foodChoice = 'Sushi';
      const tx = await contract.methods.addFavoriteFoodChoice(foodChoice).send({ from: window.ethereum.selectedAddress });
      console.log(tx);
    } catch (error) {
      console.log(error);
    }
  };

  const removeFavoriteFoodChoice = async () => {
    try {
      // Call the 'removeFavoriteFoodChoice' function of the contract
      const index = 0;
      const tx = await contract.methods.removeFavoriteFoodChoice(index).send({ from: window.ethereum.selectedAddress });
      console.log(tx);
    } catch (error) {
      console.log(error);
    }
  };

  const withdrawBalance = async () => {
    try {
      // Call the 'withdrawBalance' function of the contract
      const tx = await contract.methods.withdrawBalance().send({ from: window.ethereum.selectedAddress });
      console.log(tx);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>FeedMeToday Contract Page</h1>
      <button onClick={makeOffer}>Make Offer</button>
      <button onClick={getBuyer}>Get Buyer</button>
      <button onClick={getFavoriteFoodChoices}>Get Favorite Food Choices</button>
      <button onClick={addFavoriteFoodChoice}>Add Favorite Food Choice</button>
      <button onClick={removeFavoriteFoodChoice}>Remove Favorite Food Choice</button>
      <button onClick={withdrawBalance}>Withdraw Balance</button>
    </div>
  );
};

export default ContractPage;
