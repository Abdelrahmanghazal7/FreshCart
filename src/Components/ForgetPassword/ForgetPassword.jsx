import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ForgetPassword = () => {
  let [errorMessage, setErrorMessage] = useState("");
  let [loding, setLoding] = useState(false);
  let [btnDisable, setBtnDisable] = useState(false);

  let navigate = useNavigate();

  async function callEmail(email) {
    setErrorMessage("");
    setLoding(true);
    setBtnDisable(true);
    await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
        email
      )
      .then(() => {
        navigate("/verificationCode");
        toast.success("Code sent to your Email", {
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
            fontWeight: 'bold',
          },
        });
      })
      .catch((error) => {
        setLoding(false);
        setBtnDisable(false);
        setErrorMessage(error.response.data.message);
      });
  }

  const validationSchema = Yup.object({
    email: Yup.string().email("email not vaild").required("email is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: callEmail,
  });

  return (
    <>
      <Helmet>
        <title>Forget Password</title>
      </Helmet>

      {errorMessage ? (
        <div className="alert alert-danger">{errorMessage}</div>
      ) : null}

      <div className="w-50 mx-auto my-5">
        <h2 className="mb-3">Enter Your Email :</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group mb-2">
            <label htmlFor="email" className="mb-2 fw-bold">
              Email
            </label>
            <input
              className="form-control"
              type="email"
              name="email"
              id="email"
              autoComplete="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email ? (
              <div className="alert alert-danger">{formik.errors.email}</div>
            ) : null}
          </div>

          <button
            type="submit"
            className={`btn bg-main text-white fw-bold ${
              btnDisable ? "disabled" : ""
            }`}
            disabled={!(formik.isValid && formik.dirty)}
          >
            {loding ? <i className="fa fa-spinner fa-spin"></i> : "send code"}
          </button>
        </form>
      </div>
    </>
  );
};

export default ForgetPassword;
