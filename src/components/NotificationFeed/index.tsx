import React, { cloneElement, forwardRef, ReactElement, useEffect, useMemo, useState } from 'react';
import { usePopper } from 'react-popper';
import ClickAwayListener from 'react-click-away-listener';
import styled, { useTheme } from 'styled-components';
import { useAccount } from 'wagmi';
import { Placement } from '@popperjs/core';
import useWindowSize from '../../helpers/hooks/useWindowSize';
import { NotificationClickProp } from '../types';
import analytics from '../../services/analytics';
import { useUpdateLastReadMutation } from './operations.generated';
import { useChannelContext } from 'context/ChannelContext';
import { useNotificationsContext } from 'context/NotificationsContext';
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
  placement?: Placement;
  children: ReactElement;
};

const NotificationFeed = (props: NotificationFeedProps): JSX.Element => {
  const { children, onNotificationClick } = props;
  const { feedOpen, setFeedOpen } = useNotificationsContext();
  const { address } = useAccount();
  const { channelAddress, name } = useChannelContext();
  const { Component, activeRoute, routeProps } = useRouterContext();
  const theme = useTheme();
  const size = useWindowSize();

  useEffect(() => {
    if (address && channelAddress) {
      analytics.identify({ channelAddress, channelName: name });
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

    setFeedOpen(!feedOpen);
    updateLastRead();
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

  if (size.width && size.width <= theme.breakpoints.mobile) {
    return (
      <>
        {cloneElement(children, { onClick: handleBellClick })}
        <MobileContainer isOpen={feedOpen}>
          <WidgetContainer>{currentScreenComponent}</WidgetContainer>
        </MobileContainer>
      </>
    );
  }

  return (
    <ClickAwayListener onClickAway={() => setFeedOpen(false)}>
      <div>
        <BellRef ref={setReferenceRef}>
          {cloneElement(children, { onClick: handleBellClick })}
        </BellRef>
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
