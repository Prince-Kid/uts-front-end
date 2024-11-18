import { apiSlice } from "./features/ApiSlice";

const OrderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrder: builder.query({
      query: ({ orderId }) => ({
        url: `/order/getOrder/${orderId}`,
      }),
    }),
    getAllOrders: builder.query({
      query: ({ token }) => ({
        url: `/orders/`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      }),
    }),
    getOrderStatus: builder.query({
      query: ({ orderId, token }) => ({
        url: `/order/${orderId}/status`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    updateOrderStatus: builder.mutation({
      query: ({ token, orderId, status, userId }) => ({
        url: `/order/${orderId}/order-status`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: { status, userId },
        credentials: "include",
      }),
    }),
    getUserInfo: builder.query({
      query: ({ userId }) => ({
        url: `/user-info/${userId}`,
      }),
    }),
    allOrders: builder.query({
      query: () => ({
        url: `/order/getAllOrder`,
      }),
    }),
    getSellerOrder: builder.query({
      query: ({ token,vendorId }) => ({
        url: `/order/getSellerOrder/${vendorId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      }),
    }),
  }),
});

export const { useGetOrderStatusQuery, useGetOrderQuery, useUpdateOrderStatusMutation, useGetUserInfoQuery, useGetAllOrdersQuery, useAllOrdersQuery,useGetSellerOrderQuery } = OrderApiSlice;
export default OrderApiSlice;
