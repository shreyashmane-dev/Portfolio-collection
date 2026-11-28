/**
 * Universal canonical site URL resolver.
 * Handles custom domains, Vercel production domains, and deployment previews
 * without hardcoding typos or breaking Google Search Console property matches.
 */
export function getSiteUrl(): string {
  // 1. Explicit user override from environment
  if (process.env.NEXT_PUBLIC_SITE_URL && process.env.NEXT_PUBLIC_SITE_URL.trim() !== "") {
    return cleanUrl(process.env.NEXT_PUBLIC_SITE_URL);
  }

  // 2. Vercel production system variables (set automatically during production builds)
  if (process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL) {
    return cleanUrl(`https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`);
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return cleanUrl(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`);
  }

  // 3. Vercel preview deployment URL
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return cleanUrl(`https://${process.env.NEXT_PUBLIC_VERCEL_URL}`);
  }
  if (process.env.VERCEL_URL) {
    return cleanUrl(`https://${process.env.VERCEL_URL}`);
  }

  // 4. Default production portfolio domain
  return "https://shreyash-portfolio.vercel.app";
}

function cleanUrl(url: string): string {
  let cleaned = url.trim().replace(/\/+$/, "");
  if (!cleaned.startsWith("http://") && !cleaned.startsWith("https://")) {
    cleaned = `https://${cleaned}`;
  }
  return cleaned;
}
