import React, { useEffect, useState } from "react";
import CartItemList from "../Components/Cart/CartItemList";
import CartTotals from "../Components/Cart/CartTotals";
import useFetch from "../Components/Checkout/UseFetch";
import Footer from "../Components/Homepage/Homepage_footer";
import Header from "../Components/Homepage/Homepage_header";
import { useTranslation } from "react-i18next";
import { LazyLoadImage } from "react-lazy-load-image-component";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useDeleteFromCartMutation, useGetCartQuery, useUpdateCartMutation } from "../Redux/features/checkoutSlice";
import Skeleton from "react-loading-skeleton";

const Cart = () => {
  const userData: any = useAuthUser()
  const { data: cart, isLoading: load, isError: errorHere, refetch } = useGetCartQuery(userData.userId)
  const [updateCart, { isLoading: updateLoading, isError: updateError }] = useUpdateCartMutation()
  const [deleteCartItem, { isLoading: deleteLoading, isError: deleteError }] = useDeleteFromCartMutation()
  const [totall, setToatal] = useState<number>(0)


  const { t } = useTranslation();

  useEffect(() => {
    if (!load && cart) {
      console.log(cart)
      let totalAmount = 0;
      cart.cartitem.forEach((item: any) => {
        totalAmount += item.price * item.quantity;
      });
      setToatal(totalAmount);
    }
  }, [cart, load]);

  const addQunatity = async (item: any) => {
    try {
      let itemData: any = {
        updates: [{
          cartId: item.cartId,
          quantity: item.quantity + 1,
          productId: item.productId
        }
        ]
      }

      await updateCart(itemData).unwrap()
      refetch()

    } catch (error) {
      console.log(error)

    }
  }
  const removeQuantity = async (item: any) => {
    try {
      let itemData: any = {
        updates: [{
          cartId: item.cartId,
          quantity: item.quantity - 1,
          productId: item.productId
        }
        ]
      }
      await updateCart(itemData).unwrap()
      refetch()

    } catch (error) {
      console.log(error)

    }
  }
  const deleteFromCart = async (item: any) => {
    try {
      const data = {
        userId: userData.userId,
        productId: item.productId
      }
      await deleteCartItem(data).unwrap()
      refetch()

    } catch (error) {
      console.log(error)

    }
  }


  return (
    <>
      <Header />
      <div className="px-10 mx-auto pt-[24vh]">
        <h1 className="text-xl font-semibold font-outfit  ">
          {t("Shopping Cart")}{" "}
          <span className="bg-gray-200 py-[4px] px-4 font-bold rounded-lg">
            0{!load && cart?.cartitem.length}
          </span>
        </h1>
        <div className="flex py-4 gap-[10px]">
          <div className="w-[70%] flex flex-col gap-[10px] ">
            {load ? (
              <div className="w-full flex flex-col gap-[10px]">
                <Skeleton height={50}/>
                <Skeleton height={50}/>
              </div>
            ) : (
              cart?.cartitem?.map((item: any, index: number) => {
                return (
                  <div className="flex flex-row items-center gap-[20px] w-full justify-between p-2 px-4 rounded-[12px] bg-[#F7F7F7]">
                    <div className="flex felx-row items-center gap-[20px]">

                      <div className="w-[60px] h-[60px] rounded-[6px]">
                        <LazyLoadImage src={item.Product?.image[0]} className="w-full h-full rounded-[6px]" />
                      </div>
                      <span className=" font-outfit">{item.Product?.name}</span>
                    </div>

                    <div className="flex flex-row gap-[20px] font-outfit items-center">
                      <span className="text-[16px] font-[300] text-gray-500">{item.price} Rwf</span>
                      <div className="flex flex-row items-center gap-[10px] py-2 px-4 bg-white">
                        <span onClick={() => removeQuantity(item)} className="text-[20px] font-[600] cursor-pointer">-</span>
                        <span>{item.quantity}</span>
                        <span onClick={() => addQunatity(item)} className="text-[20px] font-[600] cursor-pointer">+</span>
                      </div>
                      <span className="text-[16px] font-[300] text-gray-500">{item.price * item.quantity} Rwf</span>
                      <div onClick={()=> deleteFromCart(item)} className=" cursor-pointer"><svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 0V1H0V3H1V16C1 16.5304 1.21071 17.0391 1.58579 17.4142C1.96086 17.7893 2.46957 18 3 18H13C13.5304 18 14.0391 17.7893 14.4142 17.4142C14.7893 17.0391 15 16.5304 15 16V3H16V1H11V0H5ZM3 3H13V16H3V3ZM5 5V14H7V5H5ZM9 5V14H11V5H9Z" fill="#C9974C" />
                      </svg>
                      </div>
                    </div>


                  </div>
                )
              })

            )}
          </div>
          <CartTotals
            subTotal={totall}
            deliveryFeePercentage={2}
            discountPercentage={2}
            total={totall}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
