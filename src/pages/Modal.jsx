import React from 'react';
import { FaTimes } from 'react-icons/fa';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
      <div className='bg-white rounded-lg p-6 relative'>
        <button
          className='absolute top-2 right-2 text-gray-600 hover:text-gray-800'
          onClick={onClose}
        >
          <FaTimes />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
