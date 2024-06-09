import React, {useState, useContext} from "react";
import { BsSearch } from "react-icons/bs";
import "./SearchBarra.css";
import fetchProducts from '../../api/fetchProducts';
import AppContext from "../../context/AppContext";


function SearchBarra(){

  const  {setProducts, setLoading} = useContext(AppContext);
  const [searchValue, setSearchValue] = useState('');


  const handleSearch = async(event) => {
    event.preventDefault();
    setLoading(true);
    
    const products = await fetchProducts(searchValue);

    setProducts(products);
    setLoading(false);
    setSearchValue('');
  };

   
    return(
        <form className="search-barra" onSubmit={handleSearch}>
          {name}
      <input
      type="search"
      value={searchValue}
      placeholder="Buscar Produtos"
      onChange={({target}) => setSearchValue(target.value)}
      className="search_input"
      required
      />
      
      <button type="submit" className="search_button">
        <BsSearch />
      </button>
      </form>
    );
}

export default SearchBarra;