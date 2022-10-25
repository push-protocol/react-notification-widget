import React from 'react';
import { IconProps } from 'components/icons/types';

export const Lock = ({ className, color }: IconProps & { color?: string }) => {
  return (
    <svg
      viewBox="0 0 11 11"
      className={className}
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path
          d="M8.59375 4.125H8.25V2.75C8.25 1.23334 7.01666 0 5.5 0C3.98334 0 2.75 1.23334 2.75 2.75V4.125H2.40625C1.83792 4.125 1.375 4.58742 1.375 5.15625V9.96875C1.375 10.5376 1.83792 11 2.40625 11H8.59375C9.16208 11 9.625 10.5376 9.625 9.96875V5.15625C9.625 4.58742 9.16208 4.125 8.59375 4.125ZM3.66669 2.75C3.66669 1.73889 4.48889 0.916695 5.5 0.916695C6.51111 0.916695 7.33331 1.73889 7.33331 2.75V4.125H3.66669V2.75Z"
          fill={color || '#FCFCFC'}
        />
      </g>
    </svg>
  );
};
