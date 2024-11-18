import React from "react";

interface CartTotalsProps {
  subTotal: number;
  deliveryFeePercentage: number;
  discountPercentage: number;
  total: number;
}

const CartTotals: React.FC<CartTotalsProps> = ({
  subTotal,
  deliveryFeePercentage,
  discountPercentage,
  total,
}) => {
  return (
    <div className="bg-white p-5 rounded-lg w-80   font-outfit h-[385px]">
      <h2 className="mb-12 text-xl font-semibold">Cart Totals</h2>
      <div className="mt-5">
        <div className="flex items-center my-2 text-base pl-0 w-[98%]">
          <div className="sub text-gray-400 w-[55%] my-2">Sub Total</div>
          <span className="bg-transparent">{subTotal} Rwf</span>
        </div>
        <div className="flex items-center my-2 text-base pl-0 w-[98%]">
          <div className="sub text-gray-400 w-[55%] my-2">Delivery Fee</div>
          <span className="bg-transparent">
            {subTotal * 0.01 * deliveryFeePercentage} Rwf
          </span>
        </div>
        <div className="flex items-center my-2 text-base pl-0 w-[98%]">
          <div className="text-gray-400 w-[55%] my-2">Discount</div>
          <span className="bg-transparent">
            {subTotal * 0.01 * discountPercentage} Rwf
          </span>
        </div>
        <div className="flex items-center my-8">
          <div className="w-[55%]">Total</div>
          <span>{total} Rwf</span>
        </div>
      </div>
      <a href="/checkout" className={`${subTotal == 0 ? "hidden" : "flex"}`}>
        <button className="bg-primary text-white py-3 px-4 border-none rounded-md cursor-pointer text-base w-full hover:bg-[#004494]">
          Checkout
        </button>
      </a>
    </div>
  );
};

export default CartTotals;
