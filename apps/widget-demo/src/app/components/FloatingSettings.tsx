import React, { useState } from 'react';
import styled from 'styled-components';
import { CustomTheme } from '@wherever/react-notification-feed';

export type Coordinates = {
  top: number | string;
  left: number | string;
};

type FloatingSettingsProps = {
  partnerKey: string;
  setPartnerKey: (key: string) => void;
  theme: CustomTheme;
  setTheme: any;
  iframeUrl: string;
  setIframeUrl: (url: string) => void;
  coordinates: Coordinates;
  setCoordinates: (args: Coordinates) => void;
};

const StyledInput = styled.input`
  width: 300px;
  font-family: Roboto, serif;
  color: white;
  padding: 4px 8px;
  border-radius: 10px;
  background: #33373a;
`;

const FloatingSettings = (props: FloatingSettingsProps) => {
  const {
    iframeUrl,
    setIframeUrl,
    setTheme,
    theme,
    setPartnerKey,
    partnerKey,
    coordinates,
    setCoordinates,
  } = props;
  const [showSettings, setShowSettings] = useState(false);

  const themeKeys: (keyof CustomTheme)[] = [
    'bellColor',
    'borderRadius',
    'backgroundColor',
    'fontFamily',
    'textColor',
    'primaryColor',
    'secondaryColor',
    'buttonTextColor',
  ];

  return (
    <>
      <button
        style={{
          position: 'fixed',
          bottom: 60,
          right: 70,
          height: 80,
          width: 80,
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#040f1e',
          color: 'white',
          borderRadius: '50%',
        }}
        onClick={() => setShowSettings(!showSettings)}
      >
        Settings
      </button>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          overflowY: 'auto',
          overflowX: 'hidden',
          padding: 16,
          height: 450,
          display: showSettings ? 'flex' : 'none',
          position: 'fixed',
          bottom: 150,
          right: 1,
          zIndex: 100,
          fontFamily: 'Roboto, serif',
          background: '#040f1e',
          color: 'white',
          flexDirection: 'column',
          gap: 8,
        }}
      >
        <div>
          <p>Partner Key (paste whole value)</p>
          <StyledInput value={partnerKey} onChange={(e) => setPartnerKey(e.target.value)} />
        </div>
        {[
          { title: 'Widget position from top', key: 'top' },
          { title: 'Widget position from left', key: 'left' },
        ].map((item) => (
          <div key={item.title}>
            <p>{item.title}</p>
            <StyledInput
              value={coordinates[item.key as 'top' | 'left']}
              type={'number'}
              onChange={(e) =>
                setCoordinates({
                  ...coordinates,
                  [item.key]: Number(e.target.value),
                })
              }
            />
          </div>
        ))}

        <div>
          <p>Iframe Url (paste whole value)</p>
          <StyledInput value={iframeUrl} onChange={(e) => setIframeUrl(e.target.value)} />
        </div>
        {themeKeys.map((key) => (
          <div key={key}>
            <p>{key}</p>
            <StyledInput
              value={(theme[key] as string) || ''}
              onChange={(e) =>
                setTheme((oldTheme: CustomTheme) => ({
                  ...oldTheme,
                  [key]: e.target.value,
                }))
              }
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default FloatingSettings;
