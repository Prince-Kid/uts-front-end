import React, { useEffect } from "react";
import { useSelectStoresQuery } from "../../Redux/Admin/sellersSlice";
import { useAllOrdersQuery, useGetSellerOrderQuery } from "../../Redux/OrderSlice";
import { useSelectUsersQuery } from "../../Redux/Admin/usersSlice";
import InteractionCard from "../../Components/dashboard/InteractionCard";
import OrderStatus from "../../Components/OrderTracking/orderStatus";
import SellerTopProduct from "../../Components/Analytics/SellerAnalytics/TopProducts";
import SellerOrderStatus from "../../Components/Analytics/SellerAnalytics/SellerOrderStatus";
import SellerSellingReport from "../../Components/Analytics/SellerAnalytics/AnnualSellingReport";
import { useNavigate } from "react-router-dom";
import { useSelectFeddbackQuery } from "../../Redux/features/sellerSlice";


const VendorAnalytics = () => {
    const navigate = useNavigate() 
  const { data: sellers = [], refetch: refetchSellers } = useSelectStoresQuery(
    {}
  );
  const approvedSellers = sellers.filter(
    (seller: any) => seller.status === "approved"
  );

  const { data: orders = [], refetch: refetchOrders } = useAllOrdersQuery({});
  const transactions = orders.filter(
    (order: any) => order.status === "delivered"
  );

  const { data: users = [], refetch: refetchUsers } = useSelectUsersQuery({});

  useEffect(() => {
    refetchSellers();
    refetchUsers();
    refetchOrders();
  }, [refetchSellers, refetchUsers, refetchOrders]);

  const { data: responseData, error, isLoading } = useSelectFeddbackQuery({})
  const vendorData:any = localStorage.getItem("vendorData")
  const vendor = JSON.parse(vendorData)
  function getAuthCookie() {
      const cookies = document.cookie.split(';');
      for (let cookie of cookies) {
          const [name, value] = cookie.trim().split('=');
          if (name === '_auth') {
              return decodeURIComponent(value);
          }
      }
      return null;
  }

  const token = getAuthCookie();
  const { data: sellerOrders, isLoading:sellerLoading, error:sellerError } = useGetSellerOrderQuery({ token,vendorId:vendor?.vendorId });



  const cardData = [
    {
      name: "Reviews",
      numbers: responseData ? responseData.feedback.filter((data: any) => data.Product.vendorId === vendor.vendorId).length : 0,
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.4"
            d="M14.9984 5.96675C14.9484 5.95841 14.8901 5.95841 14.8401 5.96675C13.6901 5.92508 12.7734 4.98341 12.7734 3.81675C12.7734 2.62508 13.7318 1.66675 14.9234 1.66675C16.1151 1.66675 17.0734 2.63341 17.0734 3.81675C17.0651 4.98341 16.1484 5.92508 14.9984 5.96675Z"
            stroke="#292D32"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            opacity="0.4"
            d="M14.1393 12.0336C15.2809 12.2252 16.5393 12.0252 17.4226 11.4336C18.5976 10.6502 18.5976 9.36691 17.4226 8.58358C16.5309 7.99188 15.2559 7.79188 14.1143 7.99188"
            stroke="#292D32"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            opacity="0.4"
            d="M4.97246 5.96675C5.02246 5.95841 5.08079 5.95841 5.13079 5.96675C6.28079 5.92508 7.19746 4.98341 7.19746 3.81675C7.19746 2.62508 6.23913 1.66675 5.04746 1.66675C3.85579 1.66675 2.89746 2.63341 2.89746 3.81675C2.90579 4.98341 3.82246 5.92508 4.97246 5.96675Z"
            stroke="#292D32"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            opacity="0.4"
            d="M5.83157 12.0336C4.68991 12.2252 3.43158 12.0252 2.54824 11.4336C1.37324 10.6502 1.37324 9.36691 2.54824 8.58358C3.43991 7.99188 4.71491 7.79188 5.85657 7.99188"
            stroke="#292D32"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M10.0004 12.1918C9.95041 12.1835 9.89207 12.1835 9.84207 12.1918C8.69207 12.1502 7.77539 11.2085 7.77539 10.0418C7.77539 8.85017 8.73374 7.89185 9.92541 7.89185C11.1171 7.89185 12.0754 8.8585 12.0754 10.0418C12.0671 11.2085 11.1504 12.1585 10.0004 12.1918Z"
            stroke="#292D32"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M7.57559 14.817C6.40059 15.6004 6.40059 16.8836 7.57559 17.667C8.90892 18.5586 11.0923 18.5586 12.4256 17.667C13.6006 16.8836 13.6006 15.6004 12.4256 14.817C11.1006 13.9337 8.90892 13.9337 7.57559 14.817Z"
            stroke="#292D32"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
    },
    {
      name: "Orders",
      numbers: sellerOrders ? sellerOrders.length : 0,
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.4"
            d="M14.9984 5.96675C14.9484 5.95841 14.8901 5.95841 14.8401 5.96675C13.6901 5.92508 12.7734 4.98341 12.7734 3.81675C12.7734 2.62508 13.7318 1.66675 14.9234 1.66675C16.1151 1.66675 17.0734 2.63341 17.0734 3.81675C17.0651 4.98341 16.1484 5.92508 14.9984 5.96675Z"
            stroke="#292D32"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            opacity="0.4"
            d="M14.1393 12.0336C15.2809 12.2252 16.5393 12.0252 17.4226 11.4336C18.5976 10.6502 18.5976 9.36691 17.4226 8.58358C16.5309 7.99188 15.2559 7.79188 14.1143 7.99188"
            stroke="#292D32"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            opacity="0.4"
            d="M4.97246 5.96675C5.02246 5.95841 5.08079 5.95841 5.13079 5.96675C6.28079 5.92508 7.19746 4.98341 7.19746 3.81675C7.19746 2.62508 6.23913 1.66675 5.04746 1.66675C3.85579 1.66675 2.89746 2.63341 2.89746 3.81675C2.90579 4.98341 3.82246 5.92508 4.97246 5.96675Z"
            stroke="#292D32"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            opacity="0.4"
            d="M5.83157 12.0336C4.68991 12.2252 3.43158 12.0252 2.54824 11.4336C1.37324 10.6502 1.37324 9.36691 2.54824 8.58358C3.43991 7.99188 4.71491 7.79188 5.85657 7.99188"
            stroke="#292D32"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M10.0004 12.1918C9.95041 12.1835 9.89207 12.1835 9.84207 12.1918C8.69207 12.1502 7.77539 11.2085 7.77539 10.0418C7.77539 8.85017 8.73374 7.89185 9.92541 7.89185C11.1171 7.89185 12.0754 8.8585 12.0754 10.0418C12.0671 11.2085 11.1504 12.1585 10.0004 12.1918Z"
            stroke="#292D32"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M7.57559 14.817C6.40059 15.6004 6.40059 16.8836 7.57559 17.667C8.90892 18.5586 11.0923 18.5586 12.4256 17.667C13.6006 16.8836 13.6006 15.6004 12.4256 14.817C11.1006 13.9337 8.90892 13.9337 7.57559 14.817Z"
            stroke="#292D32"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
    },
    // {
    //   name: "Transactions",
    //   numbers: transactions.length,
    //   icon: (
    //     <svg
    //       width="20"
    //       height="21"
    //       viewBox="0 0 20 21"
    //       fill="none"
    //       xmlns="http://www.w3.org/2000/svg"
    //     >
    //       <g opacity="0.4">
    //         <path
    //           d="M8.95735 14.55V16.2417C8.95735 17.675 7.62404 18.8334 5.98237 18.8334C4.34071 18.8334 2.99902 17.675 2.99902 16.2417V14.55C2.99902 15.9834 4.33237 17 5.98237 17C7.62404 17 8.95735 15.975 8.95735 14.55Z"
    //           stroke="#292D32"
    //           stroke-linecap="round"
    //           stroke-linejoin="round"
    //         />
    //         <path
    //           d="M8.95784 12.2581C8.95784 12.6747 8.84118 13.0581 8.64118 13.3914C8.14952 14.1997 7.14118 14.7081 5.97451 14.7081C4.80784 14.7081 3.7995 14.1914 3.30784 13.3914C3.10784 13.0581 2.99121 12.6747 2.99121 12.2581C2.99121 11.5414 3.32453 10.8997 3.85786 10.4331C4.39953 9.95805 5.14117 9.6748 5.96617 9.6748C6.79117 9.6748 7.53286 9.96639 8.07453 10.4331C8.62451 10.8914 8.95784 11.5414 8.95784 12.2581Z"
    //           stroke="#292D32"
    //           stroke-linecap="round"
    //           stroke-linejoin="round"
    //         />
    //         <path
    //           d="M8.95735 12.2584V14.5501C8.95735 15.9834 7.62404 17.0001 5.98237 17.0001C4.34071 17.0001 2.99902 15.9751 2.99902 14.5501V12.2584C2.99902 10.8251 4.33237 9.66675 5.98237 9.66675C6.80737 9.66675 7.54906 9.95841 8.09073 10.4251C8.6241 10.8917 8.95735 11.5417 8.95735 12.2584Z"
    //           stroke="#292D32"
    //           stroke-linecap="round"
    //           stroke-linejoin="round"
    //         />
    //       </g>
    //       <path
    //         d="M18.3338 9.64175V11.3584C18.3338 11.8167 17.9672 12.1917 17.5005 12.2084H15.8672C14.9672 12.2084 14.1422 11.5501 14.0672 10.6501C14.0172 10.1251 14.2172 9.63341 14.5672 9.29175C14.8755 8.97508 15.3005 8.79175 15.7672 8.79175H17.5005C17.9672 8.80841 18.3338 9.18341 18.3338 9.64175Z"
    //         stroke="#292D32"
    //         stroke-linecap="round"
    //         stroke-linejoin="round"
    //       />
    //       <path
    //         d="M1.66699 9.25008V7.58341C1.66699 5.31675 3.03366 3.73341 5.15866 3.46675C5.37533 3.43341 5.60033 3.41675 5.83366 3.41675H13.3337C13.5503 3.41675 13.7587 3.42507 13.9587 3.45841C16.1087 3.70841 17.5003 5.30008 17.5003 7.58341V8.79176H15.767C15.3003 8.79176 14.8753 8.97508 14.567 9.29175C14.217 9.63341 14.017 10.1251 14.067 10.6501C14.142 11.5501 14.967 12.2084 15.867 12.2084H17.5003V13.4167C17.5003 15.9167 15.8337 17.5834 13.3337 17.5834H11.2503"
    //         stroke="#292D32"
    //         stroke-linecap="round"
    //         stroke-linejoin="round"
    //       />
    //     </svg>
    //   ),
    // },
    // {
    //   name: "Orders",
    //   numbers: orders.length,
    //   icon: (
    //     <svg
    //       width="20"
    //       height="20"
    //       viewBox="0 0 20 20"
    //       fill="none"
    //       xmlns="http://www.w3.org/2000/svg"
    //     >
    //       <path
    //         d="M11.6663 1.66675C13.333 1.66675 14.1663 2.50841 14.1663 4.19175V10.0667C14.1663 11.7251 12.9913 12.3667 11.5497 11.5001L10.4497 10.8334C10.1997 10.6834 9.79967 10.6834 9.54967 10.8334L8.44967 11.5001C7.00801 12.3667 5.83301 11.7251 5.83301 10.0667V4.19175C5.83301 2.50841 6.66634 1.66675 8.33301 1.66675H11.6663Z"
    //         stroke="#292D32"
    //         stroke-linecap="round"
    //         stroke-linejoin="round"
    //       />
    //       <path
    //         opacity="0.4"
    //         d="M5.68366 4.1583C2.84199 4.6333 1.66699 6.3833 1.66699 9.91667V12.4417C1.66699 16.65 3.33366 18.3333 7.50032 18.3333H12.5003C16.667 18.3333 18.3337 16.65 18.3337 12.4417V9.91667C18.3337 6.32497 17.117 4.56663 14.167 4.1333"
    //         stroke="#292D32"
    //         stroke-linecap="round"
    //         stroke-linejoin="round"
    //       />
    //     </svg>
    //   ),
    // },
  ];
  return (
    <div className="items-center flex flex-col md:w-full xl:ml-[5%] xl:mt-5">
      <div
        
        className="grid gap-5 sm:grid-cols-2 grid-cols-1 md:w-full"
      >
        {cardData.map((item, index) => (
          <InteractionCard key={index} data={item} />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-[10px]">

      <div className=" w-full">
        <SellerOrderStatus />
      </div>

      <div className="mt-5 w-full">
        <SellerTopProduct />
      </div>
      </div>

      <div className="mt-5 w-full mb-8">
        <SellerSellingReport />
      </div>
    </div>
  );
};

export default VendorAnalytics;
