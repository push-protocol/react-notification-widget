import React, { ReactNode } from 'react';
import styled from 'styled-components';
import Flex from 'components/layout/Flex';
import Text from 'components/Text';

const Container = styled(Flex)`
  padding: 8px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.07);
`;

const Header = styled(Flex)`
  background: transparent;
`;

const IconContainer = styled(Flex)`
  height: 24px;
  width: 24px;
  border-radius: 100%;
  background: linear-gradient(180deg, #5278ff 0%, #528fff 100%);
`;

const Content = styled(Flex)`
  background: transparent;
`;

type SettingsItemProps = {
  icon?: ReactNode;
  title?: string;
  children?: ReactNode;
};

const SettingsItem = ({ children, icon, title }: SettingsItemProps) => {
  return (
    <Container gap={1} direction={'column'}>
      <Header gap={1} alignItems={'center'}>
        <IconContainer>{icon}</IconContainer>
        <Text size={'md'} weight={600}>
          {title}
        </Text>
      </Header>
      <Content>{children}</Content>
    </Container>
  );
};

export default SettingsItem;
