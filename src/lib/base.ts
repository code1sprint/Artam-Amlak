/** Vite `base` — always ends with `/` (e.g. `/` or `/Artam/`). */
export const BASE_URL = import.meta.env.BASE_URL;

/**
 * Prefix a public/app path with Vite base so assets and deep links work
 * on GitHub Pages project sites (`https://user.github.io/repo/`).
 */
export function withBase(path: string): string {
  if (!path) return path;
  if (/^(https?:|data:|blob:|mailto:|tel:)/i.test(path)) return path;

  const base = BASE_URL;
  if (path === '/') return base;

  const normalized = path.startsWith('/') ? path.slice(1) : path;
  if (base !== '/' && path.startsWith(base)) return path;

  return `${base}${normalized}`;
}

/** Recursively prefix `/images/...` and `/brand/...` strings in mock/config data. */
export function withBasePaths<T>(value: T): T {
  if (typeof value === 'string') {
    if (/^\/(images|brand)\//.test(value)) {
      return withBase(value) as T;
    }
    return value;
  }

  if (Array.isArray(value)) {
    return value.map((item) => withBasePaths(item)) as T;
  }

  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const [key, nested] of Object.entries(value)) {
      out[key] = withBasePaths(nested);
    }
    return out as T;
  }

  return value;
}
