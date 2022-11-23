import styled, { css, DefaultTheme } from 'styled-components';
import React, { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { Margins, Paddings } from '../types';
import { genSpaces, renderStringNumValue, adjustColor, conditionalRenderProp } from '../utils';
import Spinner from '../Spinner';
import Flex from 'components/layout/Flex';

const fontSizes = {
  sm: '12px',
  md: '14px',
  lg: '16px',
};

type ButtonVariant = 'gray' | 'primary' | 'outlined' | 'danger' | 'semitransparent' | 'text';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = PropsWithChildren<
  {
    variant?: ButtonVariant;
    size?: ButtonSize;
    fontSize?: keyof typeof fontSizes;
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
    background: ${theme.colors.gray['300']};
    color: ${theme.colors.gray['50']};
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
      &:disabled {
        transform: unset;
        background: ${adjustColor(theme.colors.primary.main, 0.5)};
        border-color: ${adjustColor(theme.colors.primary.main, 0.5)};
        cursor: default;
      }
    `,
    gray: css`
      background: ${theme.colors.gray[500]};
      color: rgba(255, 255, 255, 0.9);

      &:hover {
        background: ${theme.colors.gray[300]};
        border-color: ${theme.colors.gray[300]};
      }
      ${disabledState(theme)}
    `,
    outlined: css`
      background-color: transparent;
      ${disabledState(theme)}
    `,
    danger: css`
      background: ${theme.colors.error.main};
      &:hover {
        background: ${adjustColor(theme.colors.error.main, 0.8)};
        border-color: ${adjustColor(theme.colors.error.main, 0.8)};
      }
      ${disabledState(theme)}
    `,
    semitransparent: css`
      background: ${adjustColor(theme.colors.bg.main, 0.6)};
      &:hover {
        background: ${adjustColor(theme.colors.bg.main, 0.4)};
        border-color: ${adjustColor(theme.colors.bg.main, 0.4)};
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
    `,
    md: css`
      font-size: ${fontSizes['md']};
      border-radius: ${theme.borderRadius['xs']};
    `,
    lg: css`
      font-size: ${fontSizes['lg']};
      border-radius: ${theme.borderRadius['sm']};
    `,
  }[size]);

const ButtonWrapper = styled.button<ButtonProps>`
  ${({
    theme,
    variant = 'primary',
    size = 'sm',
    width,
    height,
    fontSize = 'md',
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
    min-height: 32px;
    align-items: center;
    gap: 8px;
    justify-content: center;
    font-size: ${fontSizes[fontSize]};
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
