import React from "react";
import Error from "../../Assets/images/error.svg";

function NotFound() {
  return (
    <div className="container my-5 pt-5 text-center">
      <img src={Error} className="w-50" alt="NotFound" />
    </div>
  );
}

export default NotFound;
