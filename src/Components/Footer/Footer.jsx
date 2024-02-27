import React, { useContext } from "react";
import Amazon from "../../Assets/images/amazon.png";
import Express from "../../Assets/images/express.png";
import Master from "../../Assets/images/mastercard.png";
import Paypal from "../../Assets/images/paypal.png";
import Appstore from "../../Assets/images/appstore.png";
import Playstore from "../../Assets/images/playstore.png";
import { TokenContext } from "../../Context/TokenContext";
function Footer() {
  let { token } = useContext(TokenContext);
  return (
    <>
      {token ? (
        <footer className="bg-main-light pt-5">
          <div className="container">
            <h4 className="fw-bold">Get the Frech Cart App</h4>
            <p>
              We will send you a link, open it on your phone to download the
              app.
            </p>
            <div className="d-flex">
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control py-2"
                  placeholder="Email..."
                />
              </div>
              <div className="col-sm-2 ps-3">
                <button className="btn w-100 bg-main text-white fw-bold">
                  Share App Link
                </button>
              </div>
            </div>
            <div className="line border-bottom border-2 my-4"></div>

            <div className="d-flex justify-content-between align-items-center payment">
              <div className="d-flex justify-content-center align-items-center pay-1">
                <h6 className="fw-bold">Payment Partners</h6>
                <img src={Amazon} className="r-img" alt="" />
                <img src={Express} className="r-img" alt="" />
                <img src={Master} className="r-img" alt="" />
                <img src={Paypal} className="r-img" alt="" />
              </div>
              <div className="ps-3 d-flex justify-content-center align-items-center pay-2">
                <h6 className="fw-bold">Get deliveries with FreshCart</h6>
                <img src={Appstore} className="l-img" alt="" />
                <img src={Playstore} className="l-img" alt="" />
              </div>
            </div>
          </div>
        </footer>
      ) : null}
    </>
  );
}

export default Footer;
