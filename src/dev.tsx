import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './index';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <App
      channel={{
        addr: '0xasdasdsads9d',
        icon: 'https://app.shapeshift.com/icon-192x192.png',
        name: 'Shapeshift',
        channel: 'Shapeshift.eth',
      }}
    />
  </React.StrictMode>
);
