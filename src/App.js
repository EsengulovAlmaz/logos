import React from 'react';
import { Route, Routes } from "react-router-dom";
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Layout from './components/Layout/Layout';
import Login from './pages/Login/Login';
import Sales from './pages/Sales/Sales';
import Delivery from './pages/Delivery/Delivery';
import Catalog from './pages/Catalog/Catalog';
import Product from './pages/Product/Product';
import AddProduct from './pages/AddProduct/AddProduct';
import Basket from './pages/Basket/Basket';

import "./styles.scss";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={""} element={<Layout />}>
          <Route path={"/"} element={<Home />} />
          <Route path={"/sales"} element={<Sales />} />
          <Route path={"/delivery"} element={<Delivery />} />
          <Route path={"/catalog/:category"} element={<Catalog />} />
          <Route path={"/product/:id"} element={<Product />} />
          <Route path={"/product/add"} element={<AddProduct />} />
          <Route path={"/basket"} element={<Basket />} />
        </Route>
        <Route path={"register"} element={<Register />} />
        <Route path={"login"} element={<Login />} />
      </Routes>
    </div>
  )
}

export default App;
