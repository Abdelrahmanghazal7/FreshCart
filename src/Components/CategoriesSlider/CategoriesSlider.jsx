import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

const CategoriesSlider = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    customPaging: () => <div className="ft-slick__dots--custom"></div>,
  };

  let [Categories, setCategories] = useState([]);
  async function getCategories() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories`
    );
    setCategories(data.data);
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <div className="container my-5">
        <h2 className="mb-3">Popular Categories</h2>
        <Slider {...settings}>
          {Categories.map((catg, i) => (
            <div key={i} className="px-1 text-center">
              <img src={catg.image} className="w-100" height={"170"} alt="" />
              <h5>{catg.name}</h5>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default CategoriesSlider;
