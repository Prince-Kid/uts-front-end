import React from "react";
import { useGetOrderQuery } from "../../Redux/OrderSlice";
import { useTranslation } from "react-i18next";

interface Product {
  productName: string;
  quantity: number;
  price: number;
  total: number;
}

interface OrderDetailsProps {
  orderId?: string;
}

export const OrderProductDetails: React.FC<OrderDetailsProps> = ({
  orderId,
}) => {
  const { data: order, error, isLoading } = useGetOrderQuery({ orderId });
  const { t } = useTranslation();
  if (error) {
    console.error("Error fetching order: ", error);
    return <p>{t("Error fetching product details")}</p>;
  }

  if (isLoading) return <p>Loading...</p>;

  if (!order) return <p>{t("No product found")}</p>;

  const { products } = order;
  return (
    <>
      <div className="container  font-outfit">
        <h3 className="font-bold mb-4 text-lg font-poppins">
          {t("Order Details")}
        </h3>
        <div>
          <table className="min-w-full bg-white">
            <thead>
              <tr className=" text-left">
                <th className="text-primary ">{t("Product")}</th>
                <th className="text-primary">{t("Quantity")}</th>
                <th className="text-primary">{t("Price")}</th>
                <th className="text-primary">{t("Total")}</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product: Product, index: number) => (
                <tr key={index} className="py-4">
                  <td>{product.productName}</td>
                  <td>{product.quantity}</td>
                  <td>{product.price} $</td>
                  <td>{product.total} $</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
