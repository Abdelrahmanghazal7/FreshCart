import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { TailSpin } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import Slider from "react-slick";

function ProductDetails() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    customPaging: () => <div className="ft-slick__dots--custom"></div>,
  };

  let param = useParams();
  let [ProductDetails, setProductDetails] = useState({});
  let [details, setDetails] = useState([]);
  let [loading, setLoading] = useState(true);

  async function getProductDetails() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${param.id}`
    );
    setProductDetails(data.data);
    setDetails(data.data.images);
    setLoading(false);
  }

  useEffect(() => {
    getProductDetails();
  }, []);

  const { addProductToCart, setNumOfCartItem } = useContext(cartContext);

  async function addProduct(id) {
    let { data } = await addProductToCart(id);
    if (data.status === "success") {
      toast.success("Product added successfully", {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
          fontWeight: 'bold',
        },
      });
      setNumOfCartItem(data.numOfCartItems);
    } else {
      toast.error(data.message, {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
          fontWeight: 'bold',
        },
      });
    }
  }

  return (
    <>
      <Helmet>
        <title>{ProductDetails.title}</title>
      </Helmet>
      {loading ? (
        <div className="w-100 py-5 d-flex justify-content-center align-items-center">
          <TailSpin
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="tail-spin-loading"
            radius="1"
          />
        </div>
      ) : (
        <div className="container">
          <div className="row align-items-center mt-5">
            <div className="col-md-3">
              <Slider {...settings}>
                {details.map((detail, i) => (
                  <div key={i} className="px-1 text-center">
                    <img src={detail} className="w-100" alt={i} />
                  </div>
                ))}
              </Slider>
            </div>

            <div className="col-md-9">
              <h4>{ProductDetails.title}</h4>
              <p className="my-3">{ProductDetails.description}</p>
              <div>
                <span className="fw-bold">
                  {ProductDetails?.category?.name}
                </span>
                <div className="d-flex justify-content-between my-3 fw-bold">
                  <span>{ProductDetails.price} EGP</span>
                  <span>
                    <i className="fas fa-star rating-color"></i>{" "}
                    {ProductDetails.ratingsAverage}
                  </span>
                </div>
                <button
                  onClick={() => addProduct(ProductDetails.id)}
                  className="btn bg-main text-white w-100 fw-bold"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductDetails;
