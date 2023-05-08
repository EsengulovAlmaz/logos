import React, { useContext, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper";
import Title from "../Title/Title";
import { customContext } from "../../utils/Context";
import Card from "../Card/Card";



const ProductsFilter = ({ title }) => {

  const { products, getAllProducts } = useContext(customContext);

  useEffect(() => {
    getAllProducts()
  }, [])


  return (
    <div className="products__filter">
      <Title title={title} />
      <div className="products__filter-sliders">
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          loop={true}
          centeredSlides={true}
          autoplay={{
            delay: 3000
          }}
          speed={2000}
          modules={[Autoplay]}
          className="mySwiper"
        >
          {
            products.map((item) => (
              <SwiperSlide key={item.id}>
                <Card item={item} />
              </SwiperSlide>
            ))
          }
        </Swiper>
      </div>
    </div>
  );
};

export default ProductsFilter;