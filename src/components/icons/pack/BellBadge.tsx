import React from 'react';
import { useTheme } from 'styled-components';
import { IconProps } from 'components/icons/types';

export const BellBadge = ({ className }: IconProps) => {
  const theme = useTheme();
  const {
    colors: { bell },
  } = theme;

  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.0002 24C13.8112 24 15.3262 22.709 15.6742 21H8.32617C8.67417 22.709 10.1892 24 12.0002 24Z"
        fill={bell.color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13 1.6822V1C13 0.447 12.552 0 12 0C11.448 0 11 0.447 11 1V2.08C7.613 2.568 5 5.481 5 9V11.788C5 13.767 4.133 15.635 2.612 16.921C2.223 17.254 2 17.738 2 18.25C2 19.215 2.785 20 3.75 20H20.25C21.215 20 22 19.215 22 18.25C22 17.738 21.777 17.254 21.379 16.913C19.867 15.635 19 13.767 19 11.788V10.917C18.6748 10.9716 18.3407 11 18 11C14.6863 11 12 8.31371 12 5C12 3.77326 12.3682 2.63251 13 1.6822Z"
        fill={bell.color}
      />
      <circle cx="18" cy="5" r="4" fill="#FF0000" />
    </svg>
  );
};
