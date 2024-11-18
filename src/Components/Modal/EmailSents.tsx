import React from "react";

interface emailProps {
  email?: string;
}

const EmailSents: React.FC<emailProps> = ({ email }) => (
  <div className="w-full p-4 z-40 absolute bg-black/50 h-full top-0 flex items-center justify-center">
    <div className="w-full p-4   lg:w-1/3 h-1/4 bg-white rounded-[12px] flex items-center justify-center">
      <h1 className="font-outfit flex flex-col text-[18px] font-[400] items-center text-center">
        <span>Check Your gmail inbox</span>
        <span className="font-[300]">{email}</span>
      </h1>
    </div>
  </div>
);

export default EmailSents;
