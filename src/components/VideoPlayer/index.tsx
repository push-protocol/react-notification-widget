import React from 'react';
import styled from 'styled-components';
import { VideoSources, videoSourcesInfo } from 'components/VideoPlayer/consts';

const Container = styled.div`
  iframe {
    border-radius: ${({ theme }) => theme.borderRadius.md};
  }
`;

export const isVideoUrl = (url?: string) => {
  if (!url) return false;

  return (
    url.match(videoSourcesInfo[VideoSources.YOUTUBE].getIdRegex) ||
    url.match(videoSourcesInfo[VideoSources.VIMEO].getIdRegex)
  );
};

export const getYoutubeId = (url: string) => {
  const match = url.match(videoSourcesInfo[VideoSources.YOUTUBE].getIdRegex);
  return match && match[7].length == 11 ? match[7] : '';
};

export const getVimeoId = (url: string) => {
  const parseUrl = videoSourcesInfo[VideoSources.VIMEO].getIdRegex.exec(url);
  return (parseUrl && parseUrl[5]) || '';
};

const buildUrl = (url: string) => {
  const source: VideoSources = url.match(videoSourcesInfo[VideoSources.YOUTUBE].getIdRegex)
    ? VideoSources.YOUTUBE
    : VideoSources.VIMEO;

  const videoUrl = {
    [VideoSources.YOUTUBE]: getYoutubeId(url),
    [VideoSources.VIMEO]: getVimeoId(url),
  };

  return `${videoSourcesInfo[source].baseUrl}${videoUrl[source]}`;
};

const VideoPlayer = ({ url }: { url: string }) => (
  <Container>
    <iframe
      height="180px"
      src={buildUrl(url)}
      frameBorder="0"
      allow="autoplay; fullscreen; picture-in-picture"
      allowFullScreen
      title="Embedded video"
    />
  </Container>
);

export default VideoPlayer;
