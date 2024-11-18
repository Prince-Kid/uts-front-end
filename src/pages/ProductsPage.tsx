import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActiveCategory } from "../Redux/productsPage/categorySlice";
import { RootState } from "../Redux/store";
import Search from "../Components/ProductsPage/searchProduct";
import { useAllProductsQuery } from "../Redux/productsPage/productSlice";
import ProductCard from "../Components/ProductsPage/productCard";
import Pagination from "../Components/ProductsPage/pagination";
import Footer from "../Components/Homepage/Homepage_footer";
import LoadingFrame from "../Constants/frameLoader";
import { useTranslation } from "react-i18next";
import NavBar from "../Components/navBar";
import VoiceflowChatWidget from "../Components/ChatBot";
import Header from "../Components/Homepage/Homepage_header";
interface Product {
  productId: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

const Products = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state: RootState) => state.search);
  const activeCategory: string | null = useSelector(
    (state: RootState) => state.category.activeCategory
  );
  const { data: products, isLoading, isError } = useAllProductsQuery({});
  // console.log(products)
  const productsPerPage = 9;
  const currentPage = useSelector(
    (state: RootState) => state.pagination.currentPage
  );

  const handleCategoryClick = (category: string) => {
    dispatch(setActiveCategory(category));
  };

  const filteredProducts = activeCategory
    ? products?.filter(
        (product: Product) =>
          product.category === activeCategory &&
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : products?.filter((product: Product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts?.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const { t } = useTranslation();
  const categories = [
    {
      id: "001",
      label: t("Electronics"),
      value: "Electronics",
    },
    {
      id: "002",
      label: t("Food"),
      value: "Food",
    },
    {
      id: "003",
      label: t("Fruits"),
      value: "Fruits",
    },
    {
      id: "004",
      label: t("Mechanism"),
      value: "Mechanism",
    },
    {
      id: "005",
      label: t("Sport Kit"),
      value: "Sport Kit",
    },
    {
      id: "006",
      label: t("Clothing"),
      value: "Clothing",
    },
    {
      id: "007",
      label: t("Books"),
      value: "Books",
    },
    {
      id: "008",
      label: t("Furniture"),
      value: "Furniture",
    },
    {
      id: "009",
      label: t("Toys"),
      value: "Toys",
    },
    {
      id: "010",
      label: t("Stationery"),
      value: "Stationery",
    },
    {
      id: "011",
      label: t("Cars"),
      value: "Cars",
    },
    {
      id: "012",
      label: t("Shoes"),
      value: "Shoes",
    },
  ];

  return (
    <div className="flex flex-col">
      <Header />
      <div className="mt-32 flex flex-col gap-[20px] px-10 p-6 mb-20">
        <div className="flex flex-col-reverse gap-4 justify-between items-center md:flex-row">
          <div className="flex flex-row gap-[14px] items-center font-outfit">
            <span
              className="text-base text-gray-400 hover:text-primary cursor-pointer md:text-[18px]"
              onClick={() => dispatch(setActiveCategory(null))}
            >
              {t("Products")}
            </span>
            <span className="text-black font-[800]">/</span>
            <span className="text-base text-black font-[800] md:text-[18px]">
              {t(activeCategory || "All Products")}
            </span>
          </div>
          <Search />
        </div>

        <div className="flex flex-col gap-[20px] md:flex-row">
          <div className="flex flex-col gap-[10px] w-full md:w-1/4">
            <h1 className="text-[16px] font-[700] md:text-lg">
              {t("Categories")}
            </h1>
            <ul className="flex gap-4 flex-row overflow-auto md:flex-col custom-scrollbar">
              {categories.map((item) => {
                const isActive = activeCategory === item.value;
                return (
                  <li
                    key={item.id}
                    className={`text-[14px] font-outfit text-gray-500 ${
                      isActive ? "text-secondary" : "hover:text-primary"
                    } cursor-pointer md:text-lg`}
                    onClick={() => handleCategoryClick(item.value)}
                  >
                    {item.label}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-[30px] w-full ">
            {isLoading ? (
              Array.from({ length: 9 }).map((_, index) => (
                <LoadingFrame key={index} />
              ))
            ) : filteredProducts?.length === 0 ? (
              <div className=" flex justify-center items-center col-span-2 lg:col-span-3">
                <h2 className="text-lg font-poppins text-secondary md:text-xl lg:text-2xl">
                  {t("No Products Available")}
                </h2>
              </div>
            ) : (
              <>
                {currentProducts?.map((product: Product, index: number) => {
                  return (
                    <ProductCard key={product.productId} product={product} />
                  );
                })}
              </>
            )}
          </div>
        </div>
        <Pagination
          totalProducts={filteredProducts?.length || 0}
          productsPerPage={productsPerPage}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Products;
