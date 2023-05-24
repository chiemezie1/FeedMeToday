import navbar from "./Navbar.css";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ConnectButton() {
  const [isConnected, setIsConnected] = useState(false);

  const connectWebsite = async () => {
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    if (chainId !== "0x13881") {
      alert("Incorrect network! Switch your MetaMask network to Polygon Mumbai testnet");
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x13881" }],
      });
      return;
    }
    await window.ethereum.request({ method: "eth_requestAccounts" }).then(() => {
      setAddress();
      setIsConnected(!isConnected);
      window.location.replace(location.pathname);
    });
  };

  return (
    <div className="navbar">
      <div className={`connect ${isConnected ? 'green' : 'red'}`} onClick={connectWebsite}>
        Connect
      </div>
    </div>
  );
}

export default ConnectButton;

