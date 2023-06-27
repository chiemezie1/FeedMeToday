import './OfferForm.css';
import React, { useState, useEffect } from 'react';
import { useWeb3React } from "@web3-react/core";
import  contract  from "../contract/FeedMeToday.json";
const { ethers } = require("ethers");

function OfferForm() {
  const [foodChoice, setFoodChoice] = useState('');
  const [amount, setAmount] = useState(0);
  const [massage, setMassage] = useState('');
  const { active, library: provider } = useWeb3React();

  // async function handleSubmit(event) {
  //   event.preventDefault();
  //   try {
  //     const signer = provider.getSigner();
  //     const contractInstance = new ethers.Contract(contract.address, contract.abi, signer);
  //     await contractInstance.makeOffer(foodChoice, amount, massage);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  async function handleSubmit(event) {
    event.preventDefault();
    if (active) {
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract(contract.address, contract.abi, signer);
      try {
        await contractInstance.makeOffer(foodChoice, amount, massage);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Please install MetaMask");
    }
  }

  return (
    <div className="container_OfferForm">
      <form className="offer-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="foodChoice">Food Choice:</label>
            <input
              type="text"
              id="foodChoice"
              value={foodChoice}
              onChange={(event) => setFoodChoice(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="amount">Amount:</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(event) => setAmount(Number(event.target.value))}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="massage">Massage:</label>
            <input
              type="text"
              id="massage"
              value={massage}
              onChange={(event) => setMassage(event.target.value)}
            />
          </div>
          <div className="form-group">
            <button type="submit">Make Offer</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default OfferForm;
