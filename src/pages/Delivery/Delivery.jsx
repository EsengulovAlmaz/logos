import React from 'react';
import Title from '../../components/Title/Title';
import instance from '../../utils/axios';
import Accordion from '../../components/Accordion/Accordion';

const Delivery = () => {
  const [delivery, setDelivery] = React.useState([]);

  React.useEffect(() => {
    instance.get("/delivery")
      .then(res => setDelivery(res.data))
      .catch(err => console.log(err))
  }, [])


  return (
    <section className="delivery">
      <div className="container">
        <Title title="Условия доставки" />
        {delivery.map(item => (
          <Accordion
            key={item.id}
            data={item}
          />
        ))}
      </div>
    </section>
  )
};

export default Delivery;