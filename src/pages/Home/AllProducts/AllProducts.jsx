import React from 'react';
import ProductsFilter from '../../../components/ProductsFilter/ProductsFilter';
import { useNavigate } from 'react-router-dom';
import { menuData } from '../../../utils/menuData';
import { customContext } from '../../../utils/Context';

import "./Products.scss";

const AllProducts = () => {
  const navigate = useNavigate();
  const { getAllProducts } = React.useContext(customContext);

  React.useEffect(() => {
    getAllProducts()
  }, [])


  return (
    <section className="products">
      <ul className="products__list">
        {
          menuData.map(item => (
            <li
              onClick={() => navigate(`/catalog/${item.en}`)}
              className="products__item"
              key={item.en}
            >
              {item.ru}
            </li>
          ))
        }
      </ul>
      <ProductsFilter title="Холодные напитки" />
      <ProductsFilter title="Горячие закуски" />
      <ProductsFilter title="Мясные блюда" />
    </section>
  )
};

export default AllProducts;