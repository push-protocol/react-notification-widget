import React from 'react';
import { IconProps } from 'components/icons/types';

export const Boxes = ({ className, color }: IconProps & { color?: string }) => {
  const fillColor = color || 'white';

  return (
    <svg
      viewBox="0 0 16 16"
      className={className}
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="7" height="7" rx="2" fill={fillColor} />
      <rect y="9" width="7" height="7" rx="2" fill={fillColor} />
      <rect x="9" width="7" height="7" rx="2" fill={fillColor} />
      <rect x="9" y="9" width="7" height="7" rx="2" fill={fillColor} />
    </svg>
  );
};
