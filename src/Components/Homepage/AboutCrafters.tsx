import React from "react";
import { useTranslation } from "react-i18next";
const AboutCrafters: React.FC = () => {
  const imageUrl =
    "https://www.vocso.com/blog/wp-content/uploads/2022/02/eCommerce-Website-Features-1920-x-1080.jpg";
  const imageUrl2 =
    "https://st.depositphotos.com/1001877/3814/i/450/depositphotos_38143799-stock-photo-e-commerce-shopping-cart-with.jpg";
  const { t } = useTranslation();
  return (
    <section
      className="py-16 px-6 sm:px-12 md:px-24 bg-bgwhite font-outfit text-lg md:text-xl min-h-screen"
      id="about-crafters"
    >
      <h2 className="text-2xl sm:text-3xl font-bold mb-12 mt-32 text-textprimary">
        {" "}
        {t("ABOUT")}
        <span className="text-secondary"> UTS </span>
      </h2>
      <div className="container flex flex-col xl:flex-row gap-8 md:gap-20">
        <div className="flex flex-row relative w-full xl:w-1/2   mb-8">
          <img
            src={imageUrl}
            alt="About Crafters"
            className="w-[100%] xl:w-[70%] h-60 sm:h-80 rounded-lg object-cover"
          />
          <img
            src={imageUrl2}
            alt="About Crafters"
            className="w-[60%] absolute bottom-[-40px] right-0 h-[30vh] xl:h-[40vh] rounded-lg object-cover"
          />
        </div>
        <div className="w-full text-center xl:text-start xl:w-1/2">
          <p className="text-textprimary text-base text-[16px]">
            {t("about1")}
            <br />
            {t("about2")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutCrafters;
