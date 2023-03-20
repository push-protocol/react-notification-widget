import { useMemo, useState } from 'react';

import {
  NotificationBell,
  NotificationFeed,
  NotificationFeedProvider,
  WidgetMode,
} from '@wherever/react-notification-widget';
import * as S from './styles';
import FloatingSettings, { Coordinates } from './components/FloatingSettings';
import Logo from './components/Logo';
import BackgroundLogo from './components/BackgroundLogo';

const defaultTheme = {
  fontFamily: 'Mulish, sans-serif',
  buttonTextColor: '#0D0B19',
  bellColor: '#968c8c',
  primaryColor: '#C8FF3E',
  backgroundColor: '#0D0B19',
};

const keys = {
  prod: {
    nozick: '259bdea9-7329-4654-bb4a-45f452a208ce',
    wTest: '07ef6fe0-6582-4f88-94ee-00349c42b068',
  },
  staging: {
    nozick: 'cefa1b69-bfb9-4e70-bebc-9ee10316f882',
    wTest: '070d4d95-90fb-44b8-99cf-f440eeccf767',
    myLocal: '9c0d3214-666c-4f0d-8572-3e426308a0fa',
    dino: '6a71067c-49c7-4863-bf16-a34511a277e1',
  },
};

const DEFAULT_PARTNER_KEY = import.meta.env.PROD ? keys.prod.wTest : keys.staging.myLocal;

const App = () => {
  const [partnerKey, setPartnerKey] = useState(DEFAULT_PARTNER_KEY);
  const [iframeUrl, setIframeUrl] = useState('');
  const [theme, setTheme] = useState<any>(defaultTheme);
  const [coordinates, setCoordinates] = useState<Coordinates>({ top: 100, left: '45%' });

  const widget = useMemo(() => {
    return (
      <NotificationFeedProvider
        theme={theme}
        partnerKey={partnerKey}
        mode={WidgetMode.SubscribeOnly}
      >
        <NotificationFeed gapFromBell={10}>
          <S.WidgetBellWrapper>
            <NotificationBell />
          </S.WidgetBellWrapper>
        </NotificationFeed>
      </NotificationFeedProvider>
    );
  }, [partnerKey, theme]);

  return (
    <div style={{ display: 'flex', height: '150vh', width: '100vw', background: 'black' }}>
      <S.BackgroundLogoContainer>
        <BackgroundLogo />
      </S.BackgroundLogoContainer>
      <S.TopBar>
        <Logo />
        <S.Text>Widget Demo</S.Text>
      </S.TopBar>
      {/****************WIDGET****************/}
      <S.WidgetContainer top={coordinates.top} left={coordinates.left}>
        {widget}
      </S.WidgetContainer>
      {/********************************/}

      <S.IframeContainer>
        <iframe
          src={iframeUrl}
          width={'100%'}
          height={'100%'}
          sandbox={'allow-scripts allow-same-origin'}
        />
      </S.IframeContainer>
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
  );
};

export default App;
