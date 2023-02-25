import { forwardRef } from "react";

type OptionType = {
  value: string;
  text: string;
};

type CustomSelectInputType = {
  id: string;
  label: string;
  value: string;
  valid: boolean;
  validationText: string;
  options: OptionType[];
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const CustomSelect = forwardRef(
  (
    {
      id,
      label,
      value,
      valid,
      validationText,
      options,
      defaultValue,
      onChange,
    }: CustomSelectInputType,
    ref: React.Ref<HTMLSelectElement>
  ) => {
    return (
      <div className="custom-text-input-container">
        <label htmlFor={id} className="custom-text-input-label">
          {label}
        </label>
        <select
          className="custom-text-input"
          id={id}
          ref={ref}
          defaultValue={defaultValue}
          value={value}
          onChange={onChange}
        >
          {options.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            );
          })}
        </select>
        <div className="custom-input-validation-text">
          {!valid ? `*${validationText}` : ""}
        </div>
      </div>
    );
  }
);

export default CustomSelect;
