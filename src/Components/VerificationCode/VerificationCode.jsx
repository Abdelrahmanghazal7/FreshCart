import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VerificationCode = () => {
  let [errorMessage, setErrorMessage] = useState("");
  let [loding, setLoding] = useState(false);
  let [btnDisable, setBtnDisable] = useState(false);

  let navigate = useNavigate();

  async function callCode(resetCode) {
    setErrorMessage("");
    setLoding(true);
    setBtnDisable(true);
    await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
        resetCode
      )
      .then(() => navigate("/resetPassword"))
      .catch((error) => {
        setLoding(false);
        setBtnDisable(false);
        setErrorMessage(error.response.data.message);
      });
  }

  const validationSchema = Yup.object({
    resetCode: Yup.string().required("code is required"),
  });

  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema,
    onSubmit: callCode,
  });

  return (
    <>
      <Helmet>
        <title>Verification Code</title>
      </Helmet>

      {errorMessage ? (
        <div className="alert alert-danger">{errorMessage}</div>
      ) : null}

      <div className="w-50 mx-auto my-5">
        <h2 className="mb-3">Enter Code :</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group mb-2">
            <label htmlFor="resetCode" className="mb-2 fw-bold">
              Verification Code
            </label>
            <input
              className="form-control"
              type="text"
              name="resetCode"
              id="resetCode"
              value={formik.values.resetCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.resetCode && formik.touched.resetCode ? (
              <div className="alert alert-danger">
                {formik.errors.resetCode}
              </div>
            ) : null}
          </div>

          <button
            type="submit"
            className={`btn bg-main text-white fw-bold ${btnDisable ? "disabled" : ""}`}
            disabled={!(formik.isValid && formik.dirty)}
          >
            {loding ? <i className="fa fa-spinner fa-spin"></i> : "Vertify"}
          </button>
        </form>
      </div>
    </>
  );
};

export default VerificationCode;
