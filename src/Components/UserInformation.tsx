import React from "react";
import CustomButton from "./CustomButton";
import { UserDataType } from "../pages/User";
const UserInformation = ({
 user: { profile, name, role, email, isTwoFactorEnabled },
 openModal,
}: {
 user: UserDataType;
 openModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
 return (
  <section className='py-5 '>
   <h1 className='font-outfit font-semibold lg:text-xl'>Profile information</h1>
   <div className='py-8 flex flex-col gap-y-5 lg:flex-row lg:items-center md:gap-x-7 '>
    <img
     src={profile}
     alt='profile'
     className='rounded-full h-24 w-24 max-w-28 max-h-28 lg:w-28 lg:h-28 object-cover border'
    />
    <div className='flex sm:flex-1 lg:flex-col flex-col lg:gap-y-4 '>
     <h1 className='font-outfit font-semibold text-lg lg:text-xl'>{name}</h1>
     <div className='flex gap-x-2  justify-between items-end lg:gap-x-24'>
      <div className='flex flex-col'>
       <p className='font-outfit text-sm md:text-base text-gray-400'>Role</p>
       <p className='font-outfit text-sm md:text-base'>
        {role[0].toUpperCase() + role.slice(1, role.length)}
       </p>
      </div>
      <div className='flex flex-col'>
       <p className='font-outfit text-sm md:text-base text-gray-400'>Email</p>
       <p className='font-outfit text-sm md:text-base'>{email}</p>
      </div>
      {role === "buyer" && (
       <CustomButton
        title='Be a Vendor'
        buttonStyles='bg-primary font-regular text-sm lg:text-base px-2 py-1 h-fit w-fit font-outfit  lg:px-4 lg:py-2 text-white rounded'
        handleClick={() => openModal((prev) => !prev)}
       />
      )}
      {isTwoFactorEnabled || (
       <CustomButton
        title='Enable 2FA'
        buttonStyles='bg-secondary font-regular text-sm lg:text-base px-2 py-1 h-fit w-fit font-outfit  lg:px-4 lg:py-2 text-white rounded'
        handleClick={() => console.log("Two factor")}
       />
      )}
     </div>
    </div>
   </div>
  </section>
 );
};

export default UserInformation;
