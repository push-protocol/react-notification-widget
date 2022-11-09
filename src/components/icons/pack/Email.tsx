import React from 'react';
import { IconProps } from 'components/icons/types';

export const Email = ({ className }: IconProps) => {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="24" height="24" rx="12" fill="url(#paint0_linear_800_2165)" />
      <g clipPath="url(#clip0_800_2165)">
        <path
          d="M19.0733 7.66089L14.7061 12L19.0733 16.3391C19.1522 16.1741 19.2001 15.9917 19.2001 15.7969V8.20311C19.2001 8.00829 19.1522 7.8259 19.0733 7.66089Z"
          fill="#FCFCFC"
        />
        <path
          d="M17.9344 6.9375H6.06566C5.87084 6.9375 5.68845 6.9854 5.52344 7.06434L11.1052 12.618C11.5987 13.1115 12.4013 13.1115 12.8949 12.618L18.4766 7.06434C18.3116 6.9854 18.1292 6.9375 17.9344 6.9375Z"
          fill="#FCFCFC"
        />
        <path
          d="M4.92665 7.66089C4.8477 7.8259 4.7998 8.00829 4.7998 8.20311V15.7969C4.7998 15.9917 4.8477 16.1741 4.92665 16.3391L9.29387 12L4.92665 7.66089Z"
          fill="#FCFCFC"
        />
        <path
          d="M14.1094 12.5967L13.4914 13.2147C12.6691 14.037 11.331 14.037 10.5086 13.2147L9.89066 12.5967L5.52344 16.9358C5.68845 17.0147 5.87084 17.0626 6.06566 17.0626H17.9344C18.1292 17.0626 18.3116 17.0147 18.4766 16.9358L14.1094 12.5967Z"
          fill="#FCFCFC"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_800_2165"
          x1="12"
          y1="0"
          x2="12"
          y2="24"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#5278FF" />
          <stop offset="1" stopColor="#528FFF" />
        </linearGradient>
        <clipPath id="clip0_800_2165">
          <rect width="14.4" height="14.4" fill="white" transform="translate(4.7998 4.80005)" />
        </clipPath>
      </defs>
    </svg>
  );
};
