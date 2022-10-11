import React from 'react';
import styled from 'styled-components';
import { FAQ_URL } from '../../../global/const';
import Flex from 'components/layout/Flex';
import { Lock } from 'components/icons';
import Text from 'components/Text';
import Link from 'components/Link';
import { useChannelContext } from 'context/ChannelContext';

const LockIcon = styled.div`
  width: 11px;
  height: 11px;
  display: flex;
`;

const EmailHiddenNotice = () => {
  const { name } = useChannelContext();

  return (
    <Flex direction={'column'} gap={0.2}>
      <Flex gap={0.5} mb={0.5} alignItems={'center'}>
        <LockIcon>
          <Lock />
        </LockIcon>
        <Text size={'md'} weight={600}>
          Your email is hidden
        </Text>
      </Flex>
      <Flex direction={'column'} width={'100%'} mb={2}>
        <Text size={'sm2'} color={'secondary'} opacity={0.8}>
          {name} will not have access to your email address.{' '}
        </Text>
        <Link src={FAQ_URL} fontSize={'sm2'}>
          Learn more
        </Link>
      </Flex>
    </Flex>
  );
};

export default EmailHiddenNotice;
