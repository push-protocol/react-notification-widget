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

const hatsTheme: CustomTheme = {
  buttonTextColor: '#000000',
  uppercasePageTitles: true,
  bellColor: '#8AFCFD',
  backgroundColor: '#0C1436',
  primaryColor: '#8AFCFD',
  borderRadius: 'none' as const,
  fontFamily: '"RobotoMono", sans-serif',
};

const lightTheme: CustomTheme = {
  mode: ThemeMode.Light,
  primaryColor: '#3761F9',
  buttonTextColor: '#ffffff',
  backgroundColor: '#EDF2F7',
  textColor: '#181c27',
  fontFamily: '"Inter var", sans-serif',
};

const defaultTheme = {
  fontFamily: '"Inter var", sans-serif',
  bellColor: '#968c8c',
};

const keys = {
  prod: {
    nozick: '259bdea9-7329-4654-bb4a-45f452a208ce',
    wTest: '07ef6fe0-6582-4f88-94ee-00349c42b068',
  },
  staging: {
    nozick: 'cefa1b69-bfb9-4e70-bebc-9ee10316f882',
    wTest: '070d4d95-90fb-44b8-99cf-f440eeccf767',
    dino: '6a71067c-49c7-4863-bf16-a34511a277e1',
  },
};

const DEFAULT_PARTNER_KEY = ENV === 'production' ? keys.prod.nozick : keys.staging.nozick;

const DemoApp = () => {
  const [partnerKey, setPartnerKey] = useState(DEFAULT_PARTNER_KEY);
  const [iframeUrl, setIframeUrl] = useState('');
  const [theme, setTheme] = useState<CustomTheme>(defaultTheme);
  const [coordinates, setCoordinates] = useState<Coordinates>({ top: 100, left: '45%' });

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

render(<DemoApp />, document.getElementById('root'));
