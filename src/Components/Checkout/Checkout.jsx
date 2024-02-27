import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { cartContext } from "../../Context/CartContext";
import * as Yup from "yup";

const Checkout = () => {
  let [loding, setLoding] = useState(false);
  let [btnDisable, setBtnDisable] = useState(false);

  const { payment } = useContext(cartContext);

  async function checkPayment(values) {
    setLoding(true);
    setBtnDisable(true);
    const { data } = await payment(values);

    if (data.status === "success") {
      setLoding(false);
      setBtnDisable(false);
      window.location.href = data.session.url;
    }
  }

  const phoneRegExp = /^01[0125][0-9]{8}$/;

  const validationSchema = Yup.object({
    details: Yup.string().required("address details is required"),
    city: Yup.string().min(2, "Too Short!").required("city is required"),
    phone: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("phone is required"),
  });

  let formik = useFormik({
    initialValues: {
      details: "",
      city: "",
      phone: "",
    },
    validationSchema,
    onSubmit: checkPayment,
  });
  return (
    <>
      <div className="container">
        <h2>CheckOut</h2>

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="details" className="form-form-label fw-bold mb-2">
              Address Details
            </label>
            <input
              type="text"
              name="details"
              id="details"
              className="form-control"
              value={formik.values.details}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.details && formik.touched.details ? (
              <div className="alert alert-danger">{formik.errors.details}</div>
            ) : null}
          </div>

          <div className="mb-3">
            <label htmlFor="city" className="form-form-label fw-bold mb-2">
              City
            </label>
            <input
              type="text"
              name="city"
              id="city"
              className="form-control"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.city && formik.touched.city ? (
              <div className="alert alert-danger">{formik.errors.city}</div>
            ) : null}
          </div>

          <div className="mb-3">
            <label htmlFor="phone" className="form-form-label fw-bold mb-2">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              className="form-control"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.phone && formik.touched.phone ? (
              <div className="alert alert-danger">{formik.errors.phone}</div>
            ) : null}
          </div>
          <button
            type="submit"
            className={`btn bg-main text-white fw-bold ${btnDisable ? "disabled" : ""}`}
            disabled={!(formik.isValid && formik.dirty)}
          >
            {loding ? <i className="fa fa-spinner fa-spin"></i> : "Pay"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Checkout;
