import React, { useState } from 'react';
import { CustomTheme } from '../../theme';

type FloatingSettingsProps = {
  env: string;
  setEnv: (env: string) => void;
  partnerKey: string;
  setPartnerKey: (key: string) => void;
  theme: CustomTheme;
  setTheme: any;
  iframeUrl: string;
  setIframeUrl: (url: string) => void;
  coordinates: { top: number; left: number };
  setCoordinates: (args: { top: number; left: number }) => void;
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
    env,
    setEnv,
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
      <div
        style={{
          position: 'fixed',
          bottom: 60,
          right: 70,
          height: 70,
          width: 120,
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'black',
          color: 'white',
          borderRadius: '30%',
        }}
      >
        <button onClick={() => setShowSettings(!showSettings)}>Settings</button>
        <select name="env" value={env} onChange={(e) => setEnv(e.target.value)}>
          <option value="development">Development</option>
          <option value="staging">Staging</option>
          <option value="production">Production</option>
        </select>
      </div>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          display: showSettings ? 'flex' : 'none',
          position: 'fixed',
          bottom: 120,
          right: 1,
          zIndex: 100,
          background: 'white',
          border: '1px solid black',
          color: 'black',
          flexDirection: 'column',
          gap: 8,
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
              setCoordinates({ top: Number(e.target.value), left: coordinates.left })
            }
          />
        </div>
        <div>
          <p>Widget position from right</p>
          <input
            style={{ width: 300 }}
            value={coordinates.left}
            type={'number'}
            onChange={(e) => setCoordinates({ top: coordinates.top, left: Number(e.target.value) })}
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
    </>
  );
};

export default FloatingSettings;
