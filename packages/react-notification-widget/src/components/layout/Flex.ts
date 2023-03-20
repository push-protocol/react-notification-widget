import styled, { DefaultTheme } from "styled-components";
import { conditionalRenderProp, genSpaces, valToPx } from "../utils";
import { Paddings, Margins } from "../types";

export type FlexProps = {
  height?: string | number;
  br?: keyof DefaultTheme["w"]["borderRadius"];
  width?: string | number;
  direction?: "column" | "row";
  gap?: number | string;
  alignItems?: "space-between" | "start" | "end" | "center";
  justifyContent?: "space-between" | "start" | "end" | "center";
  bg?: string;
} & Paddings &
  Margins;

const Flex = styled.div<FlexProps>`
  ${({
    theme,
    direction,
    height,
    width,
    br,
    gap,
    justifyContent,
    alignItems,
    bg,
    ...rest
  }) => `
    display: flex;
    ${conditionalRenderProp("background-color", bg)};
    ${conditionalRenderProp(
      "border-radius",
      br ? theme.w.borderRadius[br] : undefined
    )};
    ${conditionalRenderProp("height", valToPx(height))};
    ${conditionalRenderProp("width", valToPx(width))};
    ${conditionalRenderProp("flex-direction", direction)};
    ${conditionalRenderProp("gap", valToPx(gap, theme.w.spacing))};
    ${conditionalRenderProp("align-items", alignItems)};
    ${conditionalRenderProp("justify-content", justifyContent)};
    ${genSpaces(theme, rest)}
  `};
`;

export default Flex;
