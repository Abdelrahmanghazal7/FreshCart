import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { TokenContext } from "../../Context/TokenContext";
import { Helmet } from "react-helmet";

function Login() {
  let [errorMessage, setErrorMessage] = useState("");
  let [loding, setLoding] = useState(false);
  let [btnDisable, setBtnDisable] = useState(false);

  let { setToken } = useContext(TokenContext);

  let navigate = useNavigate();

  async function callLogin(req) {
    setErrorMessage("");
    setLoding(true);
    setBtnDisable(true);
    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, req)
      .catch((error) => {
        setLoding(false);
        setBtnDisable(false);
        setErrorMessage(error.response.data.message);
      });
    if (data.message === "success") {
      localStorage.setItem("userToken", data.token);
      setToken(data.token);
      navigate("/FreshCart");
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string().email("email not vaild").required("email is required"),
    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{8,}$/, "invaild password")
      .required("password required"),
  });

  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: callLogin,
  });

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="w-50 mx-auto my-5">
        <h2 className="mb-3">Login Now :</h2>
        {errorMessage ? (
          <div className="alert alert-danger">{errorMessage}</div>
        ) : null}

        <form onSubmit={loginForm.handleSubmit}>
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
              value={loginForm.values.email}
              onChange={loginForm.handleChange}
              onBlur={loginForm.handleBlur}
            />
            {loginForm.errors.email && loginForm.touched.email ? (
              <div className="alert alert-danger">{loginForm.errors.email}</div>
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
              value={loginForm.values.password}
              onChange={loginForm.handleChange}
              onBlur={loginForm.handleBlur}
            />
            {loginForm.errors.password && loginForm.touched.password ? (
              <div className="alert alert-danger">
                {loginForm.errors.password}
              </div>
            ) : null}
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <Link to={"/forgetPassword"} className="fw-bolder">
              forget your password ?
            </Link>

            <button
              type="submit"
              className={`btn bg-main text-white fw-bold ${
                btnDisable ? "disabled" : ""
              }`}
              disabled={!(loginForm.isValid && loginForm.dirty)}
            >
              {loding ? <i className="fa fa-spinner fa-spin"></i> : "Login"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
