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
import { WidgetContainer } from 'components/layout/WidgetContainer';
import { useRouterContext, Routes } from 'context/RouterContext';

const MobileContainer = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`;

// eslint-disable-next-line react/display-name
const BellRef = forwardRef<HTMLDivElement, { children: ReactElement }>(({ children }, ref) => {
  return <div ref={ref}>{children}</div>;
});

export type NotificationFeedProps = NotificationClickProp & {
  gapFromBell?: number;
  isOpen?: boolean;
  placement?: Placement;
  children: ((args: { unreadCount?: number; onClick: () => void }) => ReactElement) | ReactElement;
};

const NotificationFeed = (props: NotificationFeedProps): JSX.Element => {
  const { children, onNotificationClick, isOpen } = props;
  const unreadCount = useUnreadCount();
  const { isLoggedIn } = useAuthContext();
  const { address } = useAccount();
  const { channelAddress, name } = useChannelContext();
  const { Component, activeRoute, routeProps, feedOpen, setFeedOpen } = useRouterContext();
  const theme = useTheme();
  const size = useWindowSize();

  const toggleFeedOpen = (open: boolean) => {
    if (isOpen !== undefined) return; // ignore if controlled through prop
    setFeedOpen(open);
  };

  useEffect(() => {
    if (isOpen !== undefined) {
      setFeedOpen(isOpen);
    }
  }, [isOpen]);

  useEffect(() => {
    if (address && channelAddress) {
      analytics.identify({ channelAddress, channelName: name, widgetVersion: WIDGET_VERSION });
    }
  }, [address, channelAddress]);

  const [updateLastRead] = useUpdateLastReadMutation();

  const currentScreenComponent = useMemo(() => {
    if (activeRoute === Routes.NotificationsFeed)
      return <Component onNotificationClick={onNotificationClick} />;

    return <Component {...routeProps} />;
  }, [activeRoute, Component, onNotificationClick]);

  const handleBellClick = () => {
    analytics.track('bell clicked', { feedOpened: !feedOpen });

    toggleFeedOpen(!feedOpen);

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
    <ClickAwayListener onClickAway={() => toggleFeedOpen(false)}>
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
