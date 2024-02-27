import React, { useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import { TailSpin } from "react-loader-spinner";
import emptyWishlist from "../../Assets/images/no-found.png";
import { WishListContext } from "../../Context/WishListContext";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

const WishList = () => {
  const { getWishlist, removeItem, wishlists, loading, totalItems } =
    useContext(WishListContext);

  const { addProductToCart, setNumOfCartItem } = useContext(cartContext);

  async function deletItem(id) {
    await removeItem(id);
    getWishlist();
  }

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

  useEffect(() => {
    getWishlist();
  }, []);

  return (
    <>
      <Helmet>
        <title>Wishlist</title>
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
        <div className="container bg-main-light p-4 mt-5">
          <div className="d-flex justify-content-between align-items-center">
            <h1>WishList :</h1>

            <span>
              Total WishList Item :{" "}
              <span className="text-main fw-bold"> {totalItems}</span>
            </span>
          </div>

          {wishlists?.length === 0 ? (
            <img src={emptyWishlist} alt="Empty" className="d-block m-auto" />
          ) : (
            wishlists.map((wishlist) => (
              <div
                key={wishlist._id}
                className="row border-bottom p-2 m-4 align-items-center"
              >
                <div className="col-md-2">
                  <img
                    src={wishlist.imageCover}
                    className="w-100"
                    alt={wishlist.title}
                  />
                </div>

                <div className="col-md-10">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="col-md-9">
                      <h4>{wishlist.title}</h4>
                      <h6 className="text-main my-3">
                        Price:{" "}
                        <span className="text-black">{wishlist.price} EGP</span>
                      </h6>
                      <span
                        onClick={() => deletItem(wishlist.id)}
                        className="cursor-pointer text-danger"
                      >
                        <i className="fa-solid fa-trash"></i> Remove
                      </span>
                    </div>

                    <div className="col-md-3 text-end">
                      <button
                        className="btn border-main fw-bold"
                        onClick={() => addProduct(wishlist.id)}
                      >
                        add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </>
  );
};

export default WishList;
