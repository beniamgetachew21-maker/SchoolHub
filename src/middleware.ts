import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const url = request.nextUrl;

    // Get hostname from request (e.g., schoolA.example.com, or localhost:3000)
    let hostname = request.headers.get('host') || 'localhost:3000';

    // Remove port for cleaner matching if present
    hostname = hostname.split(':')[0];

    // Define the base domain (adjust for production)
    const baseDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost';

    let tenantDomain = 'default';

    // Extract subdomain if it exists and isn't the base domain itself
    if (hostname !== baseDomain && hostname.endsWith(`.${baseDomain}`)) {
        tenantDomain = hostname.replace(`.${baseDomain}`, '');
    } else if (hostname !== 'localhost' && hostname !== baseDomain) {
        // Handle custom domains if needed (e.g., exact matches mapped to a tenant)
        tenantDomain = hostname;
    }

    // Identify locale (Cookie > Header > Default)
    const locales = ['en', 'am', 'om'];
    const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
    const acceptLanguage = request.headers.get('accept-language');

    let locale = 'en';
    if (cookieLocale && locales.includes(cookieLocale)) {
        locale = cookieLocale;
    } else if (acceptLanguage) {
        const preferredLocale = acceptLanguage.split(',')[0].split('-')[0];
        if (locales.includes(preferredLocale)) {
            locale = preferredLocale;
        }
    }

    // Clone the request headers so we can modify them
    const requestHeaders = new Headers(request.headers);

    // Inject the extracted tenant domain and locale into custom headers
    requestHeaders.set('x-tenant-domain', tenantDomain);
    requestHeaders.set('x-next-intl-locale', locale);

    // Continue the request with the modified headers
    return NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};

