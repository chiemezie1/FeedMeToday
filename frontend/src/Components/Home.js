import home from "./Home.css";
import Navbar from './Navbar';
import FrontPage from './FrontPage';
import OfferForm from './OfferForm';

import { useWeb3React } from '@web3-react/core';
import React, { useEffect, useState } from 'react';
import feedMeContract from "../contract/FeedMeToday.json"


function Home() {

  const { ethers } = require('ethers');
  const [contract, setContract] = useState(null);
  const { account, library: provider } = useWeb3React();

  useEffect(() => {
    initializeContract();
  }, []);

  const initializeContract = async () => {
    try {
      const signer = await provider.getSigner();
      const contractInstance = new ethers.Contract(feedMeContract.address, feedMeContract.abi, signer);
      setContract(contractInstance);
      console.log(contractInstance);
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
      const tx = await contract.makeOffer(foodChoice, amount, massage);
      console.log(tx);
    } catch (error) {
      console.log(error);
    }
  };

  const getBuyer = async () => {
    try {
      // Call the 'getBuyer' function of the contract
      const result = await contract.getBuyer(account);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const getFavoriteFoodChoices = async () => {
    try {
      // Call the 'getFavoriteFoodChoices' function of the contract
      const result = await contract.getFavoriteFoodChoices();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const addFavoriteFoodChoice = async (_foodChoice) => {
    try {
      // Call the 'addFavoriteFoodChoice' function of the contract
      const tx = await contract.addFavoriteFoodChoice(_foodChoice);
      console.log(tx);
    } catch (error) {
      console.log(error);
    }
  };

  const removeFavoriteFoodChoice = async (_index) => {
    try {
      // Call the 'removeFavoriteFoodChoice' function of the contract
      const tx = await contract.removeFavoriteFoodChoice(_index);
      console.log(tx);
    } catch (error) {
      console.log(error);
    }
  };

  const withdrawBalance = async () => {
    try {
      // Call the 'withdrawBalance' function of the contract
      const tx = await contract.withdrawBalance();
      console.log(tx);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div>
      <Navbar />
      <p className="address">{account}</p>
      <FrontPage />
      <OfferForm />
    </div>
  );
}

export default Home;
