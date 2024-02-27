import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { cartContext } from "../../Context/CartContext";
import emptyCart from "../../Assets/images/empty-cart.png";
import { TailSpin } from "react-loader-spinner";
import { Link } from "react-router-dom";

function Cart() {
  const {
    getLoggedCart,
    removeItem,
    clearCart,
    updateItemQuantity,
    setNumOfCartItem,
  } = useContext(cartContext);
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);

  async function getCart() {
    const { data } = await getLoggedCart();
    setProducts(data?.data?.products);
    setTotalPrice(data?.data?.totalCartPrice);
    setTotalItems(data?.numOfCartItems);
    setLoading(false);
  }

  async function deletItem(id) {
    const { data } = await removeItem(id);
    setProducts(data?.data?.products);
    setTotalPrice(data?.data?.totalCartPrice);
    setTotalItems(data?.numOfCartItems);
    setNumOfCartItem(data?.numOfCartItems);
  }

  async function deletAllItem() {
    const { data } = await clearCart();
    getCart();
    setNumOfCartItem(data?.numOfCartItems);
  }

  async function updateItem(id, count) {
    const { data } = await updateItemQuantity(id, count);
    setProducts(data?.data?.products);
    setTotalPrice(data?.data?.totalCartPrice);
    setTotalItems(data?.numOfCartItems);
  }

  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      <Helmet>
        <title>Cart</title>
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
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        <div className="container bg-main-light p-4 mt-5">
          <h1>Shop Cart :</h1>

          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex flex-column">
              <span>
                Total Price :{" "}
                <span className="text-main fw-bold"> {totalPrice} EGP</span>
              </span>
              <span>
                Total Cart Item :{" "}
                <span className="text-main fw-bold"> {totalItems}</span>
              </span>
            </div>

            <Link to={"/checkout"} className="btn text-white bg-main fw-bold">
              Checkout
            </Link>
          </div>

          {products?.length > 0 ? (
            <div>
              {products?.map((product) => (
                <div
                  key={product._id}
                  className="row border-bottom p-2 m-4 align-items-center"
                >
                  <div className="col-md-2">
                    <img
                      src={product.product.imageCover}
                      className="w-100"
                      alt={product.product.title}
                    />
                  </div>

                  <div className="col-md-10">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="col-md-9">
                        <h4>{product.product.title}</h4>
                        <h6 className="text-main my-3">
                          Price:{" "}
                          <span className="text-black">
                            {product.price} EGP
                          </span>
                        </h6>
                        <span
                          onClick={() => deletItem(product.product.id)}
                          className="cursor-pointer text-danger"
                        >
                          <i className="fa-solid fa-trash"></i> Remove
                        </span>
                      </div>
                      <div className="col-md-3 text-end">
                        <button
                          className="btn border-main"
                          onClick={() =>
                            updateItem(product.product.id, product.count - 1)
                          }
                          disabled={product.count === 1 ? "disabled" : false}
                        >
                          -
                        </button>

                        <span className="mx-2">{product.count}</span>

                        <button
                          className="btn border-main"
                          onClick={() =>
                            updateItem(product.product.id, product.count + 1)
                          }
                          disabled={
                            product.product.quantity === product.count
                              ? "disabled"
                              : false
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={deletAllItem}
                className="btn bg-main text-white w-100 fw-bold"
              >
                clear All Items
              </button>
            </div>
          ) : (
            <img src={emptyCart} alt="Empty" className="d-block m-auto" />
          )}
        </div>
      )}
    </>
  );
}

export default Cart;
