import React, { PropsWithChildren, ReactElement } from 'react';
import styled from 'styled-components';
import Text from '../Text';
import Button from '../Button';
import Flex from './Flex';
import { useNotificationsContext } from 'context/NotificationsContext';

export const CenteredContainer = styled(Flex)`
  width: 100%;
  height: 100%;
`;

const MobileCloseButton = styled(Button)(({ theme }) => ({
  [`@media (min-width: ${theme.breakpoints.mobile}px)`]: {
    display: 'none',
  },
  width: 30,
  height: 30,
  border: `1px solid ${theme.colors.text.secondary}`,
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
  mb?: number;
  navbarActionComponent?: ReactElement;
}>;

export const Screen = ({ title, navbarActionComponent, mb = 0, children }: ScreenPropsT) => {
  const { setFeedOpen } = useNotificationsContext();

  return (
    <CenteredContainer direction={'column'} alignItems={'center'} mb={mb}>
      <TitleBar mb={title || navbarActionComponent ? 2 : 0}>
        <Text size={'xl'} weight={700}>
          {title}
        </Text>
        <Flex style={{ flexBasis: 1 }} alignItems={'center'} gap={1} mr={1}>
          {navbarActionComponent}
          <MobileCloseButton
            onClick={() => setFeedOpen(false)}
            fontSize={'sm'}
            variant={'outlined'}
          >
            <Text>X</Text>
          </MobileCloseButton>
        </Flex>
      </TitleBar>
      {children}
    </CenteredContainer>
  );
};
