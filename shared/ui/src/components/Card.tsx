import React from 'react';

type CardProps = {
  children: React.ReactNode;
};

const Card: React.FC<CardProps> = ({ children }) => (
  <div className="p-4 bg-white rounded shadow border border-gray-200">
    {children}
  </div>
);

export default Card; 