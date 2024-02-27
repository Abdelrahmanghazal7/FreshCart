import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "../../Assets/images/freshcart-logo.svg";
import { TokenContext } from "../../Context/TokenContext";
import { cartContext } from "../../Context/CartContext";

function NavBar() {
  let { token, setToken } = useContext(TokenContext);
  let { numOfCartItems } = useContext(cartContext);
  let navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("userToken");
    setToken(null);
    navigate("/login");
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link className="navbar-brand" to={"home"}>
            <img src={Logo} alt="freshcart" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {token ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-link" to={"FreshCart"}>
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to={"products"}>
                    Products
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to={"categories"}>
                    Categories
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to={"brands"}>
                    Brands
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to={"wishList"}>
                    WishList
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to={"cart"}>
                    Cart{" "}
                    <i className="fa-solid fa-shopping-cart position-relative">
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {numOfCartItems}
                      </span>
                    </i>
                  </NavLink>
                </li>
              </ul>
            ) : null}

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item align-self-center">
                <i className="fa-brands fa-instagram mx-1 cursor-pointer"></i>
                <i className="fa-brands fa-facebook mx-1 cursor-pointer"></i>
                <i className="fa-brands fa-linkedin mx-1 cursor-pointer"></i>
              </li>

              {token ? (
                <li className="nav-item">
                  <button onClick={logOut} className="nav-link">
                    LogOut
                  </button>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to={"register"}>
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"login"}>
                      Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
