import React from "react";
import MainSlider from "../MainSlider/MainSlider";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import FeatureProducts from "../FeatureProducts/FeatureProducts";
import { Helmet } from "react-helmet";

function FreshCart() {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>

      <MainSlider />

      <CategoriesSlider />

      <FeatureProducts />
    </>
  );
}

export default FreshCart;
