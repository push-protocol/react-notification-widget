import React, { ReactNode } from 'react';
import styled from 'styled-components';
import Text from 'components/Text';
import Flex from 'components/layout/Flex';

const ChannelItem = styled(Flex)`
  height: 100%;
`;

const IconContainer = styled(Flex)`
  height: 16px;
  width: 16px;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const HeaderChannelItem = ({ icon, title }: { icon: ReactNode; title: string }) => {
  return (
    <ChannelItem direction={'column'} alignItems={'center'} justifyContent={'space-between'}>
      <IconContainer>{icon}</IconContainer>
      <Text>{title}</Text>
    </ChannelItem>
  );
};

export default HeaderChannelItem;
