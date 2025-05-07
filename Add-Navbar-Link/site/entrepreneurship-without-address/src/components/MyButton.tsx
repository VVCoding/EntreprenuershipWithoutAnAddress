'use client';

import React from 'react';

interface ButtonProps {
  className?: string;
  children?: React.ReactNode;
}

const MyButton: React.FC<ButtonProps> = ({ className, children }) => {
  return (
    <button
      className={className}
      onClick={() => window.open('https://tally.so/r/n0k0yQ', '_blank', 'noopener,noreferrer')}
    >
      {children}
    </button>
  );
};

export default MyButton;