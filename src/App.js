import React from "react";
import Header from "./components/Header/Header";
import Products from "./components/Products/Products";
import Provider from "./context/Provider";
import Cart from "./components/Cart/Cart";
import Ofertas from "./components/Ofertas/Ofertas";
import Baseboard from "./components/Baseboard/Baseboard";




function App() {
  return (
    <Provider>

      <Header/>
      <Ofertas/>
      <Products/>
      <Cart/>

      <Baseboard/>
    </Provider>
    
  );
}

export default App;
