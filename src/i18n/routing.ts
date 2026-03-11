import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
    locales: ['en', 'am', 'om'],
    defaultLocale: 'en',
    // Do not add locale prefix to URLs — locale is detected via cookies/headers
    localePrefix: 'never'
});
