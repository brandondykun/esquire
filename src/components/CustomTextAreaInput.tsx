import { forwardRef } from "react";

type CustomTextAreaInputType = {
  id: string;
  label: string;
  value: string;
  valid: boolean;
  validationText: string;
  placeholder?: string;
  rows?: number;
  cols?: number;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const CustomTextAreaInput = forwardRef(
  (
    {
      id,
      label,
      value,
      valid,
      validationText,
      onChange,
      placeholder,
      rows,
      cols,
    }: CustomTextAreaInputType,
    ref: React.Ref<HTMLTextAreaElement>
  ) => {
    return (
      <div className="custom-text-input-container">
        <label htmlFor={id} className="custom-text-input-label">
          {label}
        </label>
        <textarea
          ref={ref}
          id={id}
          rows={rows ? rows : 2}
          cols={cols ? cols : undefined}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className={`custom-text-input text-area ${!valid ? "invalid" : ""}`}
          maxLength={500}
        />
        <div className="custom-input-validation-text">
          {!valid ? `*${validationText}` : ""}
        </div>
      </div>
    );
  }
);

export default CustomTextAreaInput;
