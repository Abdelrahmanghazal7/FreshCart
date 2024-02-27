import React, { useState } from "react";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import { useQuery } from "react-query";
import AtomProduct from "../AtomProduct/AtomProduct";

const FeatureProducts = () => {
  function getProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  let { isLoading, data } = useQuery("products", getProducts);

  let [searchedArr, setSearchedArr] = useState([]);

  function search(e) {
    let term = e.target.value;
    let newArr = data?.data.data.filter((ele) =>
      ele?.title.toLowerCase().trim().includes(term.toLowerCase().trim())
    );
    setSearchedArr(newArr);
  }

  return (
    <>
      {isLoading ? (
        <div className="w-100 py-5 d-flex justify-content-center align-items-center">
          <TailSpin
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        <div className="container py-2">
          <h2>Featured Products</h2>

          <div className="w-75 mx-auto main-color p-5 my-3" onChange={search}>
            <input
              type="text"
              name="search"
              id="search"
              className="form-control"
              placeholder="Search..."
            />
          </div>

          <div className="row">
            {searchedArr.length
              ? searchedArr?.map((product) => (
                  <AtomProduct key={product.id} product={product}></AtomProduct>
                ))
              : data?.data.data.map((product) => (
                  <AtomProduct key={product.id} product={product}></AtomProduct>
                ))}
          </div>
        </div>
      )}
    </>
  );
};

export default FeatureProducts;
