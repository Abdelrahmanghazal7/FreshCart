import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { WishListContext } from "../../Context/WishListContext";

const AtomProduct = ({ product }) => {
  const { addProductToCart, setNumOfCartItem } = useContext(cartContext);

  const { addProductToWishList, getWishlist, heart } =
    useContext(WishListContext);

  async function addProduct(id) {
    let { data } = await addProductToCart(id);
    if (data.status === "success") {
      toast.success("Product added successfully", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
          fontWeight: "bold",
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

  async function addToWishList(id) {
    let { data } = await addProductToWishList(id);
    if (data.status === "success") {
      getWishlist();
      toast.success("added to wishlist successfully", {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
          fontWeight: 'bold',
        },
      });
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

  let wishListID = heart?.data?.map((pro) => pro.id);

  let productID = wishListID?.includes(product.id);

  return (
    <>
      <div className="col-xl-2 col-lg-3 col-md-4 col-sm-12">
        <div className="product cursor-pointer py-3 px-2">
          <Link to={"/ProductDetails/" + product._id}>
            <img
              className="w-100"
              src={product.imageCover}
              alt={product.title}
            />
            <span className="text-main font-sm fw-bolder">
              {product.category.name}
            </span>
            <h3 className="h6">
              {product.title.split(" ").slice(0, 2).join(" ")}
            </h3>

            <div className="d-flex justify-content-between mt-3">
              <span>{product.price} EGP</span>
              <span>
                <i className="fas fa-star rating-color"></i>{" "}
                {product.ratingsAverage}
              </span>
            </div>
          </Link>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <button
              onClick={() => addProduct(product.id)}
              className="btn bg-main text-white w-100 btn-sm mt-2 mx-2"
            >
              add to cart
            </button>

            <i
              className={`${
                productID ? "fa-solid fa-heart" : "fa-regular fa-heart"
              }`}
              onClick={() => addToWishList(product.id)}
            ></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default AtomProduct;
