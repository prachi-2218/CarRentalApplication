import React, { useEffect, useState } from 'react';
import './Toast.css';
import { useLocation } from 'react-router';

interface ToastProps {
  type: 'success' | 'alert';
  message: string;
  duration?: number; // Optional: how long it stays visible in milliseconds
}

const Toast: React.FC<ToastProps> = ({ type, message, duration = 3000 }) => {
  const [visible, setVisible] = useState(true);
  const location=useLocation()

    useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  return (
    <div
    style={{ padding: "10px 16px" }}
    className={`w-[350px] ${
      type === 'success'
        ? location.pathname === '/signup'
          ? "flex items-start text-sm justify-center fixed top-[20px] md:right-[20px] lg:right-1/8 bg-green-100 text-green-800 rounded-md shadow-md"
          : "flex items-start fixed right-[20px] top-[20px] bg-green-100 text-green-800 rounded-md shadow-md"
        : "flex items-start fixed right-[20px] top-[20px] bg-red-100 text-red-800 rounded-md shadow-md"
    }`}
  >
      
      <div className="flex w-[8%]">
        {type === "success" ? (
          <svg fill="#149E32" width="14" height="14" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
            <path d="M 500 0C 224 0 0 224 0 500C 0 776 224 1000 500 1000C 776 1000 1000 776 1000 500C 1000 224 776 0 500 0C 500 0 500 0 500 0M 500 75C 735 75 925 265 925 500C 925 735 735 925 500 925C 265 925 75 735 75 500C 75 265 265 75 500 75C 500 75 500 75 500 75M 250 475C 279 504 359 586 390 615C 400 625 410 615 410 615C 410 615 625 400 750 275C 765 260 785 260 800 275C 816 292 837 313 850 325C 865 340 865 360 850 375C 700 525 583 642 425 800C 410 815 390 815 375 800C 292 717 150 575 150 575C 135 560 135 540 150 525C 150 525 200 475 200 475C 215 461 235 460 250 475C 250 475 250 475 250 475"/>
          </svg>
        ) : (
          <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
          </svg>
        )}
      </div>
    
      <div className="w-[87%]">
        <strong className="block">{type === 'success' ? 'Congratulations!' : 'Alert!'}</strong>
        <p className="text-sm">{message}</p>
      </div>
    
      <button
        className="ml-4 w-[5%] text-xl leading-none text-gray-700 cursor-pointer hover:text-gray-900 focus:outline-none"
        onClick={() => setVisible(false)}
      >
        ×
      </button>
    
    </div>
    
  );
};

export default Toast;



