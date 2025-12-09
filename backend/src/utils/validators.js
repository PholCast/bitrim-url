const protocolRegex = /^https?:\/\//i;

function normalizeUrl(url) {
  if (protocolRegex.test(url)) {
    return "https://" + url;
  }
  return url;
}

function isValidUrl(url) {
  try {
    new URL(normalizeUrl(url));
    return true;
  } catch {
    return false;
  }
}
