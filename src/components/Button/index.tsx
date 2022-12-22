import styled, { css, DefaultTheme } from 'styled-components';
import React, { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { Margins, Paddings } from '../types';
import { genSpaces, renderStringNumValue, adjustColor, conditionalRenderProp } from '../utils';
import Spinner from '../Spinner';
import { mode } from '../../theme';
import Flex from 'components/layout/Flex';

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
    borderRadius?: keyof DefaultTheme['borderRadius'];
  } & Margins &
    Paddings
>;

const disabledState = (theme: DefaultTheme): any => css`
  &:disabled {
    transform: unset;
    background: ${mode(theme.colors.light[10], theme.colors.dark[10])};
    color: ${mode(theme.colors.light[30], theme.colors.dark[30])};
    cursor: default;
  }
`;

const variantStyles = (variant = 'primary', theme: DefaultTheme): any =>
  ({
    primary: css`
      background: ${theme.colors.primary.main};
      &:hover {
        background: ${adjustColor(theme.colors.primary.main, 0.8)};
        border-color: ${adjustColor(theme.colors.primary.main, 0.8)};
      }
      ${disabledState(theme)}
    `,
    gray: css`
      background: ${mode(theme.colors.gray[500], theme.colors.dark[10])};
      color: ${mode(theme.colors.light[80], theme.colors.dark[80])};

      &:hover {
        background: ${mode(theme.colors.gray[300], theme.colors.dark[30])};
        border-color: ${theme.colors.gray[300]};
      }
      ${disabledState(theme)}
    `,
    outlined: css`
      background-color: transparent;
      border: 2px solid ${theme.colors.primary.main};
      color: ${theme.colors.primary.main};
      &:disabled {
        transform: unset;
        border-color: ${adjustColor(theme.colors.primary.main, 0.5)};
        color: ${adjustColor(theme.colors.primary.main, 0.5)};
        cursor: default;
      }
    `,
    danger: css`
      background: ${theme.colors.error.main};
      &:hover {
        background: ${adjustColor(theme.colors.error.main, 0.8)};
        border-color: ${adjustColor(theme.colors.error.main, 0.8)};
      }
      ${disabledState(theme)}
    `,
    text: css`
      background-color: transparent;
      color: ${theme.colors.primary.main};
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
      border-radius: ${theme.borderRadius['xs']};
      min-height: 34px;
    `,
    md: css`
      font-size: ${fontSizes['md']};
      border-radius: ${theme.borderRadius['xs']};
      min-height: 36px;
    `,
    lg: css`
      font-size: ${fontSizes['lg']};
      border-radius: ${theme.borderRadius['sm']};
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
    border-radius: ${theme.borderRadius[borderRadius]};
    cursor: pointer;
    border: none;
    font-weight: 600;
    display: flex;
    align-self: flex-start;
    align-items: center;
    gap: 8px;
    justify-content: center;
    padding: ${theme.spacing(1)}px ${theme.spacing(3)}px;
    color: ${textColor || theme.colors.button.text};
    ${conditionalRenderProp('width', renderStringNumValue(width))};
    ${conditionalRenderProp('height', renderStringNumValue(height))};
    ${genSpaces(theme, rest)}
    ${variantStyles(variant, theme).join('')}
    ${buttonSizeStyles(size, theme).join('')}
  `};
`;

const Button = (props: ButtonProps & ButtonHTMLAttributes<any>) => {
  const { children, ...rest } = props;
  return (
    <ButtonWrapper {...rest}>
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
