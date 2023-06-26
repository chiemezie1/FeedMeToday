import home from "./Home.css";
import React from 'react';
import Navbar from './Navbar';
import FrontPage from './FrontPage';
import OfferForm from './OfferForm';
import { useWeb3React } from "@web3-react/core"

function Home() {
  const { account } = useWeb3React();
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
