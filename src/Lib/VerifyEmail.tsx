import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useVerifyEmailQuery } from '../Redux/features/AuthSlice';
const VerifyEmail = () => {
   const location = useLocation();
   const getQueryParams = (search: string) => {
      return new URLSearchParams(search);
   };
   const queryParams = getQueryParams(location.search);
   const token = queryParams.get('token');
   const { data, isLoading, isError, error } = useVerifyEmailQuery(token || '');
   if (isLoading) {
      return <div className='w-full h-screen flex items-center justify-center'>Loading...</div>;
   }
   if (isError || !data || !data.message) {
      return (
         <div className='w-full h-screen flex items-center justify-center'>
            <h1>Verification Link has expired or invalid token</h1>
         </div>
      );
   }
   if (data.message === "Email verified successfully") {
      window.location.href = "/login";
      return null;
   }
   return (
      <div className='w-full flex h-screen items-center justify-center'>
         <h1>Verification Link has expired or invalid token</h1>
      </div>
   );
};

export default VerifyEmail;
