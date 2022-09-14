import { providers } from 'ethers';
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import styled from 'styled-components';
import {
  NotificationFeed,
  NotificationFeedProvider,
  NotificationBell,
  CustomTheme,
} from '../index';
import FloatingSettings from './components/FloatingSettings';

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

const FakeApp = () => {
  const [partnerKey, setPartnerKey] = useState('e76f1b54-891e-49e8-b406-74750f60f560');
  const [iframeUrl, setIframeUrl] = useState('');
  const [theme, setTheme] = useState<CustomTheme>({});
  const [coordinates, setCoordinates] = useState({ top: 15, right: 510 });

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
      <div style={{ height: '100vh', width: 120, border: '1px solid black', background: 'yellow' }}>
        NAV BAR
      </div>
      <div style={{ height: '100%', width: '100%' }}>
        <div style={{ display: 'flex', height: '52px', width: '100%', border: '1px solid black' }}>
          <div style={{ width: 200, marginRight: '5vw' }}>TOOLBAR</div>
          {/****************WIDGET****************/}
          <div
            style={{
              position: 'absolute',
              top: coordinates.top,
              right: coordinates.right,
              zIndex: 10,
            }}
          >
            <NotificationFeedProvider
              provider={providers.getDefaultProvider()}
              env={'staging'}
              theme={theme}
              partnerKey={partnerKey}
            >
              <NotificationFeed>
                <BellContainer>
                  <NotificationBell />
                </BellContainer>
              </NotificationFeed>
            </NotificationFeedProvider>
            {/********************************/}
          </div>
        </div>

        <div
          style={{ position: 'fixed', top: 0, left: 0, height: '100vh', width: '100vw', zIndex: 2 }}
        >
          <iframe src={iframeUrl} width={'100%'} height={'100%'} />
        </div>
        <FloatingSettings
          {...{
            partnerKey,
            setPartnerKey,
            iframeUrl,
            setIframeUrl,
            theme,
            setTheme,
            coordinates,
            setCoordinates,
          }}
        />
      </div>
    </div>
  );
};

root.render(
  <React.StrictMode>
    <FakeApp />
  </React.StrictMode>
);
