import React from "react";
import Reviews from "../Components/SingleProduct/reviews";
import Header from "../Components/Homepage/Homepage_header";
import Footer from "../Components/Homepage/Homepage_footer";
SimilarProduct

import { useParams } from "react-router-dom";
import SimilarProduct from "../Components/SingleProduct/similaryProduct";
import Sproduct from "../Components/SingleProduct/Sproduct";

const Singlepage = () => {
  const { id } = useParams();

	const productId = id || 'no api';

  
  return (
    <div>
      <Header />
      <div className="flex flex-col justify-center w-full">
        <Sproduct productId={productId} />
        <Reviews productId={productId} />
        <SimilarProduct productId={productId} />
      </div>
      <Footer />
    </div>
  );
};

export default Singlepage;