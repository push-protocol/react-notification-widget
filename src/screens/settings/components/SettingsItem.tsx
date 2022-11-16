import React, { ReactNode, useState } from 'react';
import styled from 'styled-components';
import Flex from 'components/layout/Flex';
import Text from 'components/Text';
import { ArrowDown, ArrowRight } from 'components/icons';

const Container = styled(Flex)<{ open?: boolean }>`
  padding: 8px;
  border-radius: 8px;
  backdrop-filter: ${({ open }) => (open ? 'contrast(0.8)' : 'unset')};
`;

const Header = styled(Flex)`
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
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const IconContainer = styled(Flex)`
  height: 16px;
  width: 16px;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Content = styled(Flex)`
  background: transparent;
`;

type SettingsItemProps = {
  icon?: ReactNode;
  title?: string;
  children?: ReactNode;
  defaultOpen?: boolean;
  connected?: boolean;
};

const SettingsItem = ({ children, icon, title, defaultOpen, connected }: SettingsItemProps) => {
  const [open, setOpen] = useState(!!defaultOpen);

  return (
    <Container gap={1} direction={'column'} open={open}>
      <Header alignItems={'center'}>
        <HeaderInfo gap={1}>
          <DropdownIcon onClick={() => setOpen((prevState) => !prevState)}>
            {open ? <ArrowDown /> : <ArrowRight />}
          </DropdownIcon>
          <IconContainer>{icon}</IconContainer>
          <Text size={'md'} weight={600}>
            {title}
          </Text>
        </HeaderInfo>
        {connected && (
          <Text size={'sm'} color={'#6cf03e'} weight={600}>
            • CONNECTED
          </Text>
        )}
      </Header>
      {open && <Content>{children}</Content>}
    </Container>
  );
};

export default SettingsItem;
