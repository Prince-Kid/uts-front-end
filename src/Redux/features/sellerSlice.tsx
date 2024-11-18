import { getToken } from "../../Lib/getToken";
import { apiSlice } from "./ApiSlice";

const SellerSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    selectFeddback: builder.query({
      query: () => ({
        url: `/select-vendorFeedback`
      })
    }),
    selectProducts: builder.query({
      query: ({id,token}) => {
        return {
          url: `/vendorProducts/${id}`,
          headers: {
            Authorization: token
          }
        };
      }
    }),
    selectVendor: builder.query({
        query: (id) => ({
            url: `/select-vendor/${id}`
        })
    }),
    createProduct: builder.mutation({
        query: ({data,token}) => {
            return{
                url: `/create/product/${data.id}`,
                method: "POST",
                body: data,
                headers:{
                    Authorization: token
                }
            }
        }
    }),
    updateProduct: builder.mutation({
        query: ({data,token}) => {
            return{
                url: `/updateProduct/${data.id}`,
                method: "PUT",
                body: data,
                headers:{
                    Authorization: token
                }
            }
        }
    }),
    selectSingleProduct: builder.query({
      query: (id)=> `/readProduct/${id}`
    }),
    deleteProduct: builder.mutation({
      query: ({id,token,data})=>{
        return{
          url: `/deleteProduct/${id}`,
          method: "DELETE",
          body: data,
          headers: {
            Authorization: token
          }
        }
      }
    })
  })
});

export const { useSelectFeddbackQuery, useSelectProductsQuery,useSelectVendorQuery,useCreateProductMutation,useSelectSingleProductQuery,useDeleteProductMutation,useUpdateProductMutation } = SellerSlice;
export default SellerSlice;
