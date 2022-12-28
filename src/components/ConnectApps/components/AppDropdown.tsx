import React, { ReactNode } from 'react';
import styled, { useTheme, keyframes } from 'styled-components';
import Flex from 'components/layout/Flex';
import Text from 'components/Text';
import { ArrowRight } from 'components/icons';

const Container = styled(Flex)<{ open?: boolean }>`
  border-radius: ${({ theme }) => theme.w.borderRadius.md};
  background: ${({ theme, open }) => (open ? theme.w.colors.dark['10'] : 'unset')};
  border: ${({ theme, open }) =>
    open ? `1px solid ${theme.w.colors.light['10']}` : '1px solid transparent'};
  transition: all 0.2s ease-in-out;
  :hover {
    background: ${({ theme }) => theme.w.colors.dark['10']};
  }
`;

const Header = styled(Flex)`
  padding: 8px;
  cursor: pointer;
  background: transparent;
  display: flex;
  justify-content: space-between;
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

const openDropdown = keyframes`
  0%   { max-height: 0; }
  100% { max-height: 500px; }
`;

const Content = styled(Flex)<{ open?: boolean }>`
  padding: 8px 8px 12px 8px;
  background: transparent;
  max-height: 500px;
  overflow: hidden;
  animation: ${openDropdown} 1s linear;
`;

type SettingsItemProps = {
  icon?: ReactNode;
  title?: string;
  children?: ReactNode;
  open?: boolean;
  setOpen?: () => void;
  isConnected?: boolean;
};

const AppDropdown = ({ children, icon, title, open, setOpen, isConnected }: SettingsItemProps) => {
  const theme = useTheme();
  return (
    <Container gap={1} direction={'column'} open={open}>
      <Header alignItems={'center'} onClick={setOpen}>
        <HeaderInfo gap={1}>
          <DropdownIcon open={open}>
            <ArrowRight />
          </DropdownIcon>
          <IconContainer>{icon}</IconContainer>
          <Text size={'lg'} weight={600}>
            {title}
          </Text>
        </HeaderInfo>
        {isConnected && (
          <Text size={'sm'} color={theme.w.colors.success.main} weight={600}>
            • CONNECTED
          </Text>
        )}
      </Header>
      {open && <Content>{children}</Content>}
    </Container>
  );
};

export default AppDropdown;
