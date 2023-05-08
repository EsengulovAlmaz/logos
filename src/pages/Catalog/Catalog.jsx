import React, { useEffect } from 'react';
import Card from '../../components/Card/Card';
import instance from '../../utils/axios';
import { Link, useLocation, useParams } from 'react-router-dom';
import { menuData } from '../../utils/menuData';

import "./Catalog.scss";

const Catalog = () => {
  const [products, setProducts] = React.useState([]);
  const { category } = useParams();

  useEffect(() => {
    instance.get(`/products?categories=${category}`)
      .then(res => setProducts(res.data))
      .catch(err => console.log(err))
  }, []);

  return (
    <div className="catalog">
      <div className="container">
        <div className="catalog__content">
          <aside className="catalog__aside">

          </aside>
          <div className="catalog__right">
            <h2 className="catalog__crums">
              <Link to="/">Главная</Link> / {menuData.find(item => item.en === category).ru}
            </h2>
            <div className="catalog__row">
              {
                products.map(item => (
                  <Card key={item.id} item={item} />
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Catalog;