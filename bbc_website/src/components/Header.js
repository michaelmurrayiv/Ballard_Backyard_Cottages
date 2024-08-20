import React from "react";
import logo from "./logo.png";

function Header() {
  return (
    <div className="header">
      <img className="logo" src={logo} alt="logo"></img>
      <h1 className="title">The DADU Doctor</h1>
    </div>
  );
}

export default Header;
