import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { PREFERENCES_WIDTH } from '../consts';
import Text from '../../Text';
import Flex from '../../layout/Flex';

const ChannelItem = styled(Flex)`
  height: 100%;
  width: ${PREFERENCES_WIDTH / 3}px;
`;

const IconContainer = styled(Flex)`
  height: 16px;
  width: 16px;
  color: ${({ theme }) => theme.w.colors.text.primary};
`;

type PropsT = {
  icon: ReactNode;
  title: string;
};

const HeaderChannelItem = ({ icon, title }: PropsT) => {
  return (
    <ChannelItem direction={'column'} alignItems={'center'} justifyContent={'space-between'}>
      <IconContainer>{icon}</IconContainer>
      <Text size={'sm'}>{title}</Text>
    </ChannelItem>
  );
};

export default HeaderChannelItem;
