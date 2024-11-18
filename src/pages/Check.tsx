import React, { useState } from "react";

const Check = () => {
  const [showExtra, setShowExtra] = useState(false);

  return (
    <div className="flex flex-col items-start font-poppins text-sm">
      <h1 className="text-gray-800">
        If you want to part of the program click button below
      </h1>
      <button className="py-2 px-7 ml-10 mt-5 bg-purple-700 text-white rounded-md hover:bg-purple-500">
        Confirm
      </button>
      <h1>hello there</h1>
      {showExtra && <h2>You are welcome</h2>}
    </div>
  );
};

export default Check;
