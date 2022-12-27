export enum VideoSources {
  YOUTUBE,
  VIMEO,
}

export const videoSourcesInfo = {
  [VideoSources.YOUTUBE]: {
    baseUrl: 'https://www.youtube.com/embed/',
    idRegex:
      /^.*(?:(?:youtu.be\/)|(?:v\/)|(?:\/u\/\w\/)|(?:embed\/)|(?:watch\?))\??v?=?([^#&?]*).*/,
  },
  [VideoSources.VIMEO]: {
    baseUrl: 'https://player.vimeo.com/video/',
    idRegex: /^.*(?:vimeo\.com\/)(?:(?:channels\/[A-z]+\/)|(?:groups\/[A-z]+\/videos\/))?([0-9]+)/,
  },
};
