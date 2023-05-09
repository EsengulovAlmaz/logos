import React from 'react';
import { Link } from 'react-router-dom';
import Title from '../../components/Title/Title';
import { customContext } from '../../utils/Context';

import "./Basket.scss";
import BasketTotal from '../../components/BasketTotals/BasketTotals';

const Basket = () => {
  const { basket, plusOneBasket, minusOneBasket, delBasket } = React.useContext(customContext);

  return (
    <section className="basket">
      <div className="container">
        <Link to="/catalog">К выбору блюда</Link>
        <div className="basket__top">
          <Title title="КОРЗИНА" />
          <p className="basket__count">(В корзине {basket.length} товара)</p>
        </div>

        <ul className="basket__list">
          {basket.map(item => (
            <li key={item.id} className="basket__item">
              {item.title}

              <div className="basket__item-right">
                <div className="basket__item-count">
                  <button onClick={() => minusOneBasket(item.id)} className="basket__item-minus">-</button>
                  <span className="basket__item-num">
                    {item.count}
                  </span>
                  <button onClick={() => plusOneBasket(item.id)} className="basket__item-plus">+</button>
                </div>
                <p className="basket__item-price">{item.price * item.count}</p>
                <button onClick={() => delBasket(item.id)} className="basket__item-del">Х</button>
              </div>
            </li>
          ))}
        </ul>

        <BasketTotal />
      </div>
    </section>
  )
};

export default Basket;