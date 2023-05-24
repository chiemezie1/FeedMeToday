import navbar from "./Navbar.css";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isConnected, setIsConnected] = useState(false);

  const handleClick = () => {
    setIsConnected(!isConnected);
  };

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
            <div className={`connect ${isConnected ? 'green' : 'red'}`} onClick={handleClick}>
              Connect
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
