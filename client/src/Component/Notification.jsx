import React, { useEffect } from 'react';

const Notification = ({ message = "Hello", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();  
    }, 5000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  return (
    <div
      className={`fixed top-4 right-4 max-w-xs md:max-w-lg w-full p-4 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform bg-white z-50`}
    >
      <div className="flex justify-between items-center">
        <span className="text-sm font-semibold text-pink-600">{message}</span>
        <button
          onClick={onClose}
          className="text-xl font-bold text-black focus:outline-none"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Notification;