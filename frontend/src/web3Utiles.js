import React, { useEffect, useState } from 'react';
import feedMeContract from './contracts/FeedMeToday.json';

const ContractPage = () => {
    const {account, library: provider } = useWeb3React();
  const [contract, setContract] = useState(null);

  useEffect(() => {
    initializeContract();
  }, []);

  const initializeContract = async () => {
    try {
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract(feedMeContract.address, feedMeContract.abi, signer);
      setContract(contractInstance);
    } catch (error) {
      console.log(error);
    }
  };


  const makeOffer = async (_foodChoice, _amount, _massage) => {
    try {
      // Call the 'makeOffer' function of the contract
      const tx = await contract.methods.makeOffer(_foodChoice, _amount, _massage).send({ from: window.ethereum.selectedAddress });
      console.log(tx);
    } catch (error) {
      console.log(error);
    }
  };

  const getBuyer = async () => {
    try {
      // Call the 'getBuyer' function of the contract
      const result = await contract.methods.getBuyer(account).call();
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

  const addFavoriteFoodChoice = async (_foodChoice) => {
    try {
      // Call the 'addFavoriteFoodChoice' function of the contract
      const tx = await contract.methods.addFavoriteFoodChoice(_foodChoice).send({ from: window.ethereum.selectedAddress });
      console.log(tx);
    } catch (error) {
      console.log(error);
    }
  };

  const removeFavoriteFoodChoice = async (_index) => {
    try {
      // Call the 'removeFavoriteFoodChoice' function of the contract
      const tx = await contract.methods.removeFavoriteFoodChoice(_index).send({ from: window.ethereum.selectedAddress });
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
