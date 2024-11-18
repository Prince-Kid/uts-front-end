import React from "react";
import { UserDataType } from "../pages/User";
import CustomInput from "./CustomInput";
import { IoCloseCircleSharp } from "react-icons/io5";
import CustomButton from "./CustomButton";
import { RotatingLines } from "react-loader-spinner";
import axios from "axios";
import toast from "react-hot-toast";
import { useUpdateBusinessInformationMutation } from "../Redux/features/ApiSlice";
import { SubmitHandler, useForm } from "react-hook-form";

type RequestFields = {
  userId: string;
  storeName: string;
  address: string;
  TIN: number;
  bankAccount: number;
  paymentDetails: number;
};
const VendorRequestForm = ({
  user: { userId },
  closeModal,
}: {
  user: UserDataType;
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [requestFn, { isSuccess }] = useUpdateBusinessInformationMutation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RequestFields>({
    defaultValues: {
      userId: userId,
    },
  });

  const onSubmitRequest: SubmitHandler<RequestFields> = async (formData) => {
    const toastId = toast.loading("Sending Request");

    try {
      const [city, sector] = formData.address
        .split(",")
        .map((part) => part.trim());

      const newAddress = { city, sector };
      const updatedFormData = { ...formData, address: newAddress };
      const res = await requestFn({ ...formData, address: newAddress });
      if (res.error) {
        throw new Error(res?.error?.data?.message as string);
      }
      toast.dismiss(toastId);
      toast.success("Request Sent");
      closeModal(false);
    } catch (err: any) {
      toast.dismiss(toastId);
      toast.error(err.message);
      closeModal(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitRequest)}
      className="flex flex-col bg-primary w-[500px] max-w-[1000px] rounded-lg p-4 border"
    >
      <div className="mb-4 flex flex-row items-center justify-between">
        <h1 className="font-outfit text-white text-lg">Request form</h1>
        <IoCloseCircleSharp
          className="text-white  w-6 h-6 cursor-pointer"
          onClick={() => closeModal((prev) => !prev)}
        />
      </div>
      <CustomInput
        register={register("storeName", { required: true })}
        label="Business Name"
        inputId="businessname"
        labelStyles="text-white text-sm md:text-base font-outfit mb-2"
        inputStyles={`rounded w-full py-2 px-3 bg-gray-100 font-outfit text-sm md:text-base ${
          errors.storeName ? "border border-red-500" : ""
        }`}
        type="text"
        placeholder="Crafters' shoe Store"
        disable={isSubmitting}
      />
      {errors.storeName && <p className="text-red-500 text-sm">Required</p>}
      <CustomInput
        register={register("address", { required: true })}
        label="Address"
        inputId="address"
        labelStyles="text-white text-sm md:text-base font-outfit mb-2"
        inputStyles={`rounded w-full py-2 px-3 bg-gray-100 font-outfit text-sm md:text-base ${
          errors.address ? "border border-red-500" : ""
        }`}
        disable={isSubmitting}
        type="text"
        placeholder="kigali, Rwanda"
      />
      {errors.address && <p className="text-red-500 text-sm">Required</p>}
      <CustomInput
        register={register("TIN", { required: true })}
        label="TIN"
        inputId="tin"
        labelStyles="text-white text-sm md:text-base font-outfit mb-2"
        inputStyles={`rounded w-full py-2 px-3 bg-gray-100 font-outfit text-sm md:text-base ${
          errors.TIN ? "border border-red-500" : ""
        }`}
        type="number"
        placeholder="139927827"
        disable={isSubmitting}
      />
      {errors.TIN && <p className="text-red-500 text-sm">Required</p>}
      <CustomInput
        register={register("bankAccount", { required: true })}
        label="Bank Account"
        inputId="tin"
        labelStyles="text-white text-sm md:text-base font-outfit mb-2"
        inputStyles={`rounded w-full py-2 px-3 bg-gray-100 font-outfit text-sm md:text-base ${
          errors.bankAccount ? "border border-red-500" : ""
        }`}
        type="number"
        placeholder="708387837"
        disable={isSubmitting}
      />
      {errors.bankAccount && <p className="text-red-500 text-sm">Required</p>}
      <CustomInput
        register={register("paymentDetails", { required: true })}
        label="FlutterWave Id"
        inputId="stripeid"
        labelStyles="text-white text-sm md:text-base font-outfit mb-2"
        inputStyles={`rounded w-full py-2 px-3 bg-gray-100 font-outfit text-sm md:text-base ${
          errors.paymentDetails ? "border border-red-500" : ""
        }`}
        type="number"
        placeholder="708387837"
        disable={isSubmitting}
      />
      {errors.paymentDetails && (
        <p className="text-red-500 text-sm">Required</p>
      )}
      <CustomButton
        buttonStyles={`bg-white text-primary rounded-lg px-3 md:px-4 py-2 font-outfit text-sm md:text-base text-center font-semibold self-end `}
        title="Request"
        buttonType="submit"
        spinner={<RotatingLines width="30" strokeColor="blue" />}
        disable={isSubmitting}
      />
    </form>
  );
};

export default VendorRequestForm;
