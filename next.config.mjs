/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_TOKEN_NAME: process.env.NEXT_PUBLIC_TOKEN_NAME,
  },
  reactStrictMode: true,
  i18n: {
    locales: ["ar", "en"],
    defaultLocale: "en",
    localeDetection: false,
  },

  // distDir: "_next",
  // defaultLocale: false,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  trailingSlash: false,
};

export default nextConfig;
