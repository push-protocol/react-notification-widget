import { providers } from 'ethers';
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import styled from 'styled-components';
import { NotificationFeed, NotificationFeedProvider, NotificationBell, CustomTheme } from './index';

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
  const [theme, setTheme] = useState<CustomTheme>({});

  const themeKeys: (keyof CustomTheme)[] = [
    'bellColor',
    'borderRadius',
    'backgroundColor',
    'fontFamily',
    'textColor',
    'primaryColor',
    'secondaryColor',
  ];

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
      <div style={{ height: '100vh', width: 120, border: '1px solid black', background: 'yellow' }}>
        NAV BAR
      </div>
      <div style={{ height: '100%', width: '100%' }}>
        <div style={{ display: 'flex', height: '52px', width: '100%', border: '1px solid black' }}>
          <div style={{ width: 200, marginRight: '5vw' }}>TOOLBAR</div>

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
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 8 }}>
          <div>
            <p>Partner Key (paste whole value)</p>
            <input
              style={{ width: 300 }}
              value={partnerKey}
              onChange={(e) => setPartnerKey(e.target.value)}
            />
          </div>
          {themeKeys.map((key) => (
            <div key={key}>
              <p>{key}</p>
              <input
                style={{ width: 300 }}
                value={theme[key]}
                onChange={(e) => setTheme((oldTheme) => ({ ...oldTheme, [key]: e.target.value }))}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

root.render(
  <React.StrictMode>
    <FakeApp />
  </React.StrictMode>
);
