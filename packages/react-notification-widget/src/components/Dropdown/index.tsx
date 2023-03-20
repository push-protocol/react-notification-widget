import React, { ReactNode, useEffect, useRef } from 'react';
import styled, { useTheme } from 'styled-components';
import Spinner from '../Spinner';
import Flex from '../layout/Flex';
import Text from '../Text';
import { ArrowRight } from '../icons';
import { mode } from '../../theme';

const Container = styled(Flex)<{ open?: boolean }>`
  width: 100%;
  border-radius: ${({ theme }) => theme.w.borderRadius.md};
  background: ${({ theme, open }) =>
    open ? mode(theme.w.colors.dark['10'], theme.w.colors.light['10']) : 'unset'};
  border: ${({ theme, open }) =>
    open ? `1px solid ${theme.w.colors.light['10']}` : '1px solid transparent'};
  transition: all 0.2s ease-in-out;
`;

const DropdownHeader = styled(Flex)`
  padding: 8px;
  border-radius: ${({ theme }) => theme.w.borderRadius.md};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  background: transparent;
  justify-content: space-between;

  :hover {
    background: ${({ theme }) => mode(theme.w.colors.light['10'], theme.w.colors.dark['10'])};
  }
`;

const HeaderInfo = styled(Flex)`
  height: 32px;
  display: flex;
  align-items: center;
`;

const DropdownIcon = styled(Flex)<{ open?: boolean }>`
  height: 18px;
  width: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.w.colors.text.primary};
  transform: ${({ open }) => (open ? `rotate(90deg)` : `rotate(0deg)`)};
  transition: all 0.2s ease-in-out;
`;

const IconContainer = styled(Flex)`
  height: 16px;
  width: 16px;
  color: ${({ theme }) => theme.w.colors.text.primary};
`;

const Content = styled(Flex)<{ open?: boolean }>`
  overflow: hidden;
  transition: opacity 0.3s ease-out, max-height 0.4s ease-out, padding 0.2s linear;
  ${({ open }) =>
    open
      ? { maxHeight: 500, padding: '8px 8px 12px 8px', opacity: 1 }
      : { maxHeight: 0, opacity: 0, padding: 0 }}
`;

type SettingsItemProps = {
  icon: ReactNode | string;
  title: string;
  children: ReactNode;
  isOpen: boolean;
  toggleOpen: () => void;
  isConnected?: boolean;
  isLoading?: boolean;
};

const Dropdown = ({
  children,
  isLoading,
  icon,
  title,
  isOpen,
  toggleOpen,
  isConnected,
}: SettingsItemProps) => {
  const theme = useTheme();

  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isOpen && ref?.current) {
        ref?.current.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'nearest',
        });
      }
    }, 200); // Needed because of app dropdown animation

    return () => clearTimeout(timer);
  }, [isOpen]);

  return (
    <Container direction={'column'} open={isOpen}>
      <DropdownHeader alignItems={'center'} onClick={toggleOpen}>
        <HeaderInfo gap={1}>
          <DropdownIcon open={isOpen}>
            <ArrowRight />
          </DropdownIcon>
          {typeof icon === 'string' ? (
            <img src={icon} width={24} height={24} style={{ borderRadius: 25 }} />
          ) : (
            <IconContainer>{icon}</IconContainer>
          )}
          <Text size={'lg'} weight={600}>
            {title}
          </Text>
        </HeaderInfo>
        {isLoading ? (
          <Spinner size={18} />
        ) : (
          isConnected && (
            <Text size={'sm'} color={theme.w.colors.success.main} weight={600}>
              • CONNECTED
            </Text>
          )
        )}
      </DropdownHeader>
      <Content open={isOpen}>{children}</Content>
      <span ref={ref} />
    </Container>
  );
};

export default Dropdown;
