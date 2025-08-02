import React from "react";

interface CloseButtonProps {
  onClick: () => void;
}

const CloseButton: React.FC<CloseButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute top-2 right-4 text-black text-2xl font-bold hover:cursor-pointer"
      aria-label="Close"
    >
      &times;
    </button>
  );
};

export default CloseButton;
