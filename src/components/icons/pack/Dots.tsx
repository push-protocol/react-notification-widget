import React from 'react';
import { IconProps } from '../types';

export const Dots = ({ className }: IconProps) => {
  return (
    <svg
      viewBox="0 0 83 12"
      className={className}
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle opacity="0.2" cx="3" cy="9" r="3" fill="currentColor" />
      <circle opacity="0.3" cx="14" cy="6" r="3" fill="currentColor" />
      <circle opacity="0.4" cx="25" cy="4" r="3" fill="currentColor" />
      <circle opacity="0.5" cx="36" cy="3" r="3" fill="currentColor" />
      <circle opacity="0.6" cx="47" cy="3" r="3" fill="currentColor" />
      <circle opacity="0.7" cx="58" cy="4" r="3" fill="currentColor" />
      <circle opacity="0.8" cx="69" cy="6" r="3" fill="currentColor" />
      <circle cx="80" cy="9" r="3" fill="currentColor" />
    </svg>
  );
};
