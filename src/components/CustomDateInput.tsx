import { forwardRef } from "react";

type CustomDateInputType = {
  id: string;
  label: string;
  value: string;
  valid: boolean;
  validationText: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CustomDateInput = forwardRef(
  (
    { id, label, value, valid, validationText, onChange }: CustomDateInputType,
    ref: React.Ref<HTMLInputElement>
  ) => {
    return (
      <div className="custom-text-input-container">
        <label htmlFor={id} className="custom-text-input-label">
          {label}
        </label>
        <input
          type="datetime-local"
          id={id}
          className={`custom-text-input ${!valid ? "invalid" : ""}`}
          value={value}
          onChange={onChange}
        />
        <div className="custom-input-validation-text">
          {!valid ? `*${validationText}` : ""}
        </div>
      </div>
    );
  }
);

export default CustomDateInput;
