/**
 * Central API helper — always builds absolute URLs so the app works on
 * physical devices where relative paths like /api/matches have no server.
 *
 * Usage:  import { apiFetch } from '@/utils/api';
 *         const data = await apiFetch('/api/cities');
 */
const BASE = process.env.EXPO_PUBLIC_BASE_URL ?? "http://localhost:4000";

export const apiFetch = (path, options) => {
  const url = path.startsWith("http") ? path : `${BASE}${path}`;
  return fetch(url, options);
};
