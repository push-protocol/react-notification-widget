import React, { useState } from 'react';
import { CustomTheme } from '../../theme';

type FloatingSettingsProps = {
  partnerKey: string;
  setPartnerKey: (key: string) => void;
  theme: CustomTheme;
  setTheme: any;
  iframeUrl: string;
  setIframeUrl: (url: string) => void;
  coordinates: { top: number; right: number };
  setCoordinates: (args: { top: number; right: number }) => void;
};

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
  ];

  return (
    <button
      onClick={() => setShowSettings(!showSettings)}
      style={{
        position: 'fixed',
        bottom: 60,
        right: 70,
        height: 70,
        width: 70,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'black',
        color: 'white',
        borderRadius: '50%',
      }}
    >
      Settings
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          display: showSettings ? 'flex' : 'none',
          position: 'absolute',
          bottom: 100,
          right: 1,
          zIndex: 100,
          background: 'white',
          border: '1px solid black',
          color: 'black',
          flexDirection: 'column',
          gap: 16,
          padding: 8,
        }}
      >
        <div>
          <p>Partner Key (paste whole value)</p>
          <input
            style={{ width: 300 }}
            value={partnerKey}
            onChange={(e) => setPartnerKey(e.target.value)}
          />
        </div>
        <div>
          <p>Widget position from top</p>
          <input
            style={{ width: 300 }}
            value={coordinates.top}
            type={'number'}
            onChange={(e) =>
              setCoordinates({ top: Number(e.target.value), right: coordinates.right })
            }
          />
        </div>
        <div>
          <p>Widget position from right</p>
          <input
            style={{ width: 300 }}
            value={coordinates.right}
            type={'number'}
            onChange={(e) =>
              setCoordinates({ top: coordinates.top, right: Number(e.target.value) })
            }
          />
        </div>

        <div>
          <p>Iframe Url (paste whole value)</p>
          <input
            style={{ width: 300 }}
            value={iframeUrl}
            onChange={(e) => setIframeUrl(e.target.value)}
          />
        </div>
        {themeKeys.map((key) => (
          <div key={key}>
            <p>{key}</p>
            <input
              style={{ width: 300 }}
              value={theme[key] || ''}
              onChange={(e) =>
                setTheme((oldTheme: CustomTheme) => ({ ...oldTheme, [key]: e.target.value }))
              }
            />
          </div>
        ))}
      </div>
    </button>
  );
};

export default FloatingSettings;
