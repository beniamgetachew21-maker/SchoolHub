import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

export default getRequestConfig(async (context) => {
    // Validate that the incoming `locale` parameter is valid
    const { requestLocale } = context;
    let locale = await requestLocale;

    if (!hasLocale(routing.locales, locale)) {
        locale = routing.defaultLocale;
    }

    return {
        locale,
        messages: (await import(`../../messages/${locale}.json`)).default
    };
});
