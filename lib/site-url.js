/**
 * Resolve the public URL of the site for use in Stripe redirect URLs.
 * Order of precedence:
 *   1. NEXT_PUBLIC_SITE_URL env (manual override — e.g. custom domain)
 *   2. Origin header from the incoming request (works on Vercel previews + prod)
 *   3. VERCEL_PROJECT_PRODUCTION_URL (production custom domain on Vercel)
 *   4. VERCEL_URL (per-deployment URL on Vercel)
 *   5. http://localhost:3000
 */
export function getSiteUrl(req) {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return stripTrailingSlash(explicit);

  if (req) {
    const origin = req.headers.get("origin");
    if (origin) return stripTrailingSlash(origin);

    const host = req.headers.get("host");
    const proto =
      req.headers.get("x-forwarded-proto") ||
      (host && host.startsWith("localhost") ? "http" : "https");
    if (host) return `${proto}://${host}`;
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
}

function stripTrailingSlash(url) {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}
