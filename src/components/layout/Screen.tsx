import React, {
  PropsWithChildren,
  ReactElement,
  useEffect,
  useState,
  useRef,
  useMemo,
} from 'react';
import styled from 'styled-components';
import Text from '../Text';
import Button from '../Button';
import PageTitle from '../PageTitle';
import { useEnvironment } from '../../context/EnvironmentContext';
import { useRouterContext } from '../../context/RouterContext';
import analytics from '../../services/analytics';
import useIsInViewport from '../../hooks/useIsInViewport';
import Flex from './Flex';
import { useUserContext } from 'context/UserContext';

const MobileCloseButton = styled(Button)(({ theme }) => ({
  [`@media (min-width: ${theme.w.breakpoints.mobile}px)`]: {
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
  const { activeRoute } = useRouterContext();
  const { setFeedOpen } = useUserContext();
  const { isSubscribeOnlyMode } = useEnvironment();
  const [loadTracked, setLoadTracked] = useState(false);

  const screenRef = useRef<HTMLDivElement | null>();

  const isVisible = useIsInViewport(screenRef);

  useEffect(() => {
    if (loadTracked || !isVisible) {
      return;
    }

    analytics.track(`${activeRoute.name} page loaded`);
    setLoadTracked(true);
  }, [isVisible]);

  return (
    <Flex
      ref={screenRef as any}
      direction={'column'}
      alignItems={'center'}
      width={'100%'}
      height={'100%'}
      mb={mb}
    >
      <TitleBar mb={title || navbarActionComponent ? 2 : 0}>
        <PageTitle>{title}</PageTitle>
        <Flex style={{ flexBasis: 1, zIndex: 20 }} alignItems={'center'} gap={1} mr={1}>
          {navbarActionComponent}
          {!isSubscribeOnlyMode && (
            <MobileCloseButton onClick={() => setFeedOpen(false)} variant={'text'}>
              <Text weight={400} size={'xl'}>
                X
              </Text>
            </MobileCloseButton>
          )}
        </Flex>
      </TitleBar>
      {children}
    </Flex>
  );
};
