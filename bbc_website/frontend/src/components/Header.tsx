import React from "react";
import logo from "../logo.png";

// Define a type for props (if necessary for future extensions, e.g., passing className)
interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <div className={`header ${className}`}>
      <img className="logo" src={logo} alt="logo" />
      <h1 className="title">The DADU Doctor</h1>
    </div>
  );
};

export default Header;
