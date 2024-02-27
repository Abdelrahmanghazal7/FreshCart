import React from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import { useQuery } from "react-query";

function Brands() {
  function getBrands() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }

  let { isLoading, data } = useQuery("brands", getBrands);

  return (
    <>
      <Helmet>
        <title>Brands</title>
      </Helmet>

      {isLoading ? (
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
        <div className="container py-2 text-center">
          <h2>Brands</h2>
          <div className="row">
            {data?.data.data.map((brand) => (
              <div key={brand.id} className="col-md-3 g-4">
                <div className="brand cursor-pointer p-3">
                  <img className="w-100" src={brand.image} alt={brand.name} />
                  <span className="fw-bolder">{brand.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Brands;
