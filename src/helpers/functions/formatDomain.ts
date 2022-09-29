const formatDomain = (url?: string) => {
  if (!url) return '';
  return new URL(url).hostname.replace('https://', '').replace('www.', '');
};

export default formatDomain;
