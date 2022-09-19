import React, { useState, useMemo } from 'react';
import { render } from 'react-dom';
import {
  NotificationFeed,
  NotificationFeedProvider,
  NotificationBell,
  CustomTheme,
} from '../index';
import FloatingSettings from './components/FloatingSettings';

const FakeApp = () => {
  const [partnerKey, setPartnerKey] = useState('4fcbfd96-9ff9-4d1b-a17c-6a68196af12e');
  const [iframeUrl, setIframeUrl] = useState('');
  const [env, setEnv] = useState(process.env.WHEREVER_ENV as string);
  const [theme, setTheme] = useState<CustomTheme>({
    primaryColor: '#d67a5a',
    bellColor: '#d67a5a',
    backgroundColor: '#102544',
    fontFamily: '"Inter var", sans-serif',
  });
  const [coordinates, setCoordinates] = useState({ top: 14, left: 250 });

  const widget = useMemo(() => {
    return (
      <NotificationFeedProvider theme={theme} env={env} partnerKey={partnerKey}>
        <NotificationFeed>
          <NotificationBell />
        </NotificationFeed>
      </NotificationFeedProvider>
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
