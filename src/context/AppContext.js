import React, { createContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [cartItens, setCartItens] = useState([]);
  const [isCartVisible, setCartVisible] = useState(false);

  return (
    <AppContext.Provider value={{ cartItens, setCartItens, isCartVisible, setCartVisible }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
