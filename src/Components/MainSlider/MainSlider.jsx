import React from "react";
import Slider from "react-slick";
import img1 from "../../Assets/images/slider-image-1.jpeg";
import img2 from "../../Assets/images/slider-image-2.jpg";
import img3 from "../../Assets/images/slider-image-3.jpeg";

function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    customPaging: () => <div className="ft-slick__dots--custom"></div>,
  };
  return (
    <>
      <div className="container my-5">
        <div className="row">
          <div className="col-md-8">
            <Slider {...settings}>
              <img src={img3} alt="slider-image" />
              <img src={img1} alt="slider-image" />
              <img src={img2} alt="slider-image" />
            </Slider>
          </div>

          <div className="col-md-4">
            <img src={img1} className="w-100" alt="slider-image" />
            <img src={img2} className="w-100 mt-3" alt="slider-image" />
          </div>
        </div>
      </div>
    </>
  );
}

export default MainSlider;
