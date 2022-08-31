import React, { useState } from 'react';
import styled from 'styled-components';
import { Popover } from 'react-tiny-popover';
import { Bell } from '@emotion-icons/octicons';
import { Layout } from 'components/layout/Layout';
import { useRouterContext } from 'context/RouterContext';

const BellContainer = styled.div`
  position: relative;
  cursor: pointer;
  width: fit-content;
`;

const NotificationBell = () => {
  const [feedOpen, setFeedOpen] = useState(false);
  const { Component } = useRouterContext();
  return (
    // wrapped in div to avoid flex child issues
    <div>
      <Popover
        onClickOutside={() => setFeedOpen(false)}
        isOpen={feedOpen}
        positions={['bottom', 'left', 'right']}
        content={
          <Layout>
            <Component />
          </Layout>
        }
      >
        <BellContainer onClick={() => setFeedOpen(!feedOpen)}>
          {/*TODO: add back once a time-based read counter is implemented*/}
          {/*{!!notifications.length && <NotificationBadge>{notifications?.length}</NotificationBadge>}*/}
          <Bell size={30} />
        </BellContainer>
      </Popover>
    </div>
  );
};

export default NotificationBell;
