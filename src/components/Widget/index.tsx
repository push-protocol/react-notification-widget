import React, { useState } from 'react';
import { Popover } from 'react-tiny-popover';
import styled from 'styled-components';
import useWindowSize from '../../helpers/hooks/useWindowSize';
import { SCREEN_SIZES } from '../../global/const';
import Text from '../Text';
import Button from '../Button';
import { WidgetContainer } from 'components/layout/WidgetContainer';
import { useRouterContext } from 'context/RouterContext';
import NotificationBell from 'components/Widget/components/NotificationBell';

const MobileContainer = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  z-index: 9999;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
`;

const CloseButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 30px;
  position: absolute;
  right: 15px;
  top: 15px;
  cursor: pointer;
`;

const Widget = () => {
  const [feedOpen, setFeedOpen] = useState(false);
  const { Component } = useRouterContext();
  const size = useWindowSize();

  if (size.width && size.width <= SCREEN_SIZES.mobile) {
    return (
      <div>
        <Button onClick={() => setFeedOpen(true)}>Notifications</Button>
        <MobileContainer isOpen={feedOpen}>
          <CloseButton onClick={() => setFeedOpen(false)}>
            <Text>X</Text>
          </CloseButton>
          <WidgetContainer>
            <Component />
          </WidgetContainer>
        </MobileContainer>
      </div>
    );
  }

  return (
    <div>
      <Popover
        onClickOutside={() => setFeedOpen(false)}
        isOpen={feedOpen}
        positions={['bottom', 'left', 'right']}
        content={
          <WidgetContainer>
            <Component />
          </WidgetContainer>
        }
      >
        <NotificationBell setOpen={setFeedOpen} />
      </Popover>
    </div>
  );
};

export default Widget;
