import React from 'react';
import styled, { useTheme } from 'styled-components';
import { FAQ_URL } from 'global/const';
import Flex from 'components/layout/Flex';
import { Lock } from 'components/icons';
import Text from 'components/Text';
import Link from 'components/Link';
import { useChannelContext } from 'context/ChannelContext';

const NoticeContainer = styled(Flex)`
  align-self: start;
`;

const LockIconContainer = styled.div`
  width: 11px;
  height: 11px;
  display: flex;
  color: black;
`;

const HiddenNotice = () => {
  const { name } = useChannelContext();
  const theme = useTheme();
  const {
    colors: { text },
  } = theme;

  return (
    <NoticeContainer>
      <Flex direction={'column'} gap={0.2}>
        <Flex gap={0.5} mb={0.5} alignItems={'center'}>
          <LockIconContainer>
            <Lock color={text.primary} />
          </LockIconContainer>
          <Text size={'md'} weight={600}>
            Your contact info is hidden
          </Text>
        </Flex>
        <Flex direction={'column'} width={'100%'} mb={2}>
          <Text size={'sm'} color={'secondary'} opacity={0.8}>
            {name} won’t have access to your email address or Telegram handle.{' '}
            <Link src={FAQ_URL} fontSize={'sm'}>
              Learn more
            </Link>
          </Text>
        </Flex>
      </Flex>
    </NoticeContainer>
  );
};

export default HiddenNotice;
