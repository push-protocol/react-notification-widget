import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { PREFERENCES_WIDTH } from '../consts';
import Text from 'components/Text';
import Flex from 'components/layout/Flex';

const ChannelItem = styled(Flex)<{ disabled: boolean }>`
  height: 100%;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
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
  disabled: boolean;
};

const HeaderChannelItem = ({ icon, title, disabled }: PropsT) => {
  return (
    <ChannelItem
      disabled={disabled}
      direction={'column'}
      alignItems={'center'}
      justifyContent={'space-between'}
    >
      <IconContainer>{icon}</IconContainer>
      <Text size={'sm'}>{title}</Text>
    </ChannelItem>
  );
};

export default HeaderChannelItem;
