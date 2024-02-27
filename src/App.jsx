import React, { useContext, useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LayOut from "./Components/LayOut/LayOut";
import FreshCart from "./Components/Home/FreshCart";
import Products from "./Components/Products/Products";
import Categories from "./Components/Categories/Categories";
import Brands from "./Components/Brands/Brands";
import Cart from "./Components/Cart/Cart";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import NotFound from "./Components/NotFound/NotFound";
import Checkout from "./Components/Checkout/Checkout";
import AllOrders from "./Components/AllOrders/AllOrders";
import { TokenContext } from "./Context/TokenContext";
import ProtectedRoutes from "./ProtectedRoutes/ProtectedRoutes";
import ProtectedSignRoutes from "./ProtectedSignRoutes/ProtectedSignRoutes";
import Main from "./Components/Main/Main";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import { Offline } from "react-detect-offline";
import Wifi from "./Assets/images/wifi-slash.png";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import VerificationCode from "./Components/VerificationCode/VerificationCode";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import WishList from "./Components/WishList/WishList";

function App() {
  let { setToken } = useContext(TokenContext);

  const routes = createBrowserRouter([
    {
      path: "",
      element: <LayOut />,
      children: [
        {
          index: true,
          element: (
            <ProtectedSignRoutes>
              <Main />
            </ProtectedSignRoutes>
          ),
        },
        {
          path: "FreshCart",
          element: (
            <ProtectedRoutes>
              <FreshCart />
            </ProtectedRoutes>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoutes>
              <Products />
            </ProtectedRoutes>
          ),
        },
        {
          path: "ProductDetails/:id",
          element: (
            <ProtectedRoutes>
              <ProductDetails />
            </ProtectedRoutes>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoutes>
              <Categories />
            </ProtectedRoutes>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoutes>
              <Brands />
            </ProtectedRoutes>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoutes>
              <Cart />
            </ProtectedRoutes>
          ),
        },
        {
          path: "checkout",
          element: (
            <ProtectedRoutes>
              <Checkout />
            </ProtectedRoutes>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectedRoutes>
              <AllOrders />
            </ProtectedRoutes>
          ),
        },
        {
          path: "wishList",
          element: (
            <ProtectedRoutes>
              <WishList />
            </ProtectedRoutes>
          ),
        },
        {
          path: "login",
          element: (
            <ProtectedSignRoutes>
              <Login />
            </ProtectedSignRoutes>
          ),
        },
        {
          path: "register",
          element: (
            <ProtectedSignRoutes>
              <Register />
            </ProtectedSignRoutes>
          ),
        },
        {
          path: "forgetPassword",
          element: (
            <ProtectedSignRoutes>
              <ForgetPassword />
            </ProtectedSignRoutes>
          ),
        },
        {
          path: "verificationCode",
          element: (
            <ProtectedSignRoutes>
              <VerificationCode />
            </ProtectedSignRoutes>
          ),
        },
        {
          path: "resetPassword",
          element: (
            <ProtectedSignRoutes>
              <ResetPassword />
            </ProtectedSignRoutes>
          ),
        },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  useEffect(() => {
    if (localStorage.getItem("userToken") != null) {
      setToken(localStorage.getItem("userToken"));
    }
  }, []);

  return (
    <>
      <Offline>
        <div className="offline">
          <img className="wifi me-1" src={Wifi} alt="offline" />
          You Are Offline
        </div>
      </Offline>
      <RouterProvider router={routes}></RouterProvider>;
    </>
  );
}

export default App;
