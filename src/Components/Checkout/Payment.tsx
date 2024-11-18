import React, { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  useCreateOrderMutation,
  useCreatePaymentMutation,
} from "../../Redux/features/checkoutSlice";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import LocationButton from "../../Lib/locationButton";

interface paymentProps {
  totalAmount: number;
}

const Payment = (data: paymentProps) => {
  const userData: any = useAuthUser();
  const [district, setDistrict] = useState<string>("");
  const [sector, setSector] = useState<string>("");
  const [cell, setCell] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [streetAddress, setStreetAddress] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loadingPay, setLoadingPay] = useState<boolean>(false);

  const [createOrder, { isLoading, isError }] = useCreateOrderMutation();
  const [createPayment, { isLoading: payLoading, isError: payError }] =
    useCreatePaymentMutation();

  const { t } = useTranslation();

  const validation = async (e: FormEvent) => {
    e.preventDefault();
    if (!district || !cell) {
      setErrorMessage(t("Please fill all the fields"));
    } else {
      setErrorMessage(t(""));
      handelSubmit();
    }
  };
  const token = useAuthHeader();

  const handelSubmit = async () => {
    setLoadingPay(true);
    try {
      const data = {
        userId: userData.userId,
        deliveryAddress: {
          district,
          cell,
          streetAddress,
        },
        client: userData.name,
        paymentMethod: "stripe",
      };

      const response = await createOrder(data).unwrap();
      if (response.message) {
        const paymentRes: any = await createPayment({
          data: response.order.orderId,
          token: token,
        });
        setLoadingPay(false);

        // Log the entire response to see what's inside

        // Check if paymentRes and paymentRes.data exist
        if (paymentRes.data && paymentRes.data.transaction_link) {
          console.log(paymentRes.transaction_link);
          window.location.href = paymentRes.data.transaction_link; // Redirect to the payment URL
        } else {
          console.error(
            "Payment response data is missing or malformed:",
            paymentRes
          );
          setErrorMessage(t("Something went wrong. Please try again."));
        }
      }
    } catch (error) {
      console.log(error);
      setLoadingPay(false);
      setErrorMessage(t("An error occurred during payment processing."));
    }
  };

  return (
    <div className="w-1/2 p-10">
      <div className="payment-content bg-white px-[30px] p-[20px] flex flex-col gap-[10px]">
        <header className="text-blackText rounded-t-[5px]">
          {t("PAYMENT DETAILS")}
        </header>
        {errorMessage}
        <form
          onSubmit={validation}
          action=""
          className="flex flex-col gap-[20px] w-full"
        >
          <div className="w-[300px]">
            <LocationButton
              setCell={setCell}
              setCity={setCity}
              setDistrict={setDistrict}
              setStreetAddress={setStreetAddress}
            />
          </div>
          <div className="contacts w-full gap-[10px] grid grid-cols-2 justify-between mb-5">
            <input
              id="district"
              value={district}
              type="text"
              onChange={(e) => setDistrict(e.target.value)}
              className="contact street p-3 rounded-lg  border bg-transparent"
              placeholder={t("District")}
            />
            <input
              value={cell}
              type="text"
              onChange={(e) => setCell(e.target.value)}
              className="contact street p-3 rounded-[7px]  border bg-transparent"
              placeholder={t("Sector")}
            />
          </div>

          <button
            type="submit"
            className="payment bg-primary p-4 rounded-[7px] w-full font-outfit m-auto text-white hover:bg-blue-800"
          >
            {loadingPay ? "Wait A moment" : t("Continue To Payment")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
