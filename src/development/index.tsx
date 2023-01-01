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
import { ENV } from '../global/const';
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
  ENV === 'production'
    ? '5e6a9f39-2c86-411c-90e1-b22642b930b6' // aave
    : 'cefa1b69-bfb9-4e70-bebc-9ee10316f882';

const FakeApp = () => {
  const [partnerKey, setPartnerKey] = useState(DEFAULT_PARTNER_KEY);
  const [iframeUrl, setIframeUrl] = useState('https://app.aave.com/');
  const [theme, setTheme] = useState<CustomTheme>(defaultTheme);
  const [coordinates, setCoordinates] = useState<Coordinates>({ top: 5, right: 250 });

  const widget = useMemo(() => {
    return (
      <NotificationFeedProvider theme={theme} partnerKey={partnerKey} mode={WidgetMode.Default}>
        <NotificationFeed gapFromBell={10}>
          <S.WidgetBellWrapper>
            <NotificationBell size={18} />
          </S.WidgetBellWrapper>
        </NotificationFeed>
      </NotificationFeedProvider>
    );
  }, [partnerKey, theme]);

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', background: 'white' }}>
      {/*<S.BackgroundLogoContainer>*/}
      {/*  <BackgroundLogo />*/}
      {/*</S.BackgroundLogoContainer>*/}
      {/*<S.TopBar>*/}
      {/*  <Logo />*/}
      {/*  <S.Text>Widget Demo</S.Text>*/}
      {/*</S.TopBar>*/}
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
      {/*<FloatingSettings*/}
      {/*  {...{*/}
      {/*    partnerKey,*/}
      {/*    setPartnerKey,*/}
      {/*    iframeUrl,*/}
      {/*    setIframeUrl,*/}
      {/*    theme,*/}
      {/*    setTheme,*/}
      {/*    coordinates,*/}
      {/*    setCoordinates,*/}
      {/*  }}*/}
      {/*/>*/}
    </div>
  );
};

render(<FakeApp />, document.getElementById('root'));
