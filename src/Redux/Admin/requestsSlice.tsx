import { apiSlice } from "../features/ApiSlice";
import Cookies from "js-cookie";

const RequestsSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    approve: builder.mutation({
      query: (userId) => {
        const token = Cookies.get("_auth");
        return {
          url: `/approve-vendor/${userId}`,
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    reject: builder.mutation({
      query: ({ userId, message }) => {
        const token = Cookies.get("_auth");
        return {
          url: `/reject-vendor/${userId}`,
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: { message },
        };
      },
    }),
  }),
});

export const { useApproveMutation, useRejectMutation } = RequestsSlice;
export default RequestsSlice;
