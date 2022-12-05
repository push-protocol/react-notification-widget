import React, { useMemo, useState } from 'react';
import { render } from 'react-dom';
import {
  CustomTheme,
  NotificationBell,
  NotificationFeed,
  NotificationFeedProvider,
} from '../index';
import { WidgetMode } from '../context/EnvironmentContext';
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

const FakeApp = () => {
  const [partnerKey, setPartnerKey] = useState('6a71067c-49c7-4863-bf16-a34511a277e1');
  const [iframeUrl, setIframeUrl] = useState('');
  const [theme, setTheme] = useState<CustomTheme>(defaultTheme);
  const [coordinates, setCoordinates] = useState<Coordinates>({ top: 100, left: '45%' });

  const widget = useMemo(() => {
    return (
      <NotificationFeedProvider
        theme={theme}
        partnerKey={partnerKey}
        isOpen={true}
        mode={WidgetMode.subscribeOnly}
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
    <div style={{ display: 'flex', height: '100vh', width: '100vw', background: 'black' }}>
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

render(<FakeApp />, document.getElementById('root'));
