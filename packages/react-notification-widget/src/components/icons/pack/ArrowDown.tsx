import React from "react";
import { IconProps } from "../types";

export const ArrowDown = ({ className }: IconProps) => {
  return (
    <svg
      viewBox="0 0 18 10"
      className={className}
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.6"
        d="M2 2L9 8L16 2"
        stroke="currentColor"
        fill="transparent"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
