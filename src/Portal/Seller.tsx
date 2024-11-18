import React, { useEffect } from 'react';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { Outlet, useNavigate } from 'react-router-dom';
import Logout from '../services/Logout';
import VendorSidebar from '../Components/vendor/VendorSidebar';
import VendorHeader from '../Components/vendor/VendorHeader';
import { useSelectVendorQuery } from '../Redux/features/sellerSlice';

function Seller() {

  const navigate = useNavigate();
  const userData: any = useAuthUser();
  const { data: vendors, error, isLoading } = useSelectVendorQuery(userData.userId)
  useEffect(() => {
    if (userData.role !== 'vendor') {
      navigate(`/${userData.role}`);
    } else {



    }
  }, [navigate]);

  useEffect(() => {
    if (vendors) {
      console.log(vendors)
      localStorage.setItem("vendorData", JSON.stringify({ storeName: vendors.vendor.storeName, vendorId: vendors.vendor.vendorId }))
    }
  }, [vendors])
  const handelLogout = Logout();
  return (
    <div className="w-full h-screen flex flex-row ">
      <div className='h-screen fixed w-[20%]'>
        <VendorSidebar />
      </div>
      <div className='flex w-[80%] w flex-col gap-[10px] bg-gray-50 ml-auto'>
        <VendorHeader />
        <div className='w-full pt-24'>  
        <Outlet />
        </div>
      </div>

    </div>
  );
}

export default Seller