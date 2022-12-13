import React from 'react';
import styled from 'styled-components';
import Flex from 'components/layout/Flex';
import { Lock } from 'components/icons';
import Text from 'components/Text';

const NoticeContainer = styled(Flex)`
  align-self: start;
  justify-content: center;
  width: 100%;
  color: ${({ theme }) => theme.colors.gray[50]};
`;

const LockIconContainer = styled.div`
  width: 11px;
  height: 11px;
  display: flex;
  color: inherit;
  padding: 1px 0;
`;

const HiddenNotice = ({ text }: { text: string }) => (
  <NoticeContainer>
    <Flex gap={0.5} alignItems={'start'}>
      <LockIconContainer>
        <Lock />
      </LockIconContainer>
      <Text size={'sm'} color={'inherit'} opacity={0.8} weight={500} align={'center'}>
        {text}
      </Text>
    </Flex>
  </NoticeContainer>
);

export default HiddenNotice;
