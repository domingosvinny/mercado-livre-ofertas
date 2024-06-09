import React, { useState, useEffect, useContext } from "react";
import './Ofertas.css';
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import formatCurrency from "../../utils/formatCurrency";
import { BsFillCartPlusFill } from "react-icons/bs";
import AppContext from "../../context/AppContext";

function Ofertas() {
  const { cartItens, setCartItens } = useContext(AppContext);
  const [ofertas, setOfertas] = useState([]);
  const [groupIndex, setGroupIndex] = useState(0);
  const groupSize = 5;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchOfertas = async () => {
      try {
        const query = 'ofertas do dia';
        const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setOfertas(data.results);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOfertas();
  }, []);

  const handleAddCart = (oferta) => {
    setCartItens([...cartItens, oferta]);
    handleCloseModal(); // Fechar o modal após adicionar o produto ao carrinho
  };

  const handleProductClick = async (id) => {
    setLoading(true);
    try {
      const productResponse = await fetch(`https://api.mercadolibre.com/items/${id}`);
      if (!productResponse.ok) {
        throw new Error(`HTTP error! status: ${productResponse.status}`);
      }
      const productData = await productResponse.json();

      const descriptionResponse = await fetch(`https://api.mercadolibre.com/items/${id}/description`);
      if (!descriptionResponse.ok) {
        throw new Error(`HTTP error! status: ${descriptionResponse.status}`);
      }
      const descriptionData = await descriptionResponse.json();

      setSelectedProduct({ ...productData, description: descriptionData.plain_text });
      setModalVisible(true);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  };

  if (loading) {
    return (
      <section className="ofertas">
        <p>Carregando ofertas...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="ofertas">
        <p>Erro ao carregar ofertas: {error}</p>
      </section>
    );
  }

  const handleShowMore = () => {
    setGroupIndex((prevIndex) => (prevIndex + 1) % Math.ceil(ofertas.length / groupSize));
  };

  const handleShowLess = () => {
    setGroupIndex((prevIndex) => (prevIndex - 1 + Math.ceil(ofertas.length / groupSize)) % Math.ceil(ofertas.length / groupSize));
  };

  const handleBuy = () => {
    window.open('https://www.mercadolivre.com/jms/mlb/lgz/msl/login/H4sIAAAAAAAEAzWNQQ7DIAwE_-JzlNw59iPICYagmoDAKa2q_L2mao87nl2_gXOIh5VXITDgyOPJAhMURvG5Jhud8lQUtSj0i7wOBSsmEqoNzHvsBHI30tJY8siNVMJTdus5d2XfV8pis_TU3oFsO62PSOP6b4SsYRcpzSxL731OVDd0uWDI85bTvFa4JtWbWKm43cFIPen6AN5uNinLAAAA/user', '_blank');
  };

  const handleReturn = () => {
    setModalVisible(false);
  };

  return (
    <section className="ofertas">
      <div className="ofertas-container">
        <h1 className="title-season">Ofertas do Dia</h1>
        <div className="ofertas-list">
          {ofertas.slice(groupIndex * groupSize, (groupIndex + 1) * groupSize).map((oferta, index) => (
            <div key={index} className="oferta-group" onClick={() => handleProductClick(oferta.id)}>
              <img src={oferta.thumbnail.replace(/\w\.jpg/gi, "W.jpg")} alt={oferta.title} className="oferta-image" />
              <h2 className="oferta-price">{formatCurrency(oferta.price, 'BRL')}</h2>
              <h3 className="oferta-title">{oferta.title}</h3>
              <button type="button" className="button--add-cart1" onClick={(e) => { e.stopPropagation(); handleAddCart(oferta); }}>
                <BsFillCartPlusFill />
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="icon-container">
        <FaAngleLeft className="icone-less" onClick={handleShowLess} />
        <FaAngleRight className="icone-more" onClick={handleShowMore} />
      </div>
      {modalVisible && selectedProduct && (
  <div className="modal">
    <div className="modal-content">
      <span className="close" onClick={handleCloseModal}>&times;</span>
      <h1 className="modal-title">{selectedProduct.title}</h1>
      <img src={selectedProduct.pictures[0]?.url} alt={selectedProduct.title} className="modal-image" />
      <p className="modal-info">ID: {selectedProduct.id}</p>
      <p className="modal-info">Preço: {formatCurrency(selectedProduct.price, 'BRL')}</p>
      <div className="modal-description">{selectedProduct.description}</div>
      {selectedProduct.attributes && (
        <ul className="attributes-list">
          {selectedProduct.attributes.map((attr, index) => (
            <li key={index} className="attribute-item">
              <span className="attribute-name">{attr.name}: </span>
              <span className="attribute-value">{attr.value_name}</span>
            </li>
          ))}
        </ul>
      )}
      <div className="modal-buttons">
        <button className="modal-btn-closer" onClick={handleReturn}>Voltar ao site</button>
        <button className="modal-btn-addCart" onClick={() => handleAddCart(selectedProduct)}>Adicionar ao carrinho</button>
        <button className="modal-btn-buy" onClick={handleBuy}>Comprar</button>
      </div>
    </div>
  </div>
)}
    </section>
  );
}

export default Ofertas;
