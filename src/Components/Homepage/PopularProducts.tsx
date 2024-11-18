import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopularProducts } from "../../Redux/features/PopularProductsSlice";
import { RootState, AppDispatch } from "../../Redux/store";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
const PopularProducts: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.popularProducts
  );
  const product = useSelector((state: any) => state.product.product);
  const [quantity, setQuantity] = useState<number>(1);
  const navigate = useNavigate();
  const { t } = useTranslation();
  useEffect(() => {
    dispatch(fetchPopularProducts());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-10">
        {Array.from({ length: 4 }).map((product) => (
          <div className=" cursor-pointer rounded-t-[12px]">
            <Skeleton className="h-[30vh]" />
            <div className="flex flex-col p-2">
              <p className="md:text-lg sm:text-sm text-gray-500">
                <Skeleton height={14} />
              </p>
              <h3 className="md:text-xl sm:text-lg text-secondary">
                <Skeleton height={14} />
              </h3>
              <div className="flex justify-between items-center mt-2">
                <p className="md:text-xl sm:text-lg font-semibold text-gray-900">
                  <Skeleton height={14} />
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const displayProducts = products.slice(0, 10);

  const handleCardClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  return (
    <section className="py-16 px-6 sm:px-12 md:px-24 font-outfit bg-bgwhite min-h-screen mb-0">
      <div className="mb-8">
        <div className="flex items-center">
          <div className="w-24 h-2 bg-secondary mr-4"></div>
          <h2 className="text-xl sm:text-2xl font-bold text-blackText">
            {t("POPULAR PRODUCTS")}
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {displayProducts.map((product) => (
          <div
            key={product.productId}
            className=" cursor-pointer rounded-t-[12px]  shadow-lg p-5"
            onClick={() => handleCardClick(product.productId)}
          >
            <span className="text-base text-center text-[#D21A0E] font-bold tracking-[-0.30px] w-auto">
              {product.discount ? `${product.discount}% OFF` : null}
            </span>
            <img
              src={product.image[0]}
              alt={product.name}
              className=" rounded-t-[12px] w-full h-[30vh] object-contain"
            />
            <div className="flex flex-col p-2">
              <p className="md:text-lg sm:text-sm text-gray-500">
                {product.category}
              </p>
              <h3 className="md:text-xl sm:text-lg text-secondary">
                {product.name}
              </h3>
              <div className="flex justify-between items-center mt-2">
                <p className="md:text-xl sm:text-lg font-semibold text-blackText">
                  <span className="text-base text-[#AFBACA] line-through tracking-[-0.30px] w-auto">
                    {product.discount ? `${product.price * quantity}` : null}
                  </span>{" "}
                  <span className="text-base text-gray-900 font-bold tracking-[-0.30px] w-auto">
                    {product.price && product.discount
                      ? (product.price -
                          (product.price * product.discount) / 100) *
                        quantity
                      : product.price}
                  </span>
                  Rwf
                </p>
                <button className="text-secondary ">
                  <svg
                    width="30"
                    height="34"
                    viewBox="0 0 33 34"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16.2612 0.942749C20.4836 0.942749 23.9717 4.02599 24.4018 7.96935L24.5218 7.97071C26.8641 7.97071 29.712 9.46151 30.6732 13.6429L31.9477 23.097C32.4049 26.1482 31.8331 28.5957 30.245 30.3513C28.6653 32.0975 26.1647 33.0217 23.0131 33.0217H9.52782C6.06605 33.0217 3.65428 32.209 2.15359 30.5386C0.646437 28.8636 0.142437 26.351 0.656129 23.0722L1.90967 13.7435C2.73351 9.46615 5.74621 7.97071 8.07882 7.97071C8.2802 6.19116 9.11751 4.49822 10.4458 3.22926C11.9724 1.77561 14.0772 0.942749 16.2273 0.942749H16.2612ZM24.5218 10.2928H8.07882C7.36644 10.2928 4.98536 10.5684 4.30205 14.1042L3.05498 23.3927C2.64951 25.9981 2.9629 27.8836 3.98867 29.0246C5.00151 30.1516 6.81398 30.6996 9.52782 30.6996H23.0131C24.706 30.6996 27.0176 30.376 28.4133 28.831C29.5214 27.6065 29.9027 25.7829 29.5473 23.4097L28.2889 14.0407C27.7526 11.7325 26.3375 10.2928 24.5218 10.2928ZM20.9725 14.6028C21.6413 14.6028 22.2212 15.123 22.2212 15.7639C22.2212 16.4048 21.7156 16.9249 21.0468 16.9249H20.9725C20.3037 16.9249 19.761 16.4048 19.761 15.7639C19.761 15.123 20.3037 14.6028 20.9725 14.6028ZM11.5546 14.6028C12.2234 14.6028 12.8033 15.123 12.8033 15.7639C12.8033 16.4048 12.2961 16.9249 11.6273 16.9249H11.5546C10.8859 16.9249 10.3431 16.4048 10.3431 15.7639C10.3431 15.123 10.8859 14.6028 11.5546 14.6028ZM16.2564 3.26486H16.2322C14.7121 3.26486 13.2308 3.85159 12.1565 4.87486C11.2815 5.70969 10.7092 6.80717 10.524 7.96999L21.9598 7.97042C21.5447 5.31046 19.1445 3.26486 16.2564 3.26486Z"
                      fill="orange"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularProducts;
