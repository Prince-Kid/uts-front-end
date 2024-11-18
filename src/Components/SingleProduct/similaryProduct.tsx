import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { fetchSimilarProducts } from "../../Redux/Action/singleProduct";
import ProductCard from "../ProductsPage/productCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useTranslation } from "react-i18next";

interface SimilarProductProps {
  productId: string;
}

const SimilarProduct: React.FC<SimilarProductProps> = ({ productId }) => {
  const dispatch = useDispatch();
  const similarProducts = useSelector(
    (state: RootState) => state.similarProducts.similarProducts
  );
  const status = useSelector(
    (state: RootState) => state.similarProducts.status
  );
  const error = useSelector((state: RootState) => state.similarProducts.error);
  const { t } = useTranslation();
  useEffect(() => {
    if (productId) {
      dispatch(fetchSimilarProducts(productId) as any);
    }
  }, [dispatch, productId]);

  if (status === "loading") {
    return (
      <div className="similar-products-container flex flex-col items-center">
        <div className="h-32">
          <div className="font-extrabold text-center text-2xl">
            Related Products
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  mb-6 gap-4 justify-start w-4/5 items-center">
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <Skeleton key={index} height={200} width="80%" />
            ))}
        </div>
      </div>
    );
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="similar-products-container flex flex-col items-center">
      <div className="h-32">
        <div className="font-extrabold text-center text-2xl">
          {t("Related Products")}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  mb-6 gap-4 justify-start w-4/5 items-center">
        {similarProducts &&
          similarProducts.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))}
      </div>
    </div>
  );
};

export default SimilarProduct;
