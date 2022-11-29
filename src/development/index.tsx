import React, { useState, useMemo } from 'react';
import { render } from 'react-dom';
import styled from 'styled-components';
import {
  NotificationFeed,
  NotificationFeedProvider,
  NotificationBell,
  CustomTheme,
} from '../index';
import FloatingSettings, { Coordinates } from './components/FloatingSettings';

const WidgetBellWrapper = styled.div`
  height: 52px;
  width: 52px;
  border-radius: 15px;
  background: #102544;
  box-shadow: rgba(206, 193, 193, 0.1) 0px 0px 0px 1px, rgba(192, 179, 179, 0.2) 0px 5px 10px,
    rgba(210, 195, 195, 0.4) 0px 15px 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:active {
    background: #193969;
  }
`;

const TopBar = styled.div`
  width: 100%;
  height: 100px;
  padding: 8px;
  padding-left: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const WidgetContainer = styled.div<Coordinates>`
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
  position: absolute;
  top: ${({ top }) => `${top}px`};
  left: ${({ left }) => (typeof left === 'string' ? left : `${left}px`)};
  @media (max-width: 450px) {
    width: 100%;
    justify-content: center;
    top: 150px;
    left: 0;
  } ;
`;

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
  const [partnerKey, setPartnerKey] = useState('cefa1b69-bfb9-4e70-bebc-9ee10316f882');
  const [iframeUrl, setIframeUrl] = useState('');
  const [theme, setTheme] = useState<CustomTheme>(defaultTheme);
  const [coordinates, setCoordinates] = useState<Coordinates>({ top: 100, left: '45%' });

  const widget = useMemo(() => {
    return (
      <div>
        <NotificationFeedProvider theme={theme} partnerKey={partnerKey}>
          <NotificationFeed gapFromBell={10}>
            <WidgetBellWrapper>
              <NotificationBell />
            </WidgetBellWrapper>
          </NotificationFeed>
        </NotificationFeedProvider>
      </div>
    );
  }, [partnerKey, theme]);

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', background: '#010d2a' }}>
      <TopBar>
        <img
          style={{ height: 50 }}
          src={
            'https://faq.wherever.to/_next/image?url=https%3A%2F%2Fsuper-static-assets.s3.amazonaws.com%2Fb2419fb7-0552-4357-ae27-c07a6223dfee%2Fuploads%2Flogo%2F29bb2912-3d75-47a4-b9fb-bc1a532efb95.png&w=1200&q=80'
          }
        />

        <div />
      </TopBar>
      {/****************WIDGET****************/}
      <WidgetContainer top={coordinates.top} left={coordinates.left}>
        <p style={{ fontFamily: 'Roboto, serif', fontSize: 20, color: 'white' }}>
          ✨ Widget Demo ✨
        </p>
        <div style={{ zIndex: 10 }}>{widget}</div>
      </WidgetContainer>
      {/********************************/}

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
