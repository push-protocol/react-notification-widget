const formatDomain = (url?: string) => {
  if (!url) return '';

  try {
    return new URL(url).hostname.replace('https://', '').replace('www.', '');
  } catch (e) {
    // malformed URL
    return '';
  }
};

export default formatDomain;
