import React from 'react';
import { BsCart3 } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { customContext } from '../../utils/Context';

const Card = ({ item }) => {
  const { addBasket, basket, plusOneBasket, minusOneBasket } = React.useContext(customContext);
  const navigate = useNavigate();


  return (
    <div className="products__card">
      <img
        onClick={() => navigate(`/product/${item.id}`)}
        src={item.image}
        alt={item.title}
        className="products__card-img"
      />
      <div className="products__card-info">
        <div className="products__card-name">
          <h3 className="products__card-title">
            {item.title}
          </h3>
          <p className="products__card-weight">
            Вес: {item.weight} г
          </p>
        </div>
        <p className="products__card-desc">
          {item.description}
        </p>

        {
          basket.findIndex(product => product.id === item.id) > -1
            ? <div className="products__card-buy">
              <button onClick={() => minusOneBasket(item.id)} type="button" className="products__card-btn header__btn">
                -
                <span></span>
              </button>
              <p className="products__card-price">
                {item.price} ₽
              </p>
              <button onClick={() => plusOneBasket(item.id)} type="button" className="products__card-btn header__btn">
                +
                <span></span>
              </button>
              <div className="products__card-circle">
                {
                  basket.find(product => product.id === item.id).count
                }
              </div>
            </div>
            : <div className="products__card-buy">
              <p className="products__card-price">
                {item.price} ₽
              </p>
              <button type="button" onClick={() => addBasket(item)} className="products__card-btn header__btn">
                В корзину
                <BsCart3 size={20} />
              </button>
            </div>
        }
      </div>
    </div>
  )
};

export default Card;