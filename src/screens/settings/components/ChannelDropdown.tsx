import React, { ReactNode, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import Flex from 'components/layout/Flex';
import Text from 'components/Text';
import { ArrowDown, ArrowRight } from 'components/icons';

const Container = styled(Flex)<{ open?: boolean }>`
  border-radius: 8px;
  backdrop-filter: ${({ open }) => (open ? 'contrast(0.8)' : 'unset')};
  :hover {
    backdrop-filter: contrast(0.8);
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

const DropdownIcon = styled(Flex)`
  height: 18px;
  width: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const IconContainer = styled(Flex)`
  height: 16px;
  width: 16px;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Content = styled(Flex)`
  padding: 8px;
  background: transparent;
`;

type SettingsItemProps = {
  icon?: ReactNode;
  title?: string;
  children?: ReactNode;
  open?: boolean;
  setOpen?: () => void;
  connected?: boolean;
};

const ChannelDropdown = ({
  children,
  icon,
  title,
  open,
  setOpen,
  connected,
}: SettingsItemProps) => {
  const theme = useTheme();
  return (
    <Container gap={1} direction={'column'} open={open}>
      <Header alignItems={'center'} onClick={setOpen}>
        <HeaderInfo gap={1}>
          <DropdownIcon>{open ? <ArrowDown /> : <ArrowRight />}</DropdownIcon>
          <IconContainer>{icon}</IconContainer>
          <Text size={'md'} weight={600}>
            {title}
          </Text>
        </HeaderInfo>
        {connected && (
          <Text size={'sm'} color={theme.colors.success.main} weight={600}>
            • CONNECTED
          </Text>
        )}
      </Header>
      {open && <Content>{children}</Content>}
    </Container>
  );
};

export default ChannelDropdown;
