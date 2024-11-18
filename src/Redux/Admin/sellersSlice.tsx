import { apiSlice } from "../features/ApiSlice";

const sellersSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    selectSellers: builder.query({
      query: () => ({
        url: "/allvendors",
        method: "GET",
      }),
    }),
    selectRequests: builder.query({
      query: () => ({
        url: "/allrequests",
        method: "GET",
      }),
    }),
    selectStores: builder.query({
      query: () => ({
        url: "/allstores",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useSelectSellersQuery,
  useSelectRequestsQuery,
  useSelectStoresQuery,
} = sellersSlice;

export default sellersSlice;
