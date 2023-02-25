import { forwardRef } from "react";

type CustomNumberInputType = {
  id: string;
  label: string;
  value: number | string | undefined;
  valid: boolean;
  validationText: string;
  placeholder?: string | undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setVal: React.Dispatch<React.SetStateAction<string | number>>;
};

const CustomNumberInput = forwardRef(
  (
    {
      id,
      label,
      value,
      valid,
      validationText,
      placeholder,
      setVal,
    }: CustomNumberInputType,
    ref: React.Ref<HTMLInputElement>
  ) => {
    return (
      <div className="custom-text-input-container">
        <label htmlFor={id} className="custom-text-input-label">
          {label}
        </label>
        <input
          ref={ref}
          type="text"
          inputMode="numeric"
          id={id}
          value={value}
          placeholder={placeholder}
          onChange={(e) => {
            const inputValue = e.target.value;
            if (!inputValue || inputValue.match(/^\d{1,}(\.\d{0,4})?$/)) {
              setVal(inputValue);
            }
          }}
          className={`custom-text-input ${!valid ? "invalid" : ""}`}
        />
        <div className="custom-input-validation-text">
          {!valid ? `*${validationText}` : ""}
        </div>
      </div>
    );
  }
);

export default CustomNumberInput;
