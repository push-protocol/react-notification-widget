import React, { cloneElement, forwardRef, ReactElement, useEffect, useMemo, useState } from 'react';
import { usePopper } from 'react-popper';
import ClickAwayListener from 'react-click-away-listener';
import styled, { useTheme } from 'styled-components';
import { useAccount } from 'wagmi';
import { Placement } from '@popperjs/core';
import useWindowSize from '../../helpers/hooks/useWindowSize';
import { NotificationClickProp } from '../types';
import analytics from '../../services/analytics';
import { useAuthContext } from '../../context/AuthContext';
import useUnreadCount from '../../hooks/useUnreadCount';
import { WIDGET_VERSION } from '../../global/const';
import { useUpdateLastReadMutation } from './operations.generated';
import { useChannelContext } from 'context/ChannelContext';
import { useUserContext } from 'context/UserContext';
import { WidgetContainer } from 'components/layout/WidgetContainer';
import { Routes, useRouterContext } from 'context/RouterContext';

const MobileContainer = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`;

// eslint-disable-next-line react/display-name
const BellRef = forwardRef<HTMLDivElement, { children: ReactElement }>(({ children }, ref) => {
  return <div ref={ref}>{children}</div>;
});

export type NotificationFeedProps = NotificationClickProp & {
  gapFromBell?: number;
  placement?: Placement;
  children: ((args: { unreadCount?: number; onClick: () => void }) => ReactElement) | ReactElement;
};

const NotificationFeed = (props: NotificationFeedProps): JSX.Element => {
  const { children, onNotificationClick } = props;
  const { feedOpen, setFeedOpen } = useUserContext();
  const unreadCount = useUnreadCount();
  const { isLoggedIn } = useAuthContext();
  const { address } = useAccount();
  const { channelAddress, name } = useChannelContext();
  const { activeRoute, routeProps, setRoute } = useRouterContext();
  const theme = useTheme();
  const size = useWindowSize();

  useEffect(() => {
    if (address && channelAddress) {
      analytics.identify({ channelAddress, channelName: name, widgetVersion: WIDGET_VERSION });
    }
  }, [address, channelAddress]);

  const [updateLastRead] = useUpdateLastReadMutation();

  useEffect(() => {
    if (!isLoggedIn && activeRoute.requiresAuth) {
      setRoute(Routes.Login);
      return;
    }
  }, [activeRoute, isLoggedIn]);

  const currentScreenComponent = useMemo(() => {
    analytics.track(`${activeRoute.name} page loaded`);

    if (activeRoute.name === Routes.NotificationsFeed)
      return <activeRoute.Component onNotificationClick={onNotificationClick} />;

    return <activeRoute.Component {...routeProps} />;
  }, [activeRoute, onNotificationClick]);

  const handleBellClick = () => {
    analytics.track('bell clicked', { feedOpened: !feedOpen });

    setFeedOpen(!feedOpen);

    if (isLoggedIn) {
      updateLastRead();
    }
  };

  const [referenceRef, setReferenceRef] = useState<HTMLDivElement | null>(null);
  const [popperRef, setPopperRef] = useState<HTMLDivElement | null>(null);

  const { styles, attributes } = usePopper(referenceRef, popperRef, {
    placement: props.placement || 'bottom',
    modifiers: [
      {
        name: 'offset',
        enabled: true,
        options: {
          offset: [0, props.gapFromBell],
        },
      },
    ],
  });

  const bell =
    typeof children === 'function'
      ? children({ onClick: handleBellClick, unreadCount })
      : cloneElement(children, { onClick: handleBellClick });

  if (size.width && size.width <= theme.breakpoints.mobile) {
    return (
      <>
        {bell}
        <MobileContainer isOpen={feedOpen}>
          <WidgetContainer>{currentScreenComponent}</WidgetContainer>
        </MobileContainer>
      </>
    );
  }

  return (
    <ClickAwayListener onClickAway={() => setFeedOpen(false)}>
      <div>
        <BellRef ref={setReferenceRef}>{bell}</BellRef>
        {feedOpen && (
          <div ref={setPopperRef} style={styles.popper} {...attributes.popper}>
            <WidgetContainer>{currentScreenComponent}</WidgetContainer>
          </div>
        )}
      </div>
    </ClickAwayListener>
  );
};

export default NotificationFeed;
