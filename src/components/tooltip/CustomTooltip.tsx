import React from 'react';
import './CustomTooltip.css';

type CustomTooltip = {
  text: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  children: React.ReactNode;
};

const CustomTooltip = ({ children, text, position, ...props }: CustomTooltip) => {
  return (
    <div className="tooltip" {...props}>
      {children}
      <span className={`tooltiptext tooltiptext--${position}`}>{text}</span>
    </div>
  );
};

export default CustomTooltip;
