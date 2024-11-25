import React, { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { useCreateOrderMutation } from "../../Redux/features/checkoutSlice";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import LocationButton from "../../Lib/locationButton";

interface PaymentProps {
  totalAmount: number;
}

const Payment = (data: PaymentProps) => {
  const userData: any = useAuthUser();
  const [district, setDistrict] = useState<string>("");
  const [sector, setSector] = useState<string>("");
  const [cell, setCell] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [streetAddress, setStreetAddress] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loadingPay, setLoadingPay] = useState<boolean>(false);
  const [orderSuccess, setOrderSuccess] = useState<boolean>(false);

  const [createOrder] = useCreateOrderMutation();
  const { t } = useTranslation();

  const validation = (e: FormEvent) => {
    e.preventDefault();
    if (!district || !cell) {
      setErrorMessage(t("Please fill all the fields"));
    } else {
      setErrorMessage("");
      handelSubmit();
    }
  };

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
        paymentMethod: "vendor", // Indicates this is sent to the vendor
      };

      const response = await createOrder(data).unwrap();
      if (response.message) {
        setLoadingPay(false);
        setOrderSuccess(true); // Show success feedback
        setTimeout(() => {
          window.location.href = "/"; // Redirect to home page after 3 seconds
        }, 3000);
      }
    } catch (error) {
      console.error(error);
      setLoadingPay(false);
      setErrorMessage(
        t("An error occurred while placing the order. Please try again.")
      );
    }
  };

  return (
    <div className="w-1/2 p-10">
      <div className="payment-content bg-white px-[30px] p-[20px] flex flex-col gap-[10px]">
        <header className="text-blackText rounded-t-[5px]">
          {t("PAYMENT DETAILS")}
        </header>
        {errorMessage && (
          <div className="error-message text-red-500">{errorMessage}</div>
        )}

        {orderSuccess ? (
          <div className="success-message flex flex-col items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-green-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-10.707a1 1 0 00-1.414 0L9 11.586 7.707 10.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 000-1.414z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-green-500 mt-4">
              {t(
                "Your order has been sent to the vendor. You will get a response soon."
              )}
            </p>
          </div>
        ) : (
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
                className="contact street p-3 rounded-lg border bg-transparent"
                placeholder={t("District")}
              />
              <input
                value={cell}
                type="text"
                onChange={(e) => setCell(e.target.value)}
                className="contact street p-3 rounded-[7px] border bg-transparent"
                placeholder={t("Sector")}
              />
            </div>

            <button
              type="submit"
              className="payment bg-primary p-4 rounded-[7px] w-full font-outfit m-auto text-white hover:bg-blue-800"
            >
              {loadingPay ? t("Wait a moment...") : t("Submit Order")}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Payment;
