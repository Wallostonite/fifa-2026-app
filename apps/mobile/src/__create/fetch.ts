import { fetch as expoFetch } from 'expo/fetch';

const originalFetch = fetch;

const isFileURL = (url: string) => url.startsWith('file://') || url.startsWith('data:');

const isFirstPartyURL = (url: string) =>
  url.startsWith('/') ||
  (!!process.env.EXPO_PUBLIC_BASE_URL && url.startsWith(process.env.EXPO_PUBLIC_BASE_URL));

const getURLFromArgs = (...args: Parameters<typeof fetch>): string | null => {
  const [input] = args;
  if (typeof input === 'string') return input;
  if (typeof input === 'object' && input !== null) return (input as Request).url;
  return null;
};

type Params = Parameters<typeof expoFetch>;
const fetchToWeb = async function fetchWithHeaders(...args: Params) {
  const [input, init] = args;
  const url = getURLFromArgs(input, init);

  if (!url) return expoFetch(input, init);
  if (isFileURL(url)) return originalFetch(input, init);
  if (!isFirstPartyURL(url)) return expoFetch(input, init);

  const baseURL = process.env.EXPO_PUBLIC_BASE_URL ?? '';
  const finalInput = typeof input === 'string' && input.startsWith('/') ? `${baseURL}${input}` : input;

  return expoFetch(finalInput, init);
};

export default fetchToWeb;
