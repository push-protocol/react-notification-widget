import React, { useState, useMemo } from 'react';
import { render } from 'react-dom';
import styled from 'styled-components';
import {
  NotificationFeed,
  NotificationFeedProvider,
  NotificationBell,
  CustomTheme,
} from '../index';
import FloatingSettings from './components/FloatingSettings';

const WidgetBellWrapper = styled.div`
  height: 52px;
  width: 52px;
  background: #414144;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  :hover {
    filter: brightness(160%);
  }
`;

const lightTheme = {
  primaryColor: '#3761F9',
  buttonTextColor: '#ffffff',
  backgroundColor: '#EDF2F7',
  textColor: '#0f3ebe',
};

const defaultTheme = {
  fontFamily: '"Inter var", sans-serif',
  bellColor: '#968c8c',
};

const FakeApp = () => {
  const [partnerKey, setPartnerKey] = useState('6a71067c-49c7-4863-bf16-a34511a277e1');
  const [iframeUrl, setIframeUrl] = useState('');
  const [env, setEnv] = useState(process.env.WHEREVER_ENV as string);
  const [theme, setTheme] = useState<CustomTheme>(defaultTheme);
  const [coordinates, setCoordinates] = useState({ top: 1, left: 250 });

  const widget = useMemo(() => {
    return (
      <div>
        <NotificationFeedProvider theme={theme} partnerKey={partnerKey}>
          <NotificationFeed>
            <WidgetBellWrapper>
              <NotificationBell />
            </WidgetBellWrapper>
          </NotificationFeed>
        </NotificationFeedProvider>
      </div>
    );
  }, [partnerKey, theme, env]);

  return (
    <div style={{ display: 'flex', height: '80vh', width: '95vw' }}>
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
              left: coordinates.left,
              zIndex: 10,
            }}
          >
            {widget}
          </div>
          {/********************************/}
        </div>

        <div
          style={{ position: 'fixed', top: 0, left: 0, height: '100vh', width: '100vw', zIndex: 2 }}
        >
          <iframe
            src={iframeUrl}
            width={'100%'}
            height={'100%'}
            sandbox={'allow-scripts allow-same-origin'}
          />
        </div>
        <FloatingSettings
          {...{
            env,
            setEnv,
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

render(<FakeApp />, document.getElementById('root'));
