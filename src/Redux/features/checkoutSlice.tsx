import { apiSlice } from "./ApiSlice";

const checkoutSlice= apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCart: builder.query({
            query: (data) => ({
                url: `/getcart/${data}`,
                method: 'GET',
            })
        }),
        createOrder: builder.mutation({
            query: (data) => ({
                url: `/checkout`,
                method: "POST",
                body: data
            })
        }),
        createPayment: builder.mutation({
            query: ({data,token})=>{
                return {
                    url: `/payment/${data}`,
                    method: "POST",
                    headers: {
                        Authorization: token
                    }

                }
            }
        }),
        updateCart: builder.mutation({
            query: (data) => ({
                url: "/updatecart",
                method: "POST",
                body: data
            })
        }),
        deleteFromCart: builder.mutation({
            query:(data)=>({
                url: `/cart/${data.userId}/product/${data.productId}`,
                method: "DELETE"
            })
        })
    })
})

export const { useGetCartQuery,useCreateOrderMutation,useCreatePaymentMutation,useUpdateCartMutation,useDeleteFromCartMutation } = checkoutSlice
export default checkoutSlice