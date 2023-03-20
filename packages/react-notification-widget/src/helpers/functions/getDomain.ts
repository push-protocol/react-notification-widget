const getDomain = (url?: string) => {
  if (!url) return "";

  try {
    // assume relative URLs are in the same domain
    const urlObj = url.startsWith("/")
      ? new URL(url, window.location.origin)
      : new URL(url);
    return urlObj.hostname.replace("https://", "").replace("www.", "");
  } catch (e) {
    // malformed URL
    return "";
  }
};

export default getDomain;
