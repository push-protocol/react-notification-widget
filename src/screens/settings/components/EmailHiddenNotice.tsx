import React from 'react';
import styled from 'styled-components';
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

  const handleLearnMore = () => {
    // TODO: if local text append needed handle here, or replace onClick with url
  };

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
      <Flex direction={'column'} width={'100%'}>
        <Text size={'sm'} color={'secondary'} opacity={0.8}>
          {name} will not have access to your email address.{' '}
        </Text>
        <Link src={'putsomethinghere'}>Learn more</Link>
      </Flex>
    </Flex>
  );
};

export default EmailHiddenNotice;
