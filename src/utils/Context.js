import React from "react";
import instance from "./axios";

export const customContext = React.createContext();

export const Context = ({ children }) => {
  const [products, setProducts] = React.useState([]);
  const [user, setUser] = React.useState({
    email: ""
  });

  React.useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  const getAllProducts = () => {
    instance.get('http://localhost:8080/products')
      .then(({ data }) => setProducts(data))
      .catch((err) => console.log(err))
  }

  const value = {
    user,
    setUser,
    products,
    setProducts,
    getAllProducts
  };


  return (
    <customContext.Provider value={value}>
      {children}
    </customContext.Provider>
  )
};