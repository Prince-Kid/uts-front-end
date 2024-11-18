import React from "react";
import CustomButton from "./CustomButton";
import CustomInput from "./CustomInput";
const BusinessInformationTab = ({
  label,
  tabName,
}: {
  label?: string;
  tabName?: string;
}) => {
  return (
    <form className="pt-5 lg:px-2 md:pl-5 flex flex-col w-full md:w-[520px]">
      <div className="flex flex-col md:flex-row flex-wrap gap-y-4 md:gap-x-4 w-full">
        <CustomInput
          label="Business Name"
          inputId="businessname"
          labelStyles="text-gray-300 text-sm md:text-base font-outfit mb-2"
          inputStyles="rounded w-full py-2 px-3 bg-gray-100 font-outfit max-w-full md:max-w-64 text-sm md:text-base"
          type="text"
          //  pattern="[a-zA-Z 0-9]"
          placeholder="Enter Business Name"
          handleChange={(e): void => {
            console.log(e.target.value);
          }}
        />
        <CustomInput
          label="Stripe Account Id"
          inputId="stripeaccid"
          labelStyles="text-gray-300 text-sm md:text-base font-outfit mb-2"
          inputStyles="rounded w-full py-2 px-3 bg-gray-100 font-outfit max-w-full md:max-w-64 text-sm md:text-base"
          type="number"
          placeholder="Enter Your Stripe Acc Id"
          handleChange={(e): void => {
            console.log(e.target.value);
          }}
        />
        <CustomInput
          label="Street"
          inputId="streetaddress"
          labelStyles="text-gray-300 text-sm md:text-base font-outfit mb-2"
          inputStyles="rounded w-full py-2 px-3 bg-gray-100 font-outfit max-w-full md:max-w-64 text-sm md:text-base"
          type="text"
          placeholder="Street Address"
          handleChange={(e): void => {
            console.log(e.target.value);
          }}
        />
        <CustomInput
          label="TIN"
          inputId="tinnumber"
          labelStyles="text-gray-300 text-sm md:text-base font-outfit mb-2"
          inputStyles="rounded w-full py-2 px-3 bg-gray-100 font-outfit max-w-full md:max-w-64 text-sm md:text-base"
          type="text"
          placeholder="TIN Number"
          handleChange={(e): void => {
            console.log(e.target.value);
          }}
        />
        <CustomInput
          label="District"
          inputId="districtaddress"
          labelStyles="text-gray-300 text-sm md:text-base font-outfit mb-2"
          inputStyles="rounded w-full py-2 px-3 bg-gray-100 font-outfit max-w-full md:max-w-64 text-sm md:text-base"
          type="text"
          placeholder="District"
          handleChange={(e): void => {
            console.log(e.target.value);
          }}
        />
      </div>
      <div className="flex flex-row self-end gap-x-2 mt-4">
        <CustomButton
          buttonStyles="transition-colors duration-500 hover:bg-border hover:text-white text-black rounded-lg px-3 md:px-4 py-2 font-outfit text-sm md:text-base"
          title="Discard"
          handleClick={(e) => console.log(e)}
        />
        <CustomButton
          buttonStyles="bg-primary text-white rounded-lg px-3 md:px-4 py-2 font-outfit text-sm md:text-base"
          title="Save Changes"
          handleClick={(e) => console.log(e.target)}
        />
      </div>
    </form>
  );
};

export default BusinessInformationTab;
