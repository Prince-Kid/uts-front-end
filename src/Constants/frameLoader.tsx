import React from "react";

function LoadingFrame() {
  return (
    <div className="flex flex-col w-full gap-[10px] animate-pulse">
      <div className="bg-gray-100 w-full h-32 sm:h-48 md:h-60 lg:h-48 xl:h-[30vh] rounded-[12px]"></div>
      <div className="flex flex-col gap-[4px] pl-2 pb-2 rounded-lg">
        <span className="bg-gray-100 rounded-full py-3 w-36"></span>
        <div className="flex flex-row justify-between ">
          <div className="flex flex-col gap-2">
            <h1 className="bg-gray-100 rounded-full py-3 w-48"></h1>
            <div className="flex flex-row gap-[10px]">
              <span className="bg-gray-100 rounded-full py-3 w-60"></span>
            </div>
          </div>
          <div className="p-2 h-[40px] w-[40px] bg-gray-100 rounded-[12px]">
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoadingFrame;
