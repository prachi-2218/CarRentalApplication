import React from "react";
import { useEffect } from "react";
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
  useEffect(()=>{
    const link=document.createElement("link")
    link.rel="stylesheet"
    link.href="src/components/CarSelector/Button.css"
    document.head.appendChild(link)
    return ()=>{
      link.remove()
    }
  },[])
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