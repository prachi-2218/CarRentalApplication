import React from 'react';
// import { Link } from 'react-router';
import { useNavigate } from 'react-router';

interface CarReservedModalProps {
  isOpen: boolean;
  onClose: () => void;
 
}

const CarReservedModal: React.FC<CarReservedModalProps> = ({ isOpen, onClose}) => {
    const navigate=useNavigate();
    if (!isOpen) return null;
    
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs">
      <div className="bg-[#fffaf3] rounded-[20px] shadow-xl px-6 py-8 w-[90%] max-w-md text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-3">Sorry,</h2>
        <p className="text-gray-700 text-base mb-6">
          It seems like someone has already reserved this car. <br />
          You can find similar one{' '}

          <span
            className="underline cursor-pointer text-black-800 hover:text-black active:text-black"
            onClick={() => {
              
              onClose();
              navigate("/cars")
            }}
          >
            here
          </span>
          .
        </p>
        <button
          onClick={onClose}
          className="w-full bg-[#d62224] hover:bg-[#ba1d1f] text-white py-2.5 rounded-full font-semibold text-lg transition"
        >
          Ok
        </button>
      </div>
    </div>
  );
};

export default CarReservedModal;
