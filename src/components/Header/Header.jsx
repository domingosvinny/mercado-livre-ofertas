import React from "react";
import SearchBarra from '../SearchBarra/SearchBarra';
import "./Header.css";
import CartButton from "../Buttons/CartButton";

function Header (){
  return (
    <header className="header">
     <div className="container">
     
     <SearchBarra/>
     <CartButton />


     </div>
      </header>
  );
}

export default Header;