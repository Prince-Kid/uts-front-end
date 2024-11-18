import React, { useEffect, useState } from "react";
import OrderSummary from "../Components/Checkout/OrderSummary";
import Payment from "../Components/Checkout/Payment";
import useFetch from "../Components/Checkout/UseFetch";
import Footer from "../Components/Homepage/Homepage_footer";
import Header from "../Components/Homepage/Homepage_header";
import { useTranslation } from "react-i18next";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useGetCartQuery } from "../Redux/features/checkoutSlice";
import Skeleton from "react-loading-skeleton";

const Checkout = () => {
   


  const userData: any = useAuthUser()
  const { data: cart, isLoading: load, isError: errorHere,refetch } = useGetCartQuery(userData.userId)
  const [totall,setToatal] = useState<number>(0)
  const {
    cartItems,
    setCartItems,
    subTotal,
    total,
    discountPercentage,
    deliveryFeePercentage,
  } = useFetch(`${process.env.BACKEND_API_URL}/products`);

  const handleDelete = (id: number) => {
    setCartItems((products) => products.filter((item) => item.id !== id));
  };
  const { t } = useTranslation();


  useEffect(() => {
    if (!load && cart) {
      let totalAmount = 0;
      cart.cartitem.forEach((item: any) => {
        totalAmount += item.price * item.quantity;
      });
      setToatal(totalAmount);
    }
  }, [cart, load]);
  return (
    <>
      <Header />
      <div className="all w-full h-full mt-20  bg-gray-50 ">
        {load ? (
          <div className="w-full flex flex-row gap-[40px]">
            <Skeleton height={200}/>
            <Skeleton height={200}/>
          </div>
        ) : (
        <div className=" flex gap-[20px] justify-between  w-full">
          <Payment totalAmount={totall} />
          <OrderSummary
            cartItems={cart.cartitem}
            subTotal={totall}
            deliveryFeePercentage={2}
            discountPercentage={2}
            total={totall}
            handleDelete={handleDelete}
            refetch={refetch}
          />
        </div>
        )}
        
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
