import { providers } from 'ethers';
import React, { PropsWithChildren } from 'react';
import { createRoot } from 'react-dom/client';
import styled from 'styled-components';
import { NotificationFeed, NotificationFeedProvider, NotificationBell } from './index';

const root = createRoot(document.getElementById('root') as HTMLElement);

const BellContainer = styled.div`
  height: 50px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
  background: black;
`;

const FakeApp = (props: PropsWithChildren) => {
  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
      <div style={{ height: '100vh', width: 120, border: '1px solid black', background: 'yellow' }}>
        NAV BAR
      </div>
      <div style={{ height: '100%', width: '100%' }}>
        <div style={{ display: 'flex', height: '52px', width: '100%', border: '1px solid black' }}>
          <div style={{ width: 200, marginRight: '5vw' }}>TOOLBAR</div>
          {props.children}
        </div>

        <div>APP</div>
      </div>
    </div>
  );
};

root.render(
  <React.StrictMode>
    <FakeApp>
      <BellContainer>
        <NotificationFeedProvider
          provider={providers.getDefaultProvider()}
          env={'staging'}
          partnerKey={'e76f1b54-891e-49e8-b406-74750f60f560'}
        >
          <NotificationFeed>
            <NotificationBell />
          </NotificationFeed>
        </NotificationFeedProvider>
      </BellContainer>
    </FakeApp>
  </React.StrictMode>
);
