import React, { useContext } from "react";
import PropTypes from 'prop-types';
import { BsCartDashFill } from "react-icons/bs";
import './CartItens.css';
import formatCurrency from "../../utils/formatCurrency";
import AppContext from "../../context/AppContext";

function CartItens({ data }) {
  const { cartItens, setCartItens } = useContext(AppContext);
  const { id, thumbnail, title, price } = data;

  const handleRemoveItem = () => {
    const updatedItens = cartItens.filter(item => item.id !== id);
    setCartItens(updatedItens);
  };

  return (
    <section className="cart-item">
      <img src={thumbnail} alt="Imagem do Produto" className="cart-item-image" />
      <div className="cart-item-content">
        <h3 className="cart-item-title">{title}</h3>
        <h3 className="cart-item-price">{formatCurrency(price, 'BRL')}</h3>
        <button type="button" className="button__remove-item" onClick={handleRemoveItem}>
          <BsCartDashFill />
        </button>
      </div>
    </section>
  );
}

CartItens.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default CartItens;


