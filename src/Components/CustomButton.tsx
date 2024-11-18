import React, { MouseEventHandler, ReactNode } from "react";

const CustomButton = ({
 title,
 handleClick,
 buttonStyles,
 disable = false,
 buttonType,
 spinner,
}: {
 title: string;
 handleClick?: MouseEventHandler;
 buttonStyles: string;
 disable?: boolean;
 buttonType?: "submit" | "reset" | "button" | undefined;
 spinner?: ReactNode;
}) => {
 return (
  <button
   type={buttonType}
   className={buttonStyles}
   disabled={disable}
   onClick={handleClick}
  >
   {disable ? spinner : title}
  </button>
 );
};

export default CustomButton;
