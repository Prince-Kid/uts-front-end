import React, { useEffect, useState } from "react";
import { useAllProductsQuery } from "../../Redux/productsPage/productSlice";
import { useTranslation } from "react-i18next";

const BestDeals: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { data: hotDeal, isLoading, isError } = useAllProductsQuery({});
  console.log(hotDeal);
  const { t } = useTranslation();
  return (
    <section className="bg-primary text-white p-8 sm:p-16 md:pl-24 flex flex-col xl:flex-row items-center  sm:items-center justify-center gap-10 sm:gap-0 md:gap-10 font-outfit text-lg md:text-xl sm:text-sm min=-h-screen">
      {isLoading ? (
        "locing..."
      ) : (
        <>
          <div className="xl:w-1/2 text-center xl:text-start mb-8 md:mb-0 md:mr-8">
            <h2 className="text-2xl sm:text-xl md:text-3xl font-bold mb-4 md:mb-8">
              {t("Best Deals")}
            </h2>
            <p className="text-base text-[16px] mb-4 md:mb-6">
              On the other hand, we denounce with righteous indignation and
              dislike men who are so beguiled and demoralized by the charms of
              pleasure of the moment, so blinded by desire, that they cannot
              foresee the pain and trouble that are bound to ensue; and
            </p>
            <p className="text-base sm:text-sm md:text-xl font-semibold mb-4 md:mb-6">
              From &nbsp;&nbsp; {hotDeal[0].price} &nbsp;
              <span className="bg-sky-400 text-black p-1 px-3 text-xs sm:text-sm rounded-xl">
                Rwf
              </span>
            </p>
            <button className="bg-secondary px-4 py-2 sm:px-6 sm:py-2 rounded-lg text-base sm:text-sm md:text-lg">
              {t("Shop Now")}
            </button>
          </div>
          <div className="xl:w-1/2 p-10">
            <img
              src={hotDeal[0].image[0]}
              alt="Samsung TV"
              className="w-full h-full object-contain rounded-lg mx-auto sm:mx-0"
            />
          </div>
        </>
      )}
    </section>
  );
};

export default BestDeals;
