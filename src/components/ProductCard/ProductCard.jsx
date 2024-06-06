import React, { useContext } from "react";
import propTypes from 'prop-types';

import { FaCartPlus } from "react-icons/fa";
import './ProductCard.css'
import formatCurrency from "../../utils/formatCurrency";
import AppContext from "../../context/AppContext";

function ProductCard({data}) {

    const {title, thumbnail, price} = data;
    const {cartItens,setCartItens} = useContext(AppContext);

    const handleAddCart = () => setCartItens([ ...cartItens, data ]);

    /* ou 
    
          const handleAddCart = () =>{
          const updatedCartItens = cartItens;

          updatedCartItens.push(data);

          setCartItens(updatedCartItens); */

    

    return(
        <section className="product-card">
        
        <img 
        src={thumbnail.replace(/\w\.jpg/gi, "W.jpg")} // Substitui todas as ocorrências de ".jpg" na string `thumbnail` por "W.jpg" antes de ser atribuída ao atributo `src` de uma tag `<img>. Para melhorar a qualidade e a exibição da foto.`
        alt="product" 
        className="card__image"/>

        <div  className="card__infos">
            <h2 className="card__price">{formatCurrency(price, 'BRL')}</h2>
            <h2 className="card__title">{title}</h2>
        </div>

        <button 
        type="button" 
        className="button__add-cart"
        onClick={handleAddCart}
        >
           <FaCartPlus />
        </button>
        </section>

    );
}


export default ProductCard;

ProductCard.propTypes = {
    data: propTypes.shape({})
}.isRequired;