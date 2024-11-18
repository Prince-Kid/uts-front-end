import React, { useState, useEffect } from "react";

interface Product {
  id: number;
  name: string;
  img: string;
  price: number;
  quantity: number;
}

const useFetch = (url: string) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const parsedData = data.map((item: Product) => ({
          ...item,
          quantity: Number(item.quantity),
        }));
        setCartItems(parsedData);
      });
  }, [url]);

  const subTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const discountPercentage = 5;
  const deliveryFeePercentage = 3;
  const discount = subTotal * (discountPercentage / 100);
  const deliveryFee = subTotal * (deliveryFeePercentage / 100);
  const total = subTotal - discount + deliveryFee;
  return {
    cartItems,
    setCartItems,
    subTotal,
    discountPercentage,
    deliveryFeePercentage,
    total,
  };
};

export default useFetch;
