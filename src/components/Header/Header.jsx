import React from "react";
import SearchBarra from '../SearchBarra/SearchBarra';
import "./Header.css";
import CartButton from "../Buttons/CartButton";
import Logo from '../../Logo/logo11.png';

function Header (){
  return (
    <header className="header">
     <div className="container">
     <img src={Logo} alt="Logo" className="logo" />
     
     <SearchBarra/>
     <CartButton />


     </div>
      </header>
  );
}

export default Header;