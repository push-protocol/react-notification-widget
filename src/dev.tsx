import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './index';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <App partnerKey={'e76f1b54-891e-49e8-b406-74750f60f560'} env={'dev'} />
  </React.StrictMode>
);
