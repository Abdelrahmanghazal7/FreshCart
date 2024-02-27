import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";

function Register() {
  let [errorMessage, setErrorMessage] = useState("");
  let [loding, setLoding] = useState(false);
  let [btnDisable, setBtnDisable] = useState(false);

  let navigate = useNavigate();

  async function callRegister(req) {
    setErrorMessage("");
    setLoding(true);
    setBtnDisable(true);
    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, req)
      .catch((error) => {
        setLoding(false);
        setBtnDisable(false);
        setErrorMessage(error.response.data.message);
      });
    if (data.message === "success") {
      navigate("/login");
      toast.success("Register successfully", {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
          fontWeight: 'bold',
        },
      });
    }
  }

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "name is too short")
      .max(10, "name is too long")
      .required("name is required"),
    email: Yup.string().email("email not vaild").required("email is required"),
    password: Yup.string()
      .matches(
        /^[A-Z][a-z0-9]{8,}$/,
        "password must be at least 8 characters with one uppercase"
      )
      .required("password required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "password and repassword must match")
      .required("repassword required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "invaild phone")
      .required("phone required"),
  });

  const registerForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: callRegister,
  });

  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <div className="w-50 mx-auto my-5">
        <h2 className="mb-3">Register Now :</h2>
        {errorMessage ? (
          <div className="alert alert-danger">{errorMessage}</div>
        ) : null}

        <form onSubmit={registerForm.handleSubmit}>
          <div className="form-group mb-2">
            <label htmlFor="fullName" className="mb-2 fw-bold">
              Full Name
            </label>
            <input
              className="form-control"
              type="text"
              name="name"
              id="fullName"
              autoComplete="name"
              value={registerForm.values.name}
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
            />
            {registerForm.errors.name && registerForm.touched.name ? (
              <div className="alert alert-danger">
                {registerForm.errors.name}
              </div>
            ) : null}
          </div>

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
              value={registerForm.values.email}
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
            />
            {registerForm.errors.email && registerForm.touched.email ? (
              <div className="alert alert-danger">
                {registerForm.errors.email}
              </div>
            ) : null}
          </div>

          <div className="form-group mb-2">
            <label htmlFor="password" className="mb-2 fw-bold">
              Password
            </label>
            <input
              className="form-control"
              type="password"
              name="password"
              id="password"
              autoComplete="new-password"
              value={registerForm.values.password}
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
            />
            {registerForm.errors.password && registerForm.touched.password ? (
              <div className="alert alert-danger">
                {registerForm.errors.password}
              </div>
            ) : null}
          </div>

          <div className="form-group mb-2">
            <label htmlFor="rePassword" className="mb-2 fw-bold">
              repassword
            </label>
            <input
              className="form-control"
              type="password"
              name="rePassword"
              id="rePassword"
              autoComplete="new-password"
              value={registerForm.values.rePassword}
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
            />
            {registerForm.errors.rePassword &&
            registerForm.touched.rePassword ? (
              <div className="alert alert-danger">
                {registerForm.errors.rePassword}
              </div>
            ) : null}
          </div>

          <div className="form-group mb-2">
            <label htmlFor="phone" className="mb-2 fw-bold">
              Phone
            </label>
            <input
              className="form-control"
              type="tel"
              name="phone"
              id="phone"
              autoComplete="tel"
              value={registerForm.values.phone}
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
            />
            {registerForm.errors.phone && registerForm.touched.phone ? (
              <div className="alert alert-danger">
                {registerForm.errors.phone}
              </div>
            ) : null}
          </div>

          <button
            type="submit"
            className={`btn bg-main text-white d-block ms-auto fw-bold ${
              btnDisable ? "disabled" : ""
            }`}
            disabled={!(registerForm.isValid && registerForm.dirty)}
          >
            {loding ? <i className="fa fa-spinner fa-spin"></i> : "Register"}
          </button>
        </form>
      </div>
    </>
  );
}

export default Register;
