import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = (props) => (
  <input className="px-3 py-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500" {...props} />
);

export default Input; 