import React from 'react';
import { IconProps } from 'components/icons/types';

export const ArrowRight = ({ className }: IconProps) => {
  return (
    <svg
      viewBox="0 0 10 18"
      className={className}
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.6"
        d="M2 16L8 9L2 2"
        stroke="currentColor"
        fill="transparent"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
