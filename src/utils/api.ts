import { authUtils } from './auth';

const BASE = import.meta.env?.VITE_BACKEND_URL || 'http://localhost:3001';

async function request(path: string, opts: RequestInit = {}) {
  const headers: Record<string,string> = { 'Content-Type': 'application/json' };
  const token = authUtils.getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(BASE + path, { headers: { ...headers, ...(opts.headers as any) }, ...opts });
  if (res.status === 401) {
    authUtils.removeToken();
    window.location.href = '/login';
    throw new Error('Unauthorized');
  }

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }

  const ct = res.headers.get('content-type') || '';
  if (ct.includes('application/json')) return res.json();
  return res.text();
}

export const api = {
  get: (p: string) => request(p, { method: 'GET' }),
  post: (p: string, body?: any) => request(p, { method: 'POST', body: JSON.stringify(body) }),
  put: (p: string, body?: any) => request(p, { method: 'PUT', body: JSON.stringify(body) }),
  del: (p: string) => request(p, { method: 'DELETE' }),
};

export default api;
