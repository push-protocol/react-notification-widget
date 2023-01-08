import React from 'react';
import styled from 'styled-components';
import { VideoSources, videoSourcesInfo } from 'components/VideoPlayer/consts';

const Container = styled.div`
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  max-width: 100%;
  margin-bottom: ${({ theme }) => theme.w.spacing(1)}px;
  iframe {
    border-radius: ${({ theme }) => theme.w.borderRadius.md};
  }

  iframe,
  object,
  embed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

export const isVideoUrl = (url?: string) => {
  if (!url) return false;

  return (
    url.match(videoSourcesInfo[VideoSources.YOUTUBE].idRegex) ||
    url.match(videoSourcesInfo[VideoSources.VIMEO].idRegex) ||
    url.endsWith('mp4')
  );
};

const getVideoId = (url: string, source: VideoSources) => {
  const match = url.match(videoSourcesInfo[source].idRegex);
  return match?.[1] || '';
};

const buildUrl = (url: string) => {
  if (url.endsWith('mp4')) {
    return url;
  }

  const source: VideoSources = url.match(videoSourcesInfo[VideoSources.YOUTUBE].idRegex)
    ? VideoSources.YOUTUBE
    : VideoSources.VIMEO;

  return `${videoSourcesInfo[source].baseUrl}${getVideoId(url, source)}`;
};

const VideoPlayer = ({ url }: { url: string }) => (
  <Container>
    <iframe
      height={'180px'}
      src={buildUrl(url)}
      frameBorder={'0'}
      allow={'fullscreen; picture-in-picture'}
      title={'Embedded video'}
    />
  </Container>
);

export default VideoPlayer;
