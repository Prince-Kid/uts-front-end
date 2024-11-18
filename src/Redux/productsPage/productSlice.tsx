import { apiSlice } from "../features/ApiSlice";

// Define the Product type
interface Product {
  id: number;
  name: string;
  available: boolean;
  quantity: number;
}

const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    AllProducts: builder.query<Product[], void>({
      query: () => ({
        url: "/readAllProducts",
        method: "GET",
      }),
      transformResponse: (response: unknown) => {
        const products = response as Product[];
        return products.filter(
          (product) => product.available === true && product.quantity !== 0
        );
      },
    }),
    Carts: builder.query({
      query: (userId) => ({
        url: `/getcart/${userId}`,
        method: "GET",
      }),
    }),
    Wishlists: builder.query({
      query: (userId) => ({
        url: `/toWishlist/${userId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useAllProductsQuery, useCartsQuery, useWishlistsQuery } =
  productApiSlice;
export default productApiSlice;
