import React from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import { useQuery } from "react-query";

function Categories() {
  function getCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }

  let { isLoading, data } = useQuery("categories", getCategories);

  return (
    <>
      <Helmet>
        <title>Categories</title>
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
        <div className="container text-center py-2">
          <h2>Categories</h2>
          <div className="row">
            {data?.data.data.map((category) => (
              <div key={category.id} className="col-md-4 g-3">
                <div className="category cursor-pointer">
                  <img
                    className="w-100"
                    height={300}
                    src={category.image}
                    alt={category.name}
                  />

                  <div className="py-4">
                    <span className="text-main fs-4 fw-bolder">
                      {category.name}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Categories;
