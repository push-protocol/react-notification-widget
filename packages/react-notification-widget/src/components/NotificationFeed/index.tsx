import React, { cloneElement, forwardRef, ReactElement, useEffect, useMemo, useState } from 'react';
import { usePopper } from 'react-popper';
import ClickAwayListener from 'react-click-away-listener';
import styled, { useTheme } from 'styled-components';
import { Placement } from '@popperjs/core';
import useWindowSize from '../../helpers/hooks/useWindowSize';
import { NotificationClickProp } from '../types';
import useUnreadCount from '../../hooks/useUnreadCount';
import { WidgetContainer } from '../layout/WidgetContainer';
import { useUpdateLastReadMutation } from './operations.generated';
import analytics from 'services/analytics';
import { WIDGET_VERSION } from 'global/const';
import { useAuthContext } from 'context/AuthContext';
import { useSignerContext } from 'context/SignerContext';
import { useChannelContext } from 'context/ChannelContext';
import { useUserContext } from 'context/UserContext';
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
  width?: { desktop: number | string };
  maxHeight?: { desktop: number | string };
  children: ((args: { unreadCount?: number; onClick: () => void }) => ReactElement) | ReactElement;
};

const NotificationFeed = (props: NotificationFeedProps): JSX.Element => {
  const { children, onNotificationClick } = props;

  const { feedOpen, setFeedOpen } = useUserContext();
  const { isConnected, address } = useSignerContext();
  const unreadCount = useUnreadCount();
  const { isLoggedIn } = useAuthContext();
  const { channelAddress, name } = useChannelContext();
  const { activeRoute, routeProps, setRoute } = useRouterContext();
  const theme = useTheme();
  const size = useWindowSize();

  useEffect(() => {
    if (address && channelAddress) {
      analytics.identify({
        channelAddress,
        channelName: name,
        widgetVersion: WIDGET_VERSION,
      });
    }
  }, [address, channelAddress]);

  const [updateLastRead] = useUpdateLastReadMutation();

  useEffect(() => {
    if (isConnected && !isLoggedIn && activeRoute.requiresAuth) {
      setRoute(Routes.VerifyAccount);
      return;
    }
  }, [activeRoute, isLoggedIn, isConnected]);

  const currentScreenComponent = useMemo(() => {
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

  if (size.width && size.width <= theme.w.breakpoints.mobile) {
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
            <WidgetContainer width={props.width} maxHeight={props.maxHeight}>
              {currentScreenComponent}
            </WidgetContainer>
          </div>
        )}
      </div>
    </ClickAwayListener>
  );
};

export default NotificationFeed;
