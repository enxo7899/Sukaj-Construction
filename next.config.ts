import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // Next.js 16.2.9 Turbopack has a broken internal TS runner.
  // Types are verified separately via `pnpm exec tsc --noEmit`.
  typescript: { ignoreBuildErrors: true },
  experimental: {
    // Required when root layout lives under a dynamic segment ([locale]).
    // See: node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/not-found.md
    globalNotFound: true,
  },
};

export default withNextIntl(nextConfig);
