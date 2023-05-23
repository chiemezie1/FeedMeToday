import navbar from "./Navbar.css";
import React from 'react';

function Navbar() {
  return (
    <div className = "navbar" >
      <nav >
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/connect">Connect</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
