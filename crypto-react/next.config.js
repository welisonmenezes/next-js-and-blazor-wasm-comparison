/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    productionBrowserSourceMaps: true,
    i18n: {
        locales: ["en", "es", "pt"],
        defaultLocale: "pt",
        localeDetection: false,
    },
};

module.exports = nextConfig;
