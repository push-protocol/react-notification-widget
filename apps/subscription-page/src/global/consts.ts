export const IS_PROD = process.env.REACT_APP_VERCEL_ENV === 'production';

export const STUDIO_URL = IS_PROD
  ? 'https://studio.wherever.to'
  : 'https://staging-studio.wherever.to';
