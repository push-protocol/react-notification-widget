export enum VideoSources {
  YOUTUBE,
  VIMEO,
}

export const videoSourcesInfo = {
  [VideoSources.YOUTUBE]: {
    baseUrl: 'https://www.youtube.com/embed/',
    idRegex:
      /^(?:(?:https?:)?\/\/)?(?:(?:www|m)\.)?(?:(?:youtube(?:-nocookie)?\.com|youtu.be))(?:\/(?:[\w-]+\?v=|embed\/|v\/)?)([\w-]+)(?:\S+)?$/,
  },
  [VideoSources.VIMEO]: {
    baseUrl: 'https://player.vimeo.com/video/',
    idRegex:
      /(?:http|https)?:?\/?\/?(?:www\.)?(?:player\.)?vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|video\/|)(\d+)(?:|\/\?)/,
  },
};
