import React from 'react';
import { IconProps } from '../types';

export const Check = ({ className }: IconProps) => {
  return (
    <svg
      viewBox="0 0 22 18"
      className={className}
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 8.5L7.97561 15.5L19.5 2"
        stroke="currentColor"
        strokeWidth="4"
        fill={'transparent'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
