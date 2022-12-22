import React, { PropsWithChildren, ReactElement } from 'react';
import styled from 'styled-components';
import Text from '../Text';
import Button from '../Button';
import PageTitle from '../PageTitle';
import Flex from './Flex';
import { useRouterContext } from 'context/RouterContext';

const MobileCloseButton = styled(Button)(({ theme }) => ({
  [`@media (min-width: ${theme.breakpoints.mobile}px)`]: {
    display: 'none',
  },
  width: 30,
  height: 30,
  background: 'transparent',
  padding: 0,
}));

const TitleBar = styled(Flex)`
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

type ScreenPropsT = PropsWithChildren<{
  title?: string;
  mb?: number; // spacing is needed on all screens besides NotificationsFeed
  navbarActionComponent?: ReactElement;
}>;

export const Screen = ({ title, navbarActionComponent, mb = 0, children }: ScreenPropsT) => {
  const { setFeedOpen } = useRouterContext();

  return (
    <Flex direction={'column'} alignItems={'center'} width={'100%'} height={'100%'} mb={mb}>
      <TitleBar mb={title || navbarActionComponent ? 2 : 0}>
        <PageTitle>{title}</PageTitle>
        <Flex style={{ flexBasis: 1 }} alignItems={'center'} gap={1} mr={1}>
          {navbarActionComponent}
          <MobileCloseButton onClick={() => setFeedOpen(false)} variant={'text'}>
            <Text weight={400} size={'xl'}>
              X
            </Text>
          </MobileCloseButton>
        </Flex>
      </TitleBar>
      {children}
    </Flex>
  );
};
