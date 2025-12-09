const protocolRegex = /^https?:\/\//i;

function normalizeUrl(url) {
  url = url.trim();
  if (!protocolRegex.test(url)) {
    return "https://" + url;
  }
  return url;
}

const hostnameRegex = /^(?!-)(?!.*--)[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)+$/;

const validTlds = new Set([
  "com", "net", "org", "io", "co", "dev", "app", "edu", "gov",
  "info", "biz", "xyz", "online", "shop", "site", "blog"
]);

function isValidUrl(url) {
  try {
    const normalized = normalizeUrl(url);
    const parsed = new URL(normalized);

    const hostname = parsed.hostname;

    if (!hostnameRegex.test(hostname)) {
      return false;
    }

    const parts = hostname.split(".");
    const tld = parts[parts.length - 1].toLowerCase();

    if (!validTlds.has(tld)) {
      return false;
    }

    return true;

  } catch {
    return false;
  }
}

export { normalizeUrl, isValidUrl };
