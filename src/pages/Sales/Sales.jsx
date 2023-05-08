import React from 'react';
import Title from '../../components/Title/Title';
import instance from '../../utils/axios';

import "./Sales.scss";
import Map from '../Home/Map/Map';

const Sales = () => {
  const [sales, setSales] = React.useState([]);

  React.useEffect(() => {
    instance("/sales")
      .then(res => setSales(res.data))
      .catch(err => console.log(err))
  }, []);

  return (
    <>
      <section className="sales">
        <div className="container">
          <Title title="АКЦИИ" />

          <div className="sales__row">
            {sales.map(({ id, image, title, description, date }) => (
              <div key={id} className="sales__card">
                <img className="sales__card-img" src={image} alt={title} />
                <div className="sales__card-block">
                  <h3 className="sales__card-title">{title}</h3>
                  <p className="sales__card-desc">{description}</p>
                  <p className="sales__card-date">{date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section >
      <Map />
    </>
  )
};

export default Sales;