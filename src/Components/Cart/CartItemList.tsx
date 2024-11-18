import React from "react";

interface CartItemListProps {
  handleQuantityChange: (id: number, newQuantity: number) => void;
  cartItems: any[];
  handleDelete: (id: number) => void;
}

const CartItemList: React.FC<CartItemListProps> = ({
  handleQuantityChange,
  cartItems,
  handleDelete,
}) => {
  return (
    <div className="mx-11 w-1/2">
      {cartItems.map((item) => (
        <div
          className="flex justify-between items-center mb-7 py-[15px] px-[20px]  rounded-xl text-lg"
          key={item.id}
        >
          <div className="flex items-center justify-between">
            <div className="h-[90px] w-[110px]">
              <img
                className="rounded-xl h-[100%] w-[100%]"
                src={item.img}
                alt={item.name}
              />
            </div>
            <p className="ml-[20px] font-semibold">{item.name}</p>
          </div>
          <div className="flex items-center justify-between w-[400px]">
            <p>{item.price} Rwf</p>
            <div className="flex justify-between items-center rounded-[5px] w-[68px] h-[27px] bg-white">
              <button
                className="flex items-center justify-center border-none h-[23px] w-[23px] bg-white text-center"
                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
              >
                -
              </button>
              <p className="flex items-center justify-center border-none h-[23px] w-[23px] bg-white text-center">
                {item.quantity}
              </p>
              <button
                className="flex items-center justify-center border-none h-[23px] w-[23px] bg-white text-center"
                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
              >
                +
              </button>
            </div>
            <p>{item.price * item.quantity} Rwf</p>
            <button onClick={() => handleDelete(item.id)}>
              <svg
                width="16"
                height="18"
                viewBox="0 0 16 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {" "}
                <path
                  d="M5 0V1H0V3H1V16C1 16.5304 1.21071 17.0391 1.58579 17.4142C1.96086 17.7893 2.46957 18 3 18H13C13.5304 18 14.0391 17.7893 14.4142 17.4142C14.7893 17.0391 15 16.5304 15 16V3H16V1H11V0H5ZM3 3H13V16H3V3ZM5 5V14H7V5H5ZM9 5V14H11V5H9Z"
                  fill="#C9974C"
                />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItemList;
