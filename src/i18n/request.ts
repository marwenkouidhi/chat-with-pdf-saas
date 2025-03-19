import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => {
  const locale = "en";

  return {
    locale,
    messages: {
      common: (await import(`../locales/${locale}/common.json`)).default,
      landingpage: (await import(`../locales/${locale}/landingpage.json`)).default,
    },
  };
});
