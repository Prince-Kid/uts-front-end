import React, { useState } from "react";
import CustomButton from "./CustomButton";
import { FiUpload } from "react-icons/fi";
import CustomInput from "./CustomInput";
import { RotatingLines } from "react-loader-spinner";
import { UserDataType } from "../pages/User";
import { SubmitHandler, useForm } from "react-hook-form";
import { useUpdateUserMutation } from "../Redux/features/ApiSlice";
import useSignIn from "react-auth-kit/hooks/useSignIn";

import axios from "axios";
import toast from "react-hot-toast";

type FormFields = {
 email: string;
 name: string;
 profile: File | string;
};
const UPLOAD_PRESET = process.env.UPLOAD_PRESET as string;
const CLOUD_NAME = process.env.CLOUD_NAME as string;
const ProfileDetailsTab = ({
 user: { profile, userId, email, name },
 token,
 setUser,
}: {
 label?: string;
 tabName?: string;
 user: UserDataType;
 token: string;
 setUser: any;
}) => {
 const signIn = useSignIn();
 const [updateUserFn, { data, error }] = useUpdateUserMutation();
 const {
  register,
  handleSubmit,
  setValue,
  formState: { errors, isSubmitting },
 } = useForm<FormFields>({
  defaultValues: {
   email,
   name,
  },
 });
 const [profileImage, setProfileImage] = useState(profile);

 const onSubmitForm: SubmitHandler<FormFields> = async (formData) => {
  const toastId = toast.loading("Updating Profile");

  try {
   if (formData.profile) {
    const imageUpload = new FormData();
    imageUpload.append("file", formData.profile);
    imageUpload.append("upload_preset", UPLOAD_PRESET);
    const res = await axios.post(
     `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
     imageUpload
    );
    formData.profile = res.data.url;
   }
   const response = await updateUserFn({
    userId: userId,
    newUserData: formData,
   });
   if (error) {
    throw new Error();
   }
   signIn({
    auth: { token: token, type: "Bearer" },
    userState: response.data.user,
   });
   await setUser(response.data.user);
   toast.dismiss(toastId);
   toast.success("Updated Successfully ");
  } catch (error: any) {
   toast.dismiss(toastId);
   toast.error(error?.message);
  }
 };

 return (
  <form
   onSubmit={handleSubmit(onSubmitForm)}
   className='lg:max-w-fit lg:px-2 md:px-5 pt-5 flex flex-col lg:flex-row'
  >
   <div className='flex flex-col lg:flex-row items-center gap-y-4 md:gap-x-5'>
    <div>

    <div className="w-20 border h-20 md:w-24 md:h-24 rounded-full">

    <img
     src={profileImage}
     alt='Profile'
     className='rounded-full w-full h-full  object-cover '
     />
        </div>
     </div>
    <div className='text-center'>
     <CustomInput
      handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const files = e.target.files;
       if (files && files.length > 0) {
        setValue("profile", files[0]);
        setProfileImage(URL.createObjectURL(files[0]));
       }
      }}
      accept='.jpg, .png'
      label='Upload Picture'
      icon={<FiUpload />}
      labelStyles='inline-flex items-center px-2 md:px-4 py-1 bg-gray-100 rounded-md cursor-pointer text-gray-500 gap-x-3 font-outfit text-sm md:text-sm'
      inputId='upload'
      type='file'
      inputStyles='hidden'
      disable={isSubmitting}
     />
     <p className='mt-2 text-gray-600 font-outfit text-xs md:text-sm'>
      Png or Jpg file
     </p>
    </div>
   </div>
   <div className='w-full lg:max-w-lg flex flex-col lg:items-end'>
    <CustomInput
     register={register("email", {
      pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/,
     })}
     label='Email'
     inputId='email'
     labelStyles='text-gray-600 text-sm md:text-base font-outfit mb-2'
     inputStyles={`rounded w-full py-2 px-3 bg-gray-100 font-outfit text-sm md:text-base ${
      errors.email ? "border border-red-500" : ""
     }`}
     type='text'
     placeholder='crafters@gmail.com'
     disable={isSubmitting}
    />
    {errors.email && <p className='text-red-500 text-sm'>Invalid email</p>}
    <CustomInput
     register={register("name")}
     label='Name'
     inputId='name'
     labelStyles='text-sm text-gray-600 md:text-base font-outfit mb-2'
     inputStyles='rounded w-full py-2 px-3 bg-gray-100 font-outfit text-sm md:text-base'
     type='text'
     placeholder='Crafters'
     disable={isSubmitting}
    />
    <div className='flex flex-row gap-x-2 mt-4 sm:self-end'>
     <CustomButton
      buttonStyles={`transition-colors duration-500 hover:bg-border hover:text-white text-black rounded-lg px-3 md:px-4 py-2 font-outfit text-sm md:text-base ${
       isSubmitting && "hidden"
      }`}
      title='Discard'
      buttonType='reset'
     />
     <CustomButton
      buttonStyles={`bg-primary text-white rounded-lg px-3 md:px-4 py-2 font-outfit text-sm md:text-base text-center`}
      title='Save Changes'
      buttonType='submit'
      disable={isSubmitting}
      spinner={<RotatingLines width='30' strokeColor='white' />}
     />
    </div>
   </div>
  </form>
 );
};

export default ProfileDetailsTab;
