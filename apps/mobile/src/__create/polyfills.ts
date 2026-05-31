// Patch global.fetch so relative URLs like /api/matches resolve to
// EXPO_PUBLIC_BASE_URL (the web server's LAN address).
// Without this every fetch('/api/...') call silently fails on a physical device.
import fetchWithBaseURL from './fetch';
// @ts-expect-error
global.fetch = fetchWithBaseURL;
