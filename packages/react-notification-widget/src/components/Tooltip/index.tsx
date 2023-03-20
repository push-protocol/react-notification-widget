import React, { useState, PropsWithChildren } from "react";

import styled from "styled-components";
import { adjustColor } from "../utils";

const TRANSITION_TIME = "300ms";

type TooltipPosition = "top-right";

const calcXPosition = (pos?: TooltipPosition) =>
  pos === "top-right" ? "-10%" : "-50%";

const Container = styled.div<{ position?: TooltipPosition }>(
  ({ position, theme }) => ({
    position: "relative",
    "& .tooltip-label": {
      color: theme.w.colors.text.primary,
      position: "absolute",
      padding: ".5em",
      marginBottom: "1em",
      bottom: "100%",
      left: "50%",
      transform: "translateX(-50%)",
      minWidth: "8em",
      borderRadius: "2px",
      backgroundColor: adjustColor(theme.w.colors.bg.main, 0.8),
      boxShadow: "0 3px 16px rgba(black, 0.15)",
      "&:after": {
        content: '""',
        position: "absolute",
        width: "0",
        height: "0",
        border: ".4em solid transparent",
        borderTopColor: adjustColor(theme.w.colors.bg.main, 0.8),
        left: "10%",
        zIndex: "-1",
        transform: `translateX(${calcXPosition(position)})`,
        transition: `top ${TRANSITION_TIME} ease`,
      },
    },
    "&.is-visible": {
      "& .tooltip-label": {
        transform: `translateY(0) translateX(${calcXPosition(position)})`,
        opacity: "1",
        visibility: "visible",
        transition: `transform ${TRANSITION_TIME} ease, opacity ${TRANSITION_TIME}, visibility ${TRANSITION_TIME} 0s`,
        "&:after": {
          top: "100%",
        },
      },
    },
    "&.is-hidden": {
      "& .tooltip-label": {
        transform: "translateY(100%) translateX(-50%)",
        opacity: "0",
        visibility: "hidden",
        transition: `transform ${TRANSITION_TIME} ease, opacity ${TRANSITION_TIME}, visibility ${TRANSITION_TIME} ${TRANSITION_TIME}`,
        "&:after": {
          top: 0,
        },
      },
    },
  })
);

type TooltipProps = PropsWithChildren<{
  delayTime?: number;
  label: string;
  position?: TooltipPosition;
}>;

const Tooltip = (props: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timer, setTimer] = useState<any>();

  const handleMouseEnter = () => {
    setTimer(setTimeout(() => setIsVisible(true), props.delayTime || 200));
  };

  const handleMouseLeave = () => {
    clearTimeout(timer);
    setIsVisible(false);
  };

  const isVisibleCs = isVisible ? "is-visible" : "is-hidden";

  return (
    <Container
      position={props.position}
      className={isVisibleCs}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className="tooltip-label">{props.label}</span>
      {props.children}
    </Container>
  );
};

export default Tooltip;
