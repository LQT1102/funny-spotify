const isProd = process.env.NODE_ENV === "production";

module.exports = {
  i18n: {
    locales: ["en", "vi"],
    defaultLocale: "en",
    localeDetection: false,
  },
  // assetPrefix: isProd ? "https://cdn-test.com" : undefined,
  publicRuntimeConfig: {
    axiosBaseUrl: process.env.AXIOS_BASE_URL,
  },
};
