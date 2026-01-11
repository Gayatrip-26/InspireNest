import React from 'react';
import './Button.css';

const Button = ({ children, onClick, variant = 'primary', size = 'medium', disabled = false, ...props }) => {
  return (
    <button
      className={`btn btn-${variant} btn-${size}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;



