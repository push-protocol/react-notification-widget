import React, { cloneElement, forwardRef, ReactElement, useState, useMemo } from 'react';
import { Popover } from 'react-tiny-popover';
import styled from 'styled-components';
import useWindowSize from '../../helpers/hooks/useWindowSize';
import { SCREEN_SIZES } from '../../global/const';
import { NotificationClickProp } from '../types';
import { WidgetContainer } from 'components/layout/WidgetContainer';
import { useRouterContext, Routes } from 'context/RouterContext';

const MobileContainer = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`;

// eslint-disable-next-line react/display-name
const BellRef = forwardRef<HTMLDivElement, { children: ReactElement }>(({ children }, ref) => {
  return <div ref={ref}>{children}</div>;
});

type NotificationFeedProps = NotificationClickProp & {
  gapFromBell?: number;
  children: ReactElement;
};

const NotificationFeed = (props: NotificationFeedProps): JSX.Element => {
  const { children, onNotificationClick } = props;

  const [feedOpen, setFeedOpen] = useState(false);
  const { Component, activeRoute } = useRouterContext();
  const size = useWindowSize();

  const currentScreenComponent = useMemo(() => {
    if (activeRoute === Routes.NotificationsFeed)
      return <Component onNotificationClick={onNotificationClick} />;

    return <Component />;
  }, [activeRoute]);

  const handleBellClick = () => {
    setFeedOpen((prevOpen) => !prevOpen);
  };

  if (size.width && size.width <= SCREEN_SIZES.mobile) {
    return (
      <div>
        <BellRef>{cloneElement(children, { onClick: handleBellClick })}</BellRef>
        <MobileContainer isOpen={feedOpen}>
          <WidgetContainer>{currentScreenComponent}</WidgetContainer>
        </MobileContainer>
      </div>
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
