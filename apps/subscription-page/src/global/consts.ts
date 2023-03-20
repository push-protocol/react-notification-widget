export const IS_PROD = import.meta.env.PROD;

export const STUDIO_URL = IS_PROD
  ? "https://studio.wherever.to"
  : "https://staging-studio.wherever.to";
