/** @type {import('next').NextConfig} */
const nextConfig = {
<<<<<<< HEAD
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_TOKEN_NAME: process.env.NEXT_PUBLIC_TOKEN_NAME,
  },
=======
>>>>>>> 290ede3709e415cc2dfdd9e63c24115e614456d6
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
