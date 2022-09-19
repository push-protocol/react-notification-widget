import React, { cloneElement, forwardRef, ReactElement, useMemo, useEffect } from 'react';
import { Popover } from 'react-tiny-popover';
import styled, { useTheme } from 'styled-components';
import { useAccount } from 'wagmi';
import useWindowSize from '../../helpers/hooks/useWindowSize';
import { NotificationClickProp } from '../types';
import { useNotificationsContext } from '../../context/NotificationsContext';
import analytics from '../../services/analytics';
import { useChannelContext } from '../../context/ChannelContext';
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
  children: ReactElement;
};

const NotificationFeed = (props: NotificationFeedProps): JSX.Element => {
  const { children, onNotificationClick } = props;
  const { feedOpen, setFeedOpen } = useNotificationsContext();
  const { address } = useAccount();
  const { channelAddress, name } = useChannelContext();
  const { Component, activeRoute } = useRouterContext();
  const theme = useTheme();
  const size = useWindowSize();

  useEffect(() => {
    if (address && channelAddress) {
      analytics.identify(address, { channelAddress, channelName: name });
    }
  }, [address, channelAddress]);

  const currentScreenComponent = useMemo(() => {
    if (activeRoute === Routes.NotificationsFeed)
      return <Component onNotificationClick={onNotificationClick} />;

    return <Component />;
  }, [activeRoute]);

  const handleBellClick = () => {
    analytics.track('widget opened');
    setFeedOpen(!feedOpen);
  };

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
    <div>
      <Popover
        onClickOutside={() => setFeedOpen(false)}
        isOpen={feedOpen}
        containerStyle={{ zIndex: '100' }}
        padding={props.gapFromBell}
        positions={['bottom', 'left', 'right']}
        content={<WidgetContainer>{currentScreenComponent}</WidgetContainer>}
      >
        <BellRef>{cloneElement(children, { onClick: handleBellClick })}</BellRef>
      </Popover>
    </div>
  );
};

export default NotificationFeed;
