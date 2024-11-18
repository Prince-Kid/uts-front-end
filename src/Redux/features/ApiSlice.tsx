import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL:any = `${process.env.BACKEND_API_URL}`;

const baseQuery = fetchBaseQuery({ baseUrl: API_URL, credentials: 'include' });
export const apiSlice = createApi({
 reducerPath: "api",
 baseQuery,
 endpoints: (builder) => ({
  updateUser: builder.mutation({
   query: ({ userId, newUserData }) => ({
    url: `/updateuser/${userId}`,
    method: "PATCH",
    body: JSON.stringify(newUserData),
    headers: {
     "Content-Type": "application/json",
    },
   }),
  }),
  updatePassword: builder.mutation({
   query: ({ userId, newPassword }) => ({
    url: `/updatepassword/${userId}`,
    method: "PATCH",
    body: JSON.stringify(newPassword),
    headers: {
     "Content-Type": "application/json",
    },
   }),
  }),
  updateBusinessInformation: builder.mutation({
   query: (data) => ({
    url: "/requestVendor",
    method: "POST",
    body: JSON.stringify(data),
    headers: {
     "Content-Type": "application/json",
    },
   }),
  }),
 }),
});


export const {
 useUpdateUserMutation,
 useUpdatePasswordMutation,
 useUpdateBusinessInformationMutation,
} = apiSlice;
