import React from 'react';
import styled from 'styled-components';
import { WHEREVER_FAQ } from '../../global/const';
import Link from '../../components/Link';
import { Screen } from 'components/layout/Screen';
import Text from 'components/Text';
import Flex from 'components/layout/Flex';
import { useChannelContext } from 'context/ChannelContext';
import Button from 'components/Button';
import { Routes, useRouterContext } from 'context/RouterContext';

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
  const { icon } = useChannelContext();
  const { setRoute } = useRouterContext();

  const handleViewSettings = () => {
    setRoute(Routes.Settings);
  };

  return (
    <Screen>
      <Flex justifyContent={'center'} alignItems={'center'} direction={'column'} gap={2}>
        <HeaderIconContainer>
          <HeaderIcon src={icon} />
        </HeaderIconContainer>
        <Text size={'xl'} align={'center'} weight={700}>
          Thanks for subscribing!
        </Text>
        <Text mb={2} align={'center'}>
          <br />
          You’re all set here - feel free to close this tab and head back to Discord, or you can
          <Link display={'inline-block'} onClick={handleViewSettings}>
            &nbsp;continue to Settings&nbsp;
          </Link>
          to view or update your preferences.
        </Text>
        <img
          alt={'goodbye-pic'}
          style={{ borderRadius: 12 }}
          height={350}
          src={
            'https://lh3.googleusercontent.com/lWEX3-m5_ZUB0HWZs6Fm_x1sS0kfw3qI3YCMtrYGuzaDnQUjATvIQldYyX6ys5d6Sa4=w2400'
          }
        />
      </Flex>
    </Screen>
  );
};
