import React, { useContext } from "react";
import { BsCart3 } from "react-icons/bs";
import "./CartButton.css";
import AppContext from "../../context/AppContext";

function CartButton ( ) {

    const {cartItens, isCartVisible, setIsCartVisible} = useContext(AppContext);

    return (
        <button 
        type="button" 
        className="cart_button"
        onClick={ () => setIsCartVisible( ! isCartVisible)}
        >
            < BsCart3/>
            {cartItens.length > 0 && <span className="cart-status">{cartItens.length} </span>}
        </button>
    )
}

export default CartButton;