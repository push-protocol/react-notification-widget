import styled, { css, DefaultTheme } from 'styled-components';
import React, { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { Margins, Paddings } from '../types';
import { genSpaces, valToPx, adjustColor, conditionalRenderProp } from '../utils';
import Spinner from '../Spinner';
import { mode } from '../../theme';
import Flex from '../layout/Flex';

const fontSizes = {
  sm: '12px',
  md: '14px',
  lg: '16px',
};

type ButtonVariant = 'gray' | 'primary' | 'outlined' | 'danger' | 'text';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = PropsWithChildren<
  {
    variant?: ButtonVariant;
    size?: ButtonSize;
    textColor?: string;
    height?: string | number;
    width?: string | number;
    isLoading?: boolean;
    borderRadius?: keyof DefaultTheme['w']['borderRadius'];
  } & Margins &
    Paddings
>;

const disabledState = (theme: DefaultTheme): any => css`
  &:disabled {
    transform: unset;
    background: ${mode(theme.w.colors.light[10], theme.w.colors.dark[10])};
    color: ${mode(theme.w.colors.light[30], theme.w.colors.dark[30])};
    cursor: default;
  }
`;

const variantStyles = (variant = 'primary', theme: DefaultTheme): any =>
  ({
    primary: css`
      background: ${theme.w.colors.primary.main};
      &:hover {
        background: ${adjustColor(theme.w.colors.primary.main, 0.8)};
        border-color: ${adjustColor(theme.w.colors.primary.main, 0.8)};
      }
      ${disabledState(theme)}
    `,
    gray: css`
      background: ${mode(theme.w.colors.gray[500], theme.w.colors.dark[10])};
      color: ${mode(theme.w.colors.light[80], theme.w.colors.dark[80])};

      &:hover {
        background: ${mode(theme.w.colors.gray[400], theme.w.colors.dark[30])};
        border-color: ${mode(theme.w.colors.gray[400], theme.w.colors.dark[30])};
      }
      ${disabledState(theme)}
    `,
    outlined: css`
      background-color: transparent;
      border: 2px solid ${theme.w.colors.primary.main};
      color: ${theme.w.colors.primary.main};
      &:disabled {
        transform: unset;
        border-color: ${adjustColor(theme.w.colors.primary.main, 0.5)};
        color: ${adjustColor(theme.w.colors.primary.main, 0.5)};
        cursor: default;
      }
    `,
    danger: css`
      background: ${theme.w.colors.error.main};
      &:hover {
        background: ${adjustColor(theme.w.colors.error.main, 0.8)};
        border-color: ${adjustColor(theme.w.colors.error.main, 0.8)};
      }
      ${disabledState(theme)}
    `,
    text: css`
      background-color: transparent;
      color: ${theme.w.colors.primary.main};
      padding: 0;
      height: unset;
      width: fit-content;
      color: ${disabledState(theme)};
    `,
  }[variant]);

const buttonSizeStyles = (size = 'sm', theme: DefaultTheme): any =>
  ({
    sm: css`
      font-size: ${fontSizes['sm']};
      border-radius: ${theme.w.borderRadius['xs']};
      min-height: 34px;
    `,
    md: css`
      font-size: ${fontSizes['md']};
      border-radius: ${theme.w.borderRadius['xs']};
      min-height: 36px;
    `,
    lg: css`
      font-size: ${fontSizes['lg']};
      border-radius: ${theme.w.borderRadius['sm']};
      min-height: 40px;
    `,
  }[size]);

const ButtonWrapper = styled.button<ButtonProps>`
  ${({
    theme,
    variant = 'primary',
    size = 'md',
    width,
    height,
    textColor,
    borderRadius = 'md',
    ...rest
  }) => `
    &:active {
      transform: translateY(1px);
    };
    transition: .1s background ease, .1s transform ease;
    border-radius: ${theme.w.borderRadius[borderRadius]};
    font-family: ${theme.w.fontFamily};
    cursor: pointer;
    border: none;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
    justify-content: center;
    color: ${textColor || theme.w.colors.button.text};
    ${conditionalRenderProp('width', valToPx(width))};
    ${conditionalRenderProp('height', valToPx(height))};
    ${genSpaces(theme, { pl: 2, pr: 2, pt: 1, pb: 1, ...rest })}
    ${variantStyles(variant, theme).join('')}
    ${buttonSizeStyles(size, theme).join('')}
  `};
`;

const Button = (props: ButtonProps & ButtonHTMLAttributes<any>) => {
  const { children, ...rest } = props;
  return (
    <ButtonWrapper disabled={rest.isLoading || rest.disabled} {...rest}>
      {children}
      {rest.isLoading && (
        <Flex ml={1} style={{ overflow: 'hidden' }}>
          <Spinner size={10} />
        </Flex>
      )}
    </ButtonWrapper>
  );
};

export default Button;
