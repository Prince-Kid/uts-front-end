import React, { useEffect, useState } from "react";
import UserSettings from "../Components/UserSettings";
import ProfileDetailsTab from "../Components/ProfileDetailsTab";
import ChangePasswordTab from "../Components/ChangePasswordTab";
import BusinessInformationTab from "../Components/BusinessInformationTab";
import UserInformation from "../Components/UserInformation";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { Toaster } from "react-hot-toast";
import Header from "../Components/Homepage/Homepage_header";
import CustomInput from "../Components/CustomInput";
import VendorRequestForm from "../Components/VendorRequestForm";
import Footer from "../Components/Homepage/Homepage_footer";
import OrderComponent from "../Components/orders";
export interface UserDataType {
 cartId: string | null;
 createdAt: string;
 email: string;
 emailVerificationToken: string;
 isTwoFactorEnabled: boolean;
 isVerfied: boolean;
 name: string;
 password: string;
 profile: string;
 resentPasswordExpires: string | null;
 resentPasswordToken: string | null;
 role: string;
 status: string;
 updatedAt: string;
 userId: string;
 wishlistId: string | null;
}
const User = () => {
 const userData = useAuthUser<UserDataType>();
 const authHeader = useAuthHeader();
 const token = authHeader?.split(" ")[1];
 const [user, SetUser] = useState(userData);
 const [openModal, setOpenModal] = useState(false);
 useEffect(() => {
  SetUser(userData);
 }, [userData]);

 return (
  <div className='flex flex-col relative'>
   <Header/>
   <main className='sm:px-3 md:px-7 pb-10 mt-40 min-h-screen-80'>
    <UserInformation openModal={setOpenModal} user={user as UserDataType} />
    <UserSettings className='sm:px-4 '>
     <ProfileDetailsTab
      token={token as string}
      user={user as UserDataType}
      setUser={SetUser}
      label={"profiledetails"}
      tabName={"Profile Details"}
     />
     <ChangePasswordTab
      label={"changepassword"}
      tabName={"Change Password"}
      user={user as UserDataType}
     />
     {user?.role === "vendor" ? (
      <BusinessInformationTab
       label={"bussininfo"}
       tabName={"Business information"}
      />
     ) : (
      <></>
     )}
    </UserSettings>
    <Toaster position='top-center' />
    <OrderComponent/>
    
   </main>
   <div
    className={`${
     openModal
      ? "absolute backdrop-blur-sm h-screen w-full top-0 flex items-center justify-center z-[50]"
      : "hidden"
    }`}
   >
    <VendorRequestForm user={user as UserDataType} closeModal={setOpenModal} />
   </div>
   <Footer />
  </div>
 );
};

export default User;
