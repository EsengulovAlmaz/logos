import React from 'react';
import { useNavigate } from 'react-router-dom';
import { customContext } from '../../utils/Context';



const BasketTotal = () => {
  const navigate = useNavigate();
  const { basket } = React.useContext(customContext);

  return (
    <div className='basketTotal'>
      <p className="basket">
        {
          basket.reduce((acc, rec) =>
            acc + rec.price * rec.count
            , 0)
        }
      </p>
      <button className="basketTotal__create" onClick={() => navigate('/orders')}>
        оформить заказ
      </button>
    </div>
  )
};

export default BasketTotal;