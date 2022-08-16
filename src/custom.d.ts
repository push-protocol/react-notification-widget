declare module '*.svg' {
  import React = require('react');

  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const content: any;
  export default content;
}

declare module '@epnsproject/frontend-sdk-staging' {
  const api: any;
  const channels: any;
  const utils: any;
}
