import React from 'react';
import styled from 'styled-components';
import Flex from 'components/layout/Flex';
import { Lock } from 'components/icons';
import Text from 'components/Text';
import { useChannelContext } from 'context/ChannelContext';

const NoticeContainer = styled(Flex)`
  align-self: start;
  color: ${({ theme }) => theme.colors.gray[50]};
  padding: ${({ theme }) => theme.spacing(1)}px;
`;

const LockIconContainer = styled.div`
  width: 11px;
  height: 11px;
  display: flex;
  color: inherit;
`;

const HiddenNotice = () => {
  const { name } = useChannelContext();

  return (
    <NoticeContainer>
      <Flex gap={0.5} alignItems={'center'}>
        <LockIconContainer>
          <Lock />
        </LockIconContainer>
        <Text size={'sm'} color={'inherit'} opacity={0.8} weight={500} align={'center'}>
          {name} won’t have access to your contact info
        </Text>
      </Flex>
    </NoticeContainer>
  );
};

export default HiddenNotice;
