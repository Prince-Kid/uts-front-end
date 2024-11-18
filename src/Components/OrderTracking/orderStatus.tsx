import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import {
  useGetOrderQuery,
  useUpdateOrderStatusMutation,
} from "../../Redux/OrderSlice";
import Pusher from "pusher-js";
import { isVendor, getCookie, getToken } from "./authUtils";
import { ThreeDots } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

const pusher = new Pusher(process.env.PUSHER_KEY as string, {
  cluster: process.env.PUSHER_CLUSTER as string,
});

interface OrderStatusProps {
  orderId?: string;
  currentStatus: string;
}

interface OrderUpdateEvent {
  orderId: string;
  status: string;
}

const OrderStatus: React.FC<OrderStatusProps> = ({
  orderId,
  currentStatus,
}) => {
  const statuses = ["pending", "processing", "shipped", "delivered"];

  const { data, error, isLoading } = useGetOrderQuery({ orderId });
  const [orderStatus, setOrderStatus] = useState<string | null>(null);
  const [updateMessage, setUpdateMessage] = useState("");
  const [updateOrderStatus, { isLoading: isUpdating }] =
    useUpdateOrderStatusMutation();

    useEffect(() => {
      if (data && data.status) {
        const translatedStatus = data.status.toLowerCase() === 'paid' ? 'pending': data.status
        setOrderStatus(translatedStatus);
      }
    }, [data]);

  useEffect(() => {
    const channel = pusher.subscribe("order-channel");
    channel.bind("order-updated", (data: OrderUpdateEvent) => {
      if (data.orderId === orderId) {
        const translatedStatus = data.status.toLowerCase() === 'paid' ? 'pending' : data.status;
        setOrderStatus(translatedStatus);
      }
    });

    channel.bind("pusher:error", (error: any) => {
      console.error("Pusher error:", error);
    });

    return () => {
      channel.unbind_all();
      pusher.unsubscribe("order-channel");
    };
  }, [orderId]);

  const currentStatusIndex = orderStatus ? statuses.indexOf(orderStatus) : -1;

  const getStatusClass = (status: string) => {
    const statusIndex = statuses.indexOf(status);
    return statusIndex <= currentStatusIndex
      ? "bg-primary text-white"
      : "bg-gray-200";
  };

  const getLineClass = (index: number) => {
    return currentStatusIndex >= index + 1 ? "bg-primary" : "bg-gray-200";
  };

  const getNextStatus = (currentStatus: string | null) => {
    if (!currentStatus) return statuses[0];
    const currentIndex = statuses.indexOf(currentStatus);
    return currentIndex < statuses.length - 1
      ? statuses[currentIndex + 1]
      : null;
  };
  const { t } = useTranslation();
  const handleUpdateStatus = async () => {
    const nextStatus = getNextStatus(orderStatus);
    if (!nextStatus) {
      toast.info("No further status updates available");
      return;
    }

    try {
      setUpdateMessage(`Updating status to ${nextStatus}...`);
      const token = getToken();
      if (!token) {
        toast.error("No authentication token found");
        return;
      }

      await updateOrderStatus({
        token,
        orderId,
        status: nextStatus,
      }).unwrap();
      toast.success(`Status updated to ${nextStatus} successfully!`);
    } catch (error: any) {
      console.error(error);
      toast.error(`Failed to update status: ${error.message}`);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{t("Error loading order status")}</div>;

  return (
    <>
      <ToastContainer />
      <div className="flex items-center justify-center mt-8 gap-14 font-outfit">
        {statuses.map((status, index) => (
          <div key={status} className="flex items-center">
            <div className="flex flex-col items-center relative">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusClass(
                  status
                )} z-10`}
              >
                <FontAwesomeIcon icon={faCheck} className="text-white" />
              </div>
              <span className="mt-2 text-sm">{status}</span>
              {index < statuses.length - 1 && (
                <div
                  className={`absolute top-5 transform -translate-y-1/2 left-10 w-24 h-1 ${getLineClass(
                    index
                  )}`}
                ></div>
              )}
            </div>
          </div>
        ))}
      </div>
      {isVendor() && (
        <div className="pt-10">
          {getNextStatus(orderStatus) ? (
            <button
              onClick={handleUpdateStatus}
              disabled={isUpdating}
              className="bg-primary text-white px-4 py-2 rounded-lg flex items-center justify-center w-[200px] h-[48px] min-w-[200px] min-h-[48px]"
            >
              {isUpdating ? (
                <ThreeDots
                  visible={true}
                  height="30"
                  width="50"
                  color="white"
                  radius="9"
                  ariaLabel="three-dots-loading"
                />
              ) : (
                <span>
                  {t("Update to")} {getNextStatus(orderStatus)}
                </span>
              )}
            </button>
          ) : (
            <div className="flex gap-2 font-outfit text-primary font-semibold">
              <p>{t("Order Completed")} </p>
              <span>&#x2713;</span>
            </div>
          )}
        </div>
      )}
      {/* {updateMessage && <p>{updateMessage}</p>} */}
    </>
  );
};

export default OrderStatus;
