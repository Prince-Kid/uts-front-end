import React from "react";

interface CardProps {
  data: any;
}
const InteractionCard: React.FC<CardProps> = ({ data }) => {
  return (
    <div className="flex flex-row w-full justify-between bg-white rounded-[12px] p-4">
      <div className="flex flex-col gap-[10px]">
        <span className="font-outfit font-[600] text-[16px]">{data.name}</span>
        <h1 className="font-outfit font-[600] text-black text-[20px]">
          {data.numbers}
        </h1>
      </div>
      <div>
        <div className="flex p-2 rounded-[6px] bg-gray-100">{data.icon}</div>
      </div>
    </div>
  );
};

export default InteractionCard;
