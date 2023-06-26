import navbar from "./Navbar.css";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";

export const injected = new InjectedConnector();

function Navbar() {
  const [isConnected, setIsConnected] = useState(false);
  const { active, activate, deactivate, chainId, account, library: provider } = useWeb3React();

  async function connect() {
    if (typeof window.ethereum !== "undefined") {
      try {
        await activate(injected);
        if (active && account) {
          localStorage.setItem("connectedAccount", account);
        }
      } catch (e) {
        console.log("Please install MetaMask" + e);
      }
    }
  }

  return (
    <div className="navbar">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <div className={`connect ${activate ? 'green' : 'red'}`} onClick={connect}>
              Connect
            </div>
            <p>{account}</p>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
