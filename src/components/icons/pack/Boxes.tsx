import React from 'react';
import { IconProps } from 'components/icons/types';

export const Boxes = ({ className }: IconProps) => {
  return (
    <svg
      viewBox="0 0 16 16"
      className={className}
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="7" height="7" rx="2" fill="white" />
      <rect y="9" width="7" height="7" rx="2" fill="white" />
      <rect x="9" width="7" height="7" rx="2" fill="white" />
      <rect x="9" y="9" width="7" height="7" rx="2" fill="white" />
    </svg>
  );
};
