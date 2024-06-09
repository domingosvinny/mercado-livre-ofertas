import React, { useState, useContext } from "react";
import PropTypes from 'prop-types';
import { FaCartPlus } from "react-icons/fa";
import './ProductCard.css';
import formatCurrency from "../../utils/formatCurrency";
import AppContext from "../../context/AppContext";

function ProductCard({ data }) {
    const { title, thumbnail, price, id, attributes } = data;
    const { cartItens, setCartItens } = useContext(AppContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [productDescription, setProductDescription] = useState("");
    const [productAttributes, setProductAttributes] = useState(attributes);

    const handleAddCart = () => {
        setCartItens([...cartItens, data]);
        handleCloseModal();
    };

    const handleShowModal = async () => {
        try {
            const descriptionResponse = await fetch(`https://api.mercadolibre.com/items/${id}/description`);
            if (!descriptionResponse.ok) {
                throw new Error(`HTTP error! status: ${descriptionResponse.status}`);
            }
            const descriptionData = await descriptionResponse.json();
            setProductDescription(descriptionData.plain_text);

            const productResponse = await fetch(`https://api.mercadolibre.com/items/${id}`);
            if (!productResponse.ok) {
                throw new Error(`HTTP error! status: ${productResponse.status}`);
            }
            const productData = await productResponse.json();
            setProductAttributes(productData.attributes);

            setModalVisible(true);
        } catch (err) {
            console.error(err.message);
        }
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const handleBuy = () => {
        window.open('https://www.mercadolivre.com/jms/mlb/lgz/msl/login/H4sIAAAAAAAEAzWNQQ7DIAwE_-JzlNw59iPICYagmoDAKa2q_L2mao87nl2_gXOIh5VXITDgyOPJAhMURvG5Jhud8lQUtSj0i7wOBSsmEqoNzHvsBHI30tJY8siNVMJTdus5d2XfV8pis_TU3oFsO62PSOP6b4SsYRcpzSxL731OVDd0uWDI85bTvFa4JtWbWKm43cFIPen6AN5uNinLAAAA/user', '_blank');
    };

    return (
        <section className="product-card">
            <img
                src={thumbnail.replace(/\w\.jpg/gi, "W.jpg")}
                alt="product"
                className="card__image"
                onClick={handleShowModal}
            />
            <div className="card__infos" onClick={handleShowModal}>
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

            {modalVisible && (
                <div className="modal1">
                    <div className="modal1-content">
                        <span className="close1" onClick={handleCloseModal}>&times;</span>
                        <h1 className="modal1-title">{title}</h1>
                        <img src={thumbnail.replace(/\w\.jpg/gi, "W.jpg")} alt={title} className="modal1-image" />
                        <p className="modal1-info">Preço: {formatCurrency(price, 'BRL')}</p>
                        {productDescription && <p className="modal1-description">{productDescription}</p>}
                        {productAttributes && productAttributes.length > 0 && (
                            <ul className="attributes-list">
                                {productAttributes.map((attribute, index) => (
                                    <li key={index} className="attribute-item">
                                        <span className="attribute-name">{attribute.name}:</span>
                                        <span className="attribute-value">{attribute.value_name}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                        <div className="modal1-buttons">
                            <button className="modal1-btn-closer" onClick={handleCloseModal}>Fechar</button>
                            <button className="modal1-btn-addCart" onClick={handleAddCart}>Adicionar ao carrinho</button>
                            <button className="modal1-btn-buy" onClick={handleBuy}>Comprar</button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

ProductCard.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        thumbnail: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        attributes: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string,
            value_name: PropTypes.string,
        })).isRequired,
    }).isRequired,
};

export default ProductCard;
