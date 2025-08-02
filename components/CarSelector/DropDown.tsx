// DropDown.tsx
import React from "react";
import "./DropDown.css";

interface DropDownProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  grayLabel?: boolean;
}


const DropDown: React.FC<DropDownProps> = ({
  label,
  options,
  value,
  onChange,
  disabled = false,
  grayLabel = false,

}) => {


  return (
    <div className="field compact">
      <label className={grayLabel ? "gray-label" : ""}>{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} disabled={disabled}>
        <option value="">Select {label}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDown;
