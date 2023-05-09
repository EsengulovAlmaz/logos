import React from "react";
import instance from "./axios";

export const customContext = React.createContext();

export const Context = ({ children }) => {
  const [products, setProducts] = React.useState([]);
  const [basket, setBasket] = React.useState([]);
  const [user, setUser] = React.useState({
    email: ""
  });

  React.useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }

    if (localStorage.getItem("basket")) {
      setBasket(JSON.parse(localStorage.getItem("basket")))
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(basket));
  }, [basket])

  const getAllProducts = () => {
    instance.get('http://localhost:8080/products')
      .then(({ data }) => setProducts(data))
      .catch((err) => console.log(err))
  }

  const addBasket = (product) => {
    setBasket(prev => [...prev, {
      ...product,
      count: 1
    }]);
  }

  const plusOneBasket = (id) => {
    setBasket(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, count: item.count + 1 };
      } else {
        return item;
      }
    })
    )
  }

  const delBasket = (id) => {
    setBasket(prev => prev.filter(item => item.id !== id));
  }

  const minusOneBasket = (id) => {
    let count = basket.find(item => item.id === id).count;

    if (count === 1) {
      setBasket(prev => prev.filter(item => item.id !== id))
    } else {
      setBasket(prev => prev.map(item => {
        if (item.id === id) {
          return { ...item, count: item.count - 1 };
        } else {
          return item;
        }
      })
      )
    }
  }

  const value = {
    user,
    setUser,
    products,
    setProducts,
    getAllProducts,
    basket,
    addBasket,
    plusOneBasket,
    minusOneBasket,
    delBasket
  };


  return (
    <customContext.Provider value={value}>
      {children}
    </customContext.Provider>
  )
};