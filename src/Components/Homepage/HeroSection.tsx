import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../Redux/store";
import { useTranslation } from "react-i18next";
import { fetchImages } from "../../Redux/HomePage/ProductsImagesSlice";
import Skeleton from "react-loading-skeleton";

const HeroSection: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  // const { images, loading, error } = useSelector(
  //   (state: RootState) => state.productsImages
  // );

  const images = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1I6o-v_uhGbt1YB0OryEVp2LAtSvUQe30Og&s",
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchImages());
  }, [dispatch]);

  useEffect(() => {
    if (images && images.length > 0) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [images]);

  const { t } = useTranslation();

  return (
    <section className=" bg-gradient-to-r from-primary to-primaryGradient text-white text-xl px-8 py-[20vh]  md:px-8 lg:px-16 flex flex-col lg:flex-row items-center gap-8 lg:gap-64 font-outfit justify-start items-start">
      <div className="w-full text-center items-center xl:text-start xl:items-start  flex flex-col gap-4 lg:gap-8">
        <h1 className="text-3xl font-bold">
          <span className="text-secondary">UTS</span>&nbsp; Business Ltd
        </h1>
        <p className="text-[18px] font-poppins">
          {t("Welcome")}
          {/* <a href="/signup" className="text-secondary font-bold px-1">
            {t("here")}
          </a>
          {t("to get started")} */}
        </p>
        <div className="flex flex-col md:flex-row gap-8">
          <a
            href="/products"
            className="bg-secondary max-w-7xl py-3 px-10 rounded-lg font-outfit text-center"
          >
            {t("Shop Now")}
          </a>
          <a
            href="/#ContactSection"
            className="bg-[#08447D] max-w-7xl py-3 px-10 rounded-lg font-outfit text-center"
          >
            {t("Contact Us")}
          </a>
        </div>
      </div>

      <div className="w-full md:w-1/2 lg:w-1/2 flexb justify-start items-start">
        <div className="w-full max-w-md">
          {images && images.length > 0 && (
            <img
              src={images[currentImageIndex]}
              alt="Home Images"
              className="w-full h-full object-contain rounded-lg sm:w-[250px] sm:h-[250px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[400px] mx-auto"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
