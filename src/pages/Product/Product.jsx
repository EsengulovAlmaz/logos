import React from 'react';
import instance from '../../utils/axios';
import { useNavigate, useParams } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { BsCart3 } from "react-icons/bs";
import { customContext } from '../../utils/Context';

import "./Product.scss";

const Product = () => {
  const [product, setProduct] = React.useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const { addBasket, basket, minusOneBasket, plusOneBasket } = React.useContext(customContext);

  React.useEffect(() => {
    instance.get(`/products/${id}`)
      .then(({ data }) => setProduct(data))
      .catch(err => console.log(err.message))
  }, [])

  if (JSON.stringify(product) === "{}") {
    return (
      <h2>Продукт не найден</h2>
    )
  }
  return (
    <section className="product">
      <div className="container">
        <button className="product__btn" type='button' onClick={() => navigate(-1)}>
          <span className="product__btn-icon">
            <IoIosArrowBack />
          </span>
          Вернуться назад
        </button>

        <div className="product__content">
          <img src={`${product.image}`} alt="" className="product__content-img" />
          <div className="product__info">
            <h2 className="product__info-title">{product.title}</h2>
            <p className="product__info-desc">{product.description}</p>
            <ul className="product__info-list">
              <li className="product__info-item">
                Белки: {product.protein}
              </li>
              <li className="product__info-item">
                Жиры: {product.fats}
              </li>
              <li className="product__info-item">
                Углеводы: {product.carbohydrates}
              </li>
              <li className="product__info-item">
                Ккал: {product.calories}
              </li>
              <li className="product__info-item">
                Вес: {product.weight} г
              </li>

            </ul>
            {
              basket.findIndex(item => item.id === product.id) > -1
                ? <div className="products__card-buy">
                  <button onClick={() => minusOneBasket(product.id)} type="button" className="products__card-btn header__btn">
                    -
                    <span></span>
                  </button>
                  <p className="products__card-price">
                    {basket.find(item => item.id === product.id).count}
                  </p>
                  <button onClick={() => plusOneBasket(product.id)} type="button" className="products__card-btn header__btn">
                    +
                    <span></span>
                  </button>
                </div>
                : <div className="products__card-buy">
                  <button type="button" onClick={() => addBasket(product)} className="products__card-btn header__btn">
                    В корзину
                    <BsCart3 size={20} />
                  </button>
                  <p className="products__card-price">
                    {product.price} ₽
                  </p>
                </div>
            }
          </div>
        </div>
      </div>
    </section>
  )
}


export default Product;