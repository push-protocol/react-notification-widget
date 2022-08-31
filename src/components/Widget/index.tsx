import React, { useState } from 'react';
import { Popover } from 'react-tiny-popover';
import { WidgetContainer } from 'components/layout/WidgetContainer';
import { useRouterContext } from 'context/RouterContext';
import NotificationBell from 'components/Widget/components/NotificationBell';

const Widget = () => {
  const [feedOpen, setFeedOpen] = useState(false);
  const { Component } = useRouterContext();
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
