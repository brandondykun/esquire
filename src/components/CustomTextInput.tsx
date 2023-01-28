import { forwardRef } from "react";

type CustomTextInputType = {
  id: string;
  label: string;
  type?: "text" | "password";
  value: string;
  valid: boolean;
  validationText: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CustomTextInput = forwardRef(
  (
    {
      id,
      label,
      type,
      value,
      valid,
      validationText,
      onChange,
      placeholder,
    }: CustomTextInputType,
    ref: React.Ref<HTMLInputElement>
  ) => {
    return (
      <div className="custom-text-input-container">
        <label htmlFor={id} className="custom-text-input-label">
          {label}
        </label>
        <input
          ref={ref}
          type={type ? type : "text"}
          id={id}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className={`custom-text-input ${!valid ? "invalid" : ""}`}
        />
        <div className="custom-input-validation-text">
          {!valid ? `*${validationText}` : ""}
        </div>
      </div>
    );
  }
);

export default CustomTextInput;
