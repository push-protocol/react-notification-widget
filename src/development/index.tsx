import React, { useMemo, useState } from 'react';
import { render } from 'react-dom';
import { WidgetMode } from '../context/EnvironmentContext';
import {
  CustomTheme,
  NotificationBell,
  NotificationFeed,
  NotificationFeedProvider,
  ThemeMode,
} from '../index';
import * as S from './styles';
import FloatingSettings, { Coordinates } from './components/FloatingSettings';
import Logo from './components/Logo';
import BackgroundLogo from './components/BackgroundLogo';

const hatsTheme = {
  buttonTextColor: '#000000',
  capitalizePageTitles: true,
  bellColor: '#8AFCFD',
  backgroundColor: '#0C1436',
  primaryColor: '#8AFCFD',
  borderRadius: 'none' as const,
  fontFamily: '"RobotoMono", sans-serif',
};

const lightTheme = {
  mode: ThemeMode.Light,
  primaryColor: '#3761F9',
  buttonTextColor: '#ffffff',
  backgroundColor: '#EDF2F7',
  textColor: '#181c27',
  fontFamily: '"Inter var", sans-serif',
};

const defaultTheme = {
  fontFamily: '"Inter var", sans-serif',
  backgroundColor: '#1b1c27',
  bellColor: '#FFFFFF',
};

const DEFAULT_PARTNER_KEY =
  process.env.WHEREVER_ENV === 'production'
    ? '259bdea9-7329-4654-bb4a-45f452a208ce'
    : 'cefa1b69-bfb9-4e70-bebc-9ee10316f882';

const FakeApp = () => {
  const [partnerKey, setPartnerKey] = useState('4840fc9c-6c93-49cb-8f85-1c2e9d476b0a');
  const [iframeUrl, setIframeUrl] = useState('https://app.atlendis.io/dashboard');
  const [theme, setTheme] = useState<CustomTheme>(defaultTheme);
  const [coordinates, setCoordinates] = useState<Coordinates>({ top: 15, right: 360 });

  const widget = useMemo(() => {
    return (
      <NotificationFeedProvider theme={theme} partnerKey={partnerKey} mode={WidgetMode.Default}>
        <NotificationFeed gapFromBell={10}>
          <S.WidgetBellWrapper>
            <NotificationBell />
          </S.WidgetBellWrapper>
        </NotificationFeed>
      </NotificationFeedProvider>
    );
  }, [partnerKey, theme]);

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', background: 'black' }}>
      <S.BackgroundLogoContainer>
        <BackgroundLogo />
      </S.BackgroundLogoContainer>
      <S.TopBar>
        <Logo />
        <S.Text>Widget Demo</S.Text>
      </S.TopBar>
      {/****************WIDGET****************/}
      <S.WidgetContainer top={coordinates.top} right={coordinates.right}>
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

render(<FakeApp />, document.getElementById('root'));
