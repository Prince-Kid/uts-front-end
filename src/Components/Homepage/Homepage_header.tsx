import React, { useState, useEffect, useRef } from "react";
//import logo from "../../asset/images/logo1.png";
import { useTranslation } from "react-i18next";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import Logout from "../../services/Logout";
import Bag from "../../asset/images/Bag.svg";
import logout from "../../asset/images/logout.svg";
import profileIcon from "../../asset/images/profileIcon.svg";
import logo from "../../asset/images/WhatsApp_Image_2024-10-22_at_11.12.54-removebg.png";
import i18n from "../../Lib/i18n";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import {
  useCartsQuery,
  useWishlistsQuery,
} from "../../Redux/productsPage/productSlice";

const Header: React.FC = () => {
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDark, setOpenDark] = useState(false);
  let currentLanguage = localStorage.getItem("lang") || "ENG";
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);
  const userData: any = useAuthUser();
  const { t } = useTranslation();

  const navigate = useNavigate();

  const handleLogout = Logout();

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    setIsLanguageDropdownOpen(false);
    setIsLanguageDropdownOpen(false);
    setIsMenuOpen(false);
    localStorage.setItem("lang", language);
    i18n.changeLanguage(language);
  };

  const userId = userData?.userId;
  const { data: cartsItems } = useCartsQuery(userId);
  const { data: wishlistsItems } = useWishlistsQuery(userId);
  const wishlistsNumber = wishlistsItems?.wishlist.length || 0;
  const cartsNumber = cartsItems?.cartitem.length || 0;

  const handelDarkMode = () => {
    const newDarkModeState = !openDark;
    setOpenDark(newDarkModeState);
    document.getElementById("root")?.classList.toggle("dark", newDarkModeState);
    localStorage.setItem("darkMode", newDarkModeState.toString());
  };

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setOpenDark(savedDarkMode);
    document.getElementById("root")?.classList.toggle("dark", savedDarkMode);
  }, []);

  return (
    <header className="bg-primary top-0 z-50 fixed w-full border-b-[1.2px] text-white flex flex-row  items-center justify-between px-4 md:px-10 xl:px-20 py-4">
      <div className="flex items-center flex-row gap-[20px]">
        <img src={logo} alt="" className="w-[80px] h-[80px] rounded-full" />
        <nav className="hidden lg:flex">
          <ul className="flex space-x-8 text-white font-poppins">
            <li>
              <a href="/" className="hover:text-gray-300">
                {t("Home")}
              </a>
            </li>
            <li>
              <a href="/#about-crafters" className="hover:text-gray-300">
                {t("About Us")}
              </a>
            </li>
            <li>
              <a href="/products" className="hover:text-gray-300">
                {t("Products")}
              </a>
            </li>
            <li>
              <a href="/#contact-us" className="hover:text-gray-300">
                {t("Contact Us")}
              </a>
            </li>
          </ul>
        </nav>
      </div>
      {userData ? (
        <div className="hidden lg:flex items-center space-x-8">
          <a href="/cart" className="relative">
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
                fill="white"
              />
            </svg>
            <div className=" absolute top-[-10px] left-[10px] p-1 h-[25px] w-[25px] flex items-center justify-center rounded-full bg-secondary">
              <span className="text-white text-[12px]">{cartsNumber}</span>
            </div>
          </a>
          <a href="" className="relative">
            <svg
              width="33"
              height="36"
              viewBox="0 0 33 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.5 8.25095C10.3127 1.2382 2.75 6.41124 2.75 13.7057C2.75 21 8.27672 24.8871 12.3224 28.3664C13.75 29.5941 15.125 30.75 16.5 30.75"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                opacity="0.5"
                d="M16.5 8.25095C22.6872 1.2382 30.25 6.41124 30.25 13.7057C30.25 21 24.7233 24.8871 20.6777 28.3664C19.25 29.5941 17.875 30.75 16.5 30.75"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>

            <div className=" absolute top-[-10px] left-[10px] p-1 h-[25px] w-[25px] flex items-center justify-center rounded-full bg-secondary">
              <span className="text-white text-[12px]">{wishlistsNumber}</span>
            </div>
          </a>

          <div className="flex items-center space-x-4">
            <img
              src={userData?.profile}
              alt="User Profile"
              className="w-12 h-12 rounded-full"
            />
            <i
              className={`fas fa-chevron-down ml-2 cursor-pointer ${
                isUserDropdownOpen ? "rotate-180" : ""
              }`}
              onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
            ></i>
            {isUserDropdownOpen && (
              <div className="absolute z-50 flex flex-col top-full mt-2 right-2 h-62 bg-[#012F5A] rounded-l-[20px] mb-4 border-2 border-[#ffffff3e] fade-in">
                <div className="flex flex-row gap-4 bg-[#0E3F6D] rounded-tl-[20px] p-7">
                  <div className="w-[60px] h-[60px] rounded-full overflow-hidden">
                    <img
                      src={userData.profile}
                      alt="profilePic"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="font-outfit text-lg text-white gap-2">
                    <p className="text-xl font-semibold">{userData.name}</p>
                    <p className="text-gray-200">{userData.email}</p>
                  </div>
                </div>
                <div className="flex flex-col space-y-6 mb-4 p-8">
                  <div
                    className="flex cursor-pointer flex-row gap-6 hover:scale-105 transition-transform duration-200"
                    onClick={() =>
                      navigate(userData.role === "vendor" ? "/user" : "/user")
                    }
                  >
                    <p className="font-outfit text-lg text-white flex gap-3">
                      <img src={profileIcon} alt="" />
                      {t("Profile")}
                    </p>
                  </div>
                  {userData.role === "vendor" && (
                    <div
                      className="flex flex-row gap-6 hover:scale-105 transition-transform duration-200"
                      onClick={() => navigate("/vendor")}
                    >
                      <a className="font-outfit text-lg text-white flex gap-3">
                        <img src={Bag} alt="" />
                        {t("My Shop")}
                      </a>
                    </div>
                  )}
                  <div
                    className="flex flex-row gap-6 hover:scale-105 transition-transform duration-200"
                    onClick={handleLogout}
                  >
                    <a
                      href=""
                      className="font-outfit text-lg text-white flex gap-3"
                    >
                      <img src={logout} alt="" />
                      {t("Logout")}
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
              className="flex items-center"
            >
              {selectedLanguage}
              <i
                className={`fas fa-chevron-down ml-2 ${
                  isLanguageDropdownOpen ? "rotate-180" : ""
                }`}
              ></i>
            </button>
            {isLanguageDropdownOpen && (
              <div className="absolute right-0 top-12 w-28 bg-primary border border-border rounded shadow-lg">
                <ul className="py-1">
                  <li>
                    <button
                      onClick={() => handleLanguageChange("ENG")}
                      className="block px-4 py-2 w-full text-left hover:scale-105 transition-transform duration-200"
                    >
                      ENG
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleLanguageChange("FR")}
                      className="block px-4 py-2 w-full text-left hover:scale-105 transition-transform duration-200"
                    >
                      FR
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleLanguageChange("KINY")}
                      className="block px-4 py-2 w-full text-left hover:scale-105 transition-transform duration-200"
                    >
                      KINY
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleLanguageChange("SW")}
                      className="block px-4 py-2 w-full text-left hover:scale-105 transition-transform duration-200"
                    >
                      SW
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div
            onClick={() => handelDarkMode()}
            className={`w-[50px] ml-4 ${
              openDark ? "bg-black" : "bg-white"
            } cursor-pointer p-1 rounded-[12px] border`}
          >
            <div
              className={`w-[20px] h-[20px] flex  items-center justify-center  rounded-full transition-all duration-600 ${
                openDark ? "ml-auto bg-white" : "bg-black"
              }`}
            >
              {openDark ? (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_1589_1625)">
                    <path
                      d="M9.375 3.125V1.25C9.375 1.08424 9.44085 0.925268 9.55806 0.808058C9.67527 0.690848 9.83424 0.625 10 0.625C10.1658 0.625 10.3247 0.690848 10.4419 0.808058C10.5592 0.925268 10.625 1.08424 10.625 1.25V3.125C10.625 3.29076 10.5592 3.44973 10.4419 3.56694C10.3247 3.68415 10.1658 3.75 10 3.75C9.83424 3.75 9.67527 3.68415 9.55806 3.56694C9.44085 3.44973 9.375 3.29076 9.375 3.125ZM15 10C15 10.9889 14.7068 11.9556 14.1573 12.7779C13.6079 13.6001 12.827 14.241 11.9134 14.6194C10.9998 14.9978 9.99445 15.0969 9.02455 14.9039C8.05464 14.711 7.16373 14.2348 6.46447 13.5355C5.7652 12.8363 5.289 11.9454 5.09607 10.9755C4.90315 10.0055 5.00216 9.00021 5.3806 8.08658C5.75904 7.17295 6.3999 6.39206 7.22215 5.84265C8.04439 5.29324 9.01109 5 10 5C11.3256 5.00145 12.5966 5.5287 13.5339 6.46607C14.4713 7.40343 14.9986 8.67436 15 10ZM13.75 10C13.75 9.25832 13.5301 8.5333 13.118 7.91661C12.706 7.29993 12.1203 6.81928 11.4351 6.53545C10.7498 6.25162 9.99584 6.17736 9.26841 6.32206C8.54098 6.46675 7.8728 6.8239 7.34835 7.34835C6.8239 7.8728 6.46675 8.54098 6.32206 9.26841C6.17736 9.99584 6.25162 10.7498 6.53545 11.4351C6.81928 12.1203 7.29993 12.706 7.91661 13.118C8.5333 13.5301 9.25832 13.75 10 13.75C10.9942 13.749 11.9475 13.3535 12.6505 12.6505C13.3535 11.9475 13.749 10.9942 13.75 10ZM4.55781 5.44219C4.67509 5.55946 4.83415 5.62535 5 5.62535C5.16585 5.62535 5.32491 5.55946 5.44219 5.44219C5.55946 5.32491 5.62535 5.16585 5.62535 5C5.62535 4.83415 5.55946 4.67509 5.44219 4.55781L4.19219 3.30781C4.07491 3.19054 3.91585 3.12465 3.75 3.12465C3.58415 3.12465 3.42509 3.19054 3.30781 3.30781C3.19054 3.42509 3.12465 3.58415 3.12465 3.75C3.12465 3.91585 3.19054 4.07491 3.30781 4.19219L4.55781 5.44219ZM4.55781 14.5578L3.30781 15.8078C3.19054 15.9251 3.12465 16.0841 3.12465 16.25C3.12465 16.4159 3.19054 16.5749 3.30781 16.6922C3.42509 16.8095 3.58415 16.8753 3.75 16.8753C3.91585 16.8753 4.07491 16.8095 4.19219 16.6922L5.44219 15.4422C5.50026 15.3841 5.54632 15.3152 5.57775 15.2393C5.60917 15.1634 5.62535 15.0821 5.62535 15C5.62535 14.9179 5.60917 14.8366 5.57775 14.7607C5.54632 14.6848 5.50026 14.6159 5.44219 14.5578C5.38412 14.4997 5.31518 14.4537 5.23931 14.4223C5.16344 14.3908 5.08212 14.3747 5 14.3747C4.91788 14.3747 4.83656 14.3908 4.76069 14.4223C4.68482 14.4537 4.61588 14.4997 4.55781 14.5578ZM15 5.625C15.0821 5.62506 15.1634 5.60895 15.2393 5.57759C15.3152 5.54622 15.3841 5.50021 15.4422 5.44219L16.6922 4.19219C16.8095 4.07491 16.8753 3.91585 16.8753 3.75C16.8753 3.58415 16.8095 3.42509 16.6922 3.30781C16.5749 3.19054 16.4159 3.12465 16.25 3.12465C16.0841 3.12465 15.9251 3.19054 15.8078 3.30781L14.5578 4.55781C14.4703 4.64522 14.4107 4.75663 14.3865 4.87793C14.3624 4.99924 14.3748 5.12498 14.4221 5.23924C14.4695 5.35351 14.5496 5.45116 14.6525 5.51983C14.7554 5.58849 14.8763 5.6251 15 5.625ZM15.4422 14.5578C15.3249 14.4405 15.1659 14.3747 15 14.3747C14.8341 14.3747 14.6751 14.4405 14.5578 14.5578C14.4405 14.6751 14.3747 14.8341 14.3747 15C14.3747 15.1659 14.4405 15.3249 14.5578 15.4422L15.8078 16.6922C15.8659 16.7503 15.9348 16.7963 16.0107 16.8277C16.0866 16.8592 16.1679 16.8753 16.25 16.8753C16.3321 16.8753 16.4134 16.8592 16.4893 16.8277C16.5652 16.7963 16.6341 16.7503 16.6922 16.6922C16.7503 16.6341 16.7963 16.5652 16.8277 16.4893C16.8592 16.4134 16.8753 16.3321 16.8753 16.25C16.8753 16.1679 16.8592 16.0866 16.8277 16.0107C16.7963 15.9348 16.7503 15.8659 16.6922 15.8078L15.4422 14.5578ZM3.75 10C3.75 9.83424 3.68415 9.67527 3.56694 9.55806C3.44973 9.44085 3.29076 9.375 3.125 9.375H1.25C1.08424 9.375 0.925268 9.44085 0.808058 9.55806C0.690848 9.67527 0.625 9.83424 0.625 10C0.625 10.1658 0.690848 10.3247 0.808058 10.4419C0.925268 10.5592 1.08424 10.625 1.25 10.625H3.125C3.29076 10.625 3.44973 10.5592 3.56694 10.4419C3.68415 10.3247 3.75 10.1658 3.75 10ZM10 16.25C9.83424 16.25 9.67527 16.3158 9.55806 16.4331C9.44085 16.5503 9.375 16.7092 9.375 16.875V18.75C9.375 18.9158 9.44085 19.0747 9.55806 19.1919C9.67527 19.3092 9.83424 19.375 10 19.375C10.1658 19.375 10.3247 19.3092 10.4419 19.1919C10.5592 19.0747 10.625 18.9158 10.625 18.75V16.875C10.625 16.7092 10.5592 16.5503 10.4419 16.4331C10.3247 16.3158 10.1658 16.25 10 16.25ZM18.75 9.375H16.875C16.7092 9.375 16.5503 9.44085 16.4331 9.55806C16.3158 9.67527 16.25 9.83424 16.25 10C16.25 10.1658 16.3158 10.3247 16.4331 10.4419C16.5503 10.5592 16.7092 10.625 16.875 10.625H18.75C18.9158 10.625 19.0747 10.5592 19.1919 10.4419C19.3092 10.3247 19.375 10.1658 19.375 10C19.375 9.83424 19.3092 9.67527 19.1919 9.55806C19.0747 9.44085 18.9158 9.375 18.75 9.375Z"
                      fill="black"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1589_1625">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              ) : (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.99935 18.3333C14.6018 18.3333 18.3327 14.6025 18.3327 10C18.3327 9.61417 17.7543 9.55001 17.5552 9.88084C17.1304 10.5845 16.551 11.1822 15.861 11.6287C15.171 12.0753 14.3884 12.359 13.5725 12.4583C12.7567 12.5576 11.9289 12.4699 11.1519 12.2019C10.3749 11.9339 9.66909 11.4926 9.08792 10.9114C8.50674 10.3303 8.06545 9.62445 7.79745 8.84746C7.52946 8.07048 7.44179 7.2427 7.5411 6.42681C7.6404 5.61093 7.92407 4.82834 8.37063 4.13833C8.81718 3.44831 9.4149 2.86897 10.1185 2.44417C10.4493 2.24417 10.3852 1.66667 9.99935 1.66667C5.39685 1.66667 1.66602 5.39751 1.66602 10C1.66602 14.6025 5.39685 18.3333 9.99935 18.3333Z"
                    fill="#FEFEFE"
                  />
                </svg>
              )}
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-row items-center justify-center">
            <a
              href="/login"
              className="hidden lg:flex items-center bg-secondary px-6 py-2 mr-20 rounded-lg mb-4 md:mb-0 md:text-lg cursor-pointer"
            >
              {t("Login")}
              <i className="fas fa-arrow-right ml-2"></i>
            </a>
            <div className="hidden relative mr-20 lg:block">
              <button
                onClick={() =>
                  setIsLanguageDropdownOpen(!isLanguageDropdownOpen)
                }
                className="flex items-center"
              >
                {selectedLanguage}
                <i
                  className={`fas fa-chevron-down ml-2 ${
                    isLanguageDropdownOpen ? "rotate-180" : ""
                  }`}
                ></i>
              </button>
              {isLanguageDropdownOpen && (
                <div className="absolute right-0 top-12 w-28 bg-primary border border-border rounded shadow-lg">
                  <ul className="py-1">
                    <li>
                      <button
                        onClick={() => handleLanguageChange("ENG")}
                        className="block px-4 py-2 w-full text-left hover:scale-105 transition-transform duration-200"
                      >
                        ENG
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => handleLanguageChange("FR")}
                        className="block px-4 py-2 w-full text-left hover:scale-105 transition-transform duration-200"
                      >
                        FR
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => handleLanguageChange("KINY")}
                        className="block px-4 py-2 w-full text-left hover:scale-105 transition-transform duration-200"
                      >
                        KINY
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => handleLanguageChange("SW")}
                        className="block px-4 py-2 w-full text-left hover:scale-105 transition-transform duration-200"
                      >
                        SW
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      <div className="flex lg:hidden items-center">
        <div className="flex flex-row items-center gap-20px">
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-3xl sm:pr-6 md:pr-12"
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>

          <div
            onClick={() => handelDarkMode()}
            className={`w-[50px] mr-4 ${
              openDark ? "bg-black" : "bg-white"
            } cursor-pointer p-1 rounded-[12px] border`}
          >
            <div
              className={`w-[20px] h-[20px] flex  items-center justify-center  rounded-full transition-all duration-600 ${
                openDark ? "ml-auto bg-white" : "bg-black"
              }`}
            >
              {openDark ? (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_1589_1625)">
                    <path
                      d="M9.375 3.125V1.25C9.375 1.08424 9.44085 0.925268 9.55806 0.808058C9.67527 0.690848 9.83424 0.625 10 0.625C10.1658 0.625 10.3247 0.690848 10.4419 0.808058C10.5592 0.925268 10.625 1.08424 10.625 1.25V3.125C10.625 3.29076 10.5592 3.44973 10.4419 3.56694C10.3247 3.68415 10.1658 3.75 10 3.75C9.83424 3.75 9.67527 3.68415 9.55806 3.56694C9.44085 3.44973 9.375 3.29076 9.375 3.125ZM15 10C15 10.9889 14.7068 11.9556 14.1573 12.7779C13.6079 13.6001 12.827 14.241 11.9134 14.6194C10.9998 14.9978 9.99445 15.0969 9.02455 14.9039C8.05464 14.711 7.16373 14.2348 6.46447 13.5355C5.7652 12.8363 5.289 11.9454 5.09607 10.9755C4.90315 10.0055 5.00216 9.00021 5.3806 8.08658C5.75904 7.17295 6.3999 6.39206 7.22215 5.84265C8.04439 5.29324 9.01109 5 10 5C11.3256 5.00145 12.5966 5.5287 13.5339 6.46607C14.4713 7.40343 14.9986 8.67436 15 10ZM13.75 10C13.75 9.25832 13.5301 8.5333 13.118 7.91661C12.706 7.29993 12.1203 6.81928 11.4351 6.53545C10.7498 6.25162 9.99584 6.17736 9.26841 6.32206C8.54098 6.46675 7.8728 6.8239 7.34835 7.34835C6.8239 7.8728 6.46675 8.54098 6.32206 9.26841C6.17736 9.99584 6.25162 10.7498 6.53545 11.4351C6.81928 12.1203 7.29993 12.706 7.91661 13.118C8.5333 13.5301 9.25832 13.75 10 13.75C10.9942 13.749 11.9475 13.3535 12.6505 12.6505C13.3535 11.9475 13.749 10.9942 13.75 10ZM4.55781 5.44219C4.67509 5.55946 4.83415 5.62535 5 5.62535C5.16585 5.62535 5.32491 5.55946 5.44219 5.44219C5.55946 5.32491 5.62535 5.16585 5.62535 5C5.62535 4.83415 5.55946 4.67509 5.44219 4.55781L4.19219 3.30781C4.07491 3.19054 3.91585 3.12465 3.75 3.12465C3.58415 3.12465 3.42509 3.19054 3.30781 3.30781C3.19054 3.42509 3.12465 3.58415 3.12465 3.75C3.12465 3.91585 3.19054 4.07491 3.30781 4.19219L4.55781 5.44219ZM4.55781 14.5578L3.30781 15.8078C3.19054 15.9251 3.12465 16.0841 3.12465 16.25C3.12465 16.4159 3.19054 16.5749 3.30781 16.6922C3.42509 16.8095 3.58415 16.8753 3.75 16.8753C3.91585 16.8753 4.07491 16.8095 4.19219 16.6922L5.44219 15.4422C5.50026 15.3841 5.54632 15.3152 5.57775 15.2393C5.60917 15.1634 5.62535 15.0821 5.62535 15C5.62535 14.9179 5.60917 14.8366 5.57775 14.7607C5.54632 14.6848 5.50026 14.6159 5.44219 14.5578C5.38412 14.4997 5.31518 14.4537 5.23931 14.4223C5.16344 14.3908 5.08212 14.3747 5 14.3747C4.91788 14.3747 4.83656 14.3908 4.76069 14.4223C4.68482 14.4537 4.61588 14.4997 4.55781 14.5578ZM15 5.625C15.0821 5.62506 15.1634 5.60895 15.2393 5.57759C15.3152 5.54622 15.3841 5.50021 15.4422 5.44219L16.6922 4.19219C16.8095 4.07491 16.8753 3.91585 16.8753 3.75C16.8753 3.58415 16.8095 3.42509 16.6922 3.30781C16.5749 3.19054 16.4159 3.12465 16.25 3.12465C16.0841 3.12465 15.9251 3.19054 15.8078 3.30781L14.5578 4.55781C14.4703 4.64522 14.4107 4.75663 14.3865 4.87793C14.3624 4.99924 14.3748 5.12498 14.4221 5.23924C14.4695 5.35351 14.5496 5.45116 14.6525 5.51983C14.7554 5.58849 14.8763 5.6251 15 5.625ZM15.4422 14.5578C15.3249 14.4405 15.1659 14.3747 15 14.3747C14.8341 14.3747 14.6751 14.4405 14.5578 14.5578C14.4405 14.6751 14.3747 14.8341 14.3747 15C14.3747 15.1659 14.4405 15.3249 14.5578 15.4422L15.8078 16.6922C15.8659 16.7503 15.9348 16.7963 16.0107 16.8277C16.0866 16.8592 16.1679 16.8753 16.25 16.8753C16.3321 16.8753 16.4134 16.8592 16.4893 16.8277C16.5652 16.7963 16.6341 16.7503 16.6922 16.6922C16.7503 16.6341 16.7963 16.5652 16.8277 16.4893C16.8592 16.4134 16.8753 16.3321 16.8753 16.25C16.8753 16.1679 16.8592 16.0866 16.8277 16.0107C16.7963 15.9348 16.7503 15.8659 16.6922 15.8078L15.4422 14.5578ZM3.75 10C3.75 9.83424 3.68415 9.67527 3.56694 9.55806C3.44973 9.44085 3.29076 9.375 3.125 9.375H1.25C1.08424 9.375 0.925268 9.44085 0.808058 9.55806C0.690848 9.67527 0.625 9.83424 0.625 10C0.625 10.1658 0.690848 10.3247 0.808058 10.4419C0.925268 10.5592 1.08424 10.625 1.25 10.625H3.125C3.29076 10.625 3.44973 10.5592 3.56694 10.4419C3.68415 10.3247 3.75 10.1658 3.75 10ZM10 16.25C9.83424 16.25 9.67527 16.3158 9.55806 16.4331C9.44085 16.5503 9.375 16.7092 9.375 16.875V18.75C9.375 18.9158 9.44085 19.0747 9.55806 19.1919C9.67527 19.3092 9.83424 19.375 10 19.375C10.1658 19.375 10.3247 19.3092 10.4419 19.1919C10.5592 19.0747 10.625 18.9158 10.625 18.75V16.875C10.625 16.7092 10.5592 16.5503 10.4419 16.4331C10.3247 16.3158 10.1658 16.25 10 16.25ZM18.75 9.375H16.875C16.7092 9.375 16.5503 9.44085 16.4331 9.55806C16.3158 9.67527 16.25 9.83424 16.25 10C16.25 10.1658 16.3158 10.3247 16.4331 10.4419C16.5503 10.5592 16.7092 10.625 16.875 10.625H18.75C18.9158 10.625 19.0747 10.5592 19.1919 10.4419C19.3092 10.3247 19.375 10.1658 19.375 10C19.375 9.83424 19.3092 9.67527 19.1919 9.55806C19.0747 9.44085 18.9158 9.375 18.75 9.375Z"
                      fill="black"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1589_1625">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              ) : (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.99935 18.3333C14.6018 18.3333 18.3327 14.6025 18.3327 10C18.3327 9.61417 17.7543 9.55001 17.5552 9.88084C17.1304 10.5845 16.551 11.1822 15.861 11.6287C15.171 12.0753 14.3884 12.359 13.5725 12.4583C12.7567 12.5576 11.9289 12.4699 11.1519 12.2019C10.3749 11.9339 9.66909 11.4926 9.08792 10.9114C8.50674 10.3303 8.06545 9.62445 7.79745 8.84746C7.52946 8.07048 7.44179 7.2427 7.5411 6.42681C7.6404 5.61093 7.92407 4.82834 8.37063 4.13833C8.81718 3.44831 9.4149 2.86897 10.1185 2.44417C10.4493 2.24417 10.3852 1.66667 9.99935 1.66667C5.39685 1.66667 1.66602 5.39751 1.66602 10C1.66602 14.6025 5.39685 18.3333 9.99935 18.3333Z"
                    fill="#FEFEFE"
                  />
                </svg>
              )}
            </div>
          </div>
          {isMenuOpen && (
            <div className="absolute top-full left-0 w-full bg-primary text-white p-8 sm:p-6 md:p-8 flex flex-col space-y-4 z-50">
              <nav className="flex flex-col space-y-4">
                <a href="/" className="hover:text-gray-300">
                  Home
                </a>
                <a href="/#about-crafters" className="hover:text-gray-300">
                  About Us
                </a>
                <a href="/products" className="hover:text-gray-300">
                  Products
                </a>
                <a href="/#contact-us" className="hover:text-gray-300">
                  Contact Us
                </a>
                {userData ? (
                  <div className="flex flex-col space-y-2">
                    <a href="#" className="hover:text-gray-300">
                      Cartitems({cartsNumber})
                    </a>
                    <a href="#" className="hover:text-gray-300">
                      Wishlists({wishlistsNumber})
                    </a>
                    <div
                      className="flex flex-row gap-6 hover:scale-105 transition-transform duration-200"
                      onClick={handleLogout}
                    >
                      <a
                        href=""
                        className="hover:text-gray-300"
                        onClick={() => handleLogout()}
                      >
                        Logout
                      </a>
                    </div>
                  </div>
                ) : (
                  <a href="/login" className="pr-60 hover:text-gray-300">
                    Login
                  </a>
                )}
                <div className="relative">
                  <button
                    onClick={() =>
                      setIsLanguageDropdownOpen(!isLanguageDropdownOpen)
                    }
                    className="flex items-center"
                  >
                    {selectedLanguage}
                    <i className="fas fa-chevron-down ml-2"></i>
                  </button>
                  {isLanguageDropdownOpen && (
                    <div className="top-12 w-28 bg-primary border border-border rounded shadow-lg">
                      <ul className="py-1">
                        <li>
                          <button
                            onClick={() => handleLanguageChange("ENG")}
                            className="block px-4 py-2 w-full text-left hover:scale-105 transition-transform duration-200"
                          >
                            ENG
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => handleLanguageChange("FR")}
                            className="block px-4 py-2 w-full text-left hover:scale-105 transition-transform duration-200"
                          >
                            FR
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => handleLanguageChange("KINY")}
                            className="block px-4 py-2 w-full text-left hover:scale-105 transition-transform duration-200"
                          >
                            KINY
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
export default Header;
