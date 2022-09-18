import React, { PropsWithChildren, ReactElement } from 'react';
import styled from 'styled-components';
import Text from '../Text';
import Button from '../Button';
import { useNotificationsContext } from '../../context/NotificationsContext';
import Flex from './Flex';

export const CenteredContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  navbarActionComponent?: ReactElement;
}>;

export const Screen = (props: ScreenPropsT) => {
  const { setFeedOpen } = useNotificationsContext();

  return (
    <CenteredContainer>
      <TitleBar mb={props.title || props.navbarActionComponent ? 2 : 0}>
        <Text size={'xl'} weight={700}>
          {props.title}
        </Text>
        <Flex style={{ flexBasis: 1 }} alignItems={'center'} gap={1} mr={1}>
          {props.navbarActionComponent}
          <MobileCloseButton
            onClick={() => setFeedOpen(false)}
            fontSize={'sm'}
            variant={'outlined'}
          >
            X
          </MobileCloseButton>
        </Flex>
      </TitleBar>
      {props.children}
    </CenteredContainer>
  );
};
