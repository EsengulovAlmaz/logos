import React, { useEffect } from 'react';
import Card from '../../components/Card/Card';
import instance from '../../utils/axios';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { menuData } from '../../utils/menuData';

import "./Catalog.scss";

const Catalog = () => {
  const [products, setProducts] = React.useState([]);
  const { category } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    instance.get(`/products?${category !== "all" ? "categories=" + category : ""}`)
      .then(res => setProducts(res.data))
      .catch(err => console.log(err))
  }, [category]);

  return (
    <div className="catalog">
      <div className="container">
        <div className="catalog__content">
          <aside className="catalog__aside">
            <label className="catalog__aside-label">
              <select onChange={e => navigate(`/catalog/${e.target.value}`)} name="" id="" className="catalog__aside-select">
                <option selected={category === "all"} value="all">Все категории</option>
                {
                  menuData.map(item => (
                    <option selected={item.en === category} className="form__select-option" key={item.en} value={item.en}>{item.ru}</option>
                  ))
                }
              </select>
            </label>
          </aside>
          <div className="catalog__right">
            <h2 className="catalog__crums">
              <Link to="/">Главная</Link> / {
                category !== "all" ? menuData.find(item => item.en === category).ru : "Все продукты"
              }
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