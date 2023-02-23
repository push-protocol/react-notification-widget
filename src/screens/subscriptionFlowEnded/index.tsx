import React from 'react';
import styled from 'styled-components';
import { useChannelContext } from 'context/ChannelContext';
import { Routes, useRouterContext } from 'context/RouterContext';
import Button from 'components/Button';
import Link from 'components/Link';
import { Screen } from 'components/layout/Screen';
import Text from 'components/Text';
import Flex from 'components/layout/Flex';

const HeaderIconContainer = styled.div`
  height: 64px;
  width: 64px;
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.w.colors.primary.main};
  margin-bottom: ${({ theme }) => theme.w.spacing(1.5)}px;
`;

const HeaderIcon = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 100px;
`;

export const SubscriptionFlowEnded = () => {
  const { slug } = useChannelContext();
  const { setRoute } = useRouterContext();

  const handleViewSettings = () => {
    setRoute(Routes.Settings);
  };

  return (
    <Screen>
      <Flex justifyContent={'center'} alignItems={'center'} direction={'column'} gap={2}>
        <Text size={'xl'} align={'center'} weight={700}>
          Thank you for subscribing!
        </Text>
        <Text mb={2} align={'center'}>
          <br />
          Change your preferences at any time by visiting
          <Link display={'inline-block'} src={`https://app.wherever.im/channel/${slug}`}>
            &nbsp; app.wherever.im/channel/{slug}&nbsp;
          </Link>
          <Button onClick={handleViewSettings} mt={2} width={'100%'}>
            Continue to Settings
          </Button>
        </Text>
      </Flex>
    </Screen>
  );
};
