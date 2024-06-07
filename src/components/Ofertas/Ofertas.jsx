import React, { useState, useEffect } from "react";
import './Ofertas.css';
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import formatCurrency from "../../utils/formatCurrency";


function Ofertas() {
  const [ofertas, setOfertas] = useState([]);
  const [groupIndex, setGroupIndex] = useState(0);
  const groupSize = 5;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <section className="ofertas">
      <div className="ofertas-container">
        <h1 className="title-season">Ofertas do Dia</h1>
        <div className="ofertas-list">
          {ofertas.slice(groupIndex * groupSize, (groupIndex + 1) * groupSize).map((oferta, index) => (
            <div key={index} className="oferta-group">
              <img src={oferta.thumbnail.replace(/\w\.jpg/gi, "W.jpg")} alt={oferta.title} 
              className="oferta-image"/>
              <h2 className="oferta-price">{formatCurrency(oferta.price, 'BRL')}</h2>
              <h3 className="oferta-title">{oferta.title}</h3>
            </div>
          ))}
        </div>
      </div>
      <div className="icon-container">
        <FaAngleLeft className="icone-less" onClick={handleShowLess} />
        <FaAngleRight className="icone-more" onClick={handleShowMore} />
      </div>
    </section>
  );
}

export default Ofertas;




