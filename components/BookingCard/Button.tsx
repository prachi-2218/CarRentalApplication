// Button.tsx
import React from "react";
import "./Button.css";

interface ButtonProps {
  text: string;
  variant: "cancel" | "edit" | "feedback" | "view-feedback" | "support-chat";
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, variant, onClick }) => {
  return (
    <button className={`btn ${variant} cursor-pointer`} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
