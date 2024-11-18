import React, { ChangeEventHandler, ReactNode } from "react";

interface CustomInputProps {
 type: string;
 label: string;
 icon?: ReactNode;
 placeholder?: string;
 inputId: string;
 labelStyles: string;
 inputStyles: string;
 iconStyles?: string;
 handleChange?: ChangeEventHandler<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
 >;
 options?: { value: string; label: string }[];
 rows?: number;
 accept?: string;
 multiple?: boolean;
 register?: any;
 disable?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
 type,
 label,
 icon,
 placeholder,
 inputId,
 labelStyles,
 inputStyles,
 iconStyles,
 handleChange,
 options,
 rows,
 accept,
 multiple,
 register,
 disable = false,
}) => {
 const renderInput = () => {
  switch (type) {
   case "textarea":
    return (
     <textarea
      {...register}
      id={inputId}
      placeholder={placeholder}
      className={inputStyles}
      onChange={handleChange}
      rows={rows || 3}
      disabled={disable}
     />
    );
   case "select":
    return (
     <select
      id={inputId}
      className={inputStyles}
      disabled={disable}
      onChange={handleChange}
     >
      {options?.map((option) => (
       <option key={option.value} value={option.value}>
        {option.label}
       </option>
      ))}
     </select>
    );
   case "file":
    return (
     <input
      {...register}
      id={inputId}
      type='file'
      className={inputStyles}
      onChange={handleChange}
      accept={accept}
      multiple={multiple}
      disabled={disable}
     />
    );
   default:
    return (
     <input
      {...register}
      id={inputId}
      type={type}
      placeholder={placeholder}
      className={inputStyles}
      onChange={handleChange}
      disabled={disable}
     />
    );
  }
 };
 return (
  <div className='mb-4 flex flex-col'>
   <label className={labelStyles} htmlFor={inputId}>
    {icon && <span className={iconStyles}>{icon}</span>}
    {label}
   </label>
   {renderInput()}
  </div>
 );
};

export default CustomInput;
