import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decrypt } from './lib/auth';

export async function middleware(request: NextRequest) {
    const url = request.nextUrl;

    // Get hostname from request (e.g., schoolA.example.com, or localhost:3000)
    let hostname = request.headers.get('host') || 'localhost:3000';

    // Remove port for cleaner matching if present
    hostname = hostname.split(':')[0];

    // Define the base domain (adjust for production)
    const baseDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost';

    let tenantDomain = 'default';

    // Extract subdomain if it exists and isn't the base domain itself
    // Also skip IP addresses to treat them as the main hub
    const isIP = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(hostname);

    if (hostname !== baseDomain && hostname.endsWith(`.${baseDomain}`) && !isIP) {
        tenantDomain = hostname.replace(`.${baseDomain}`, '');
    } else if (hostname !== 'localhost' && hostname !== baseDomain && !isIP) {
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

    // Special routing for tenants mapping to their respective portals
    if (tenantDomain !== 'default') {
        const session = request.cookies.get("session")?.value;
        const isLoginPage = url.pathname === '/login';

        if (!session) {
            if (!isLoginPage) {
                return NextResponse.rewrite(new URL('/login', request.url), {
                    request: { headers: requestHeaders }
                });
            }
        } else {
            const payload = await decrypt(session);
            
            // 1. Session is valid but for a DIFFERENT tenant
            // We need to fetch the tenant ID from the database or trust the domain match.
            // For now, we'll verify if the session payload contains the tenant info.
            
            // If the user tries to access a different subdomain than their session allows:
            // (Note: This requires knowing the subdomain in the session or re-fetching)
            
            if (!payload && !isLoginPage) {
                 return NextResponse.rewrite(new URL('/login', request.url), {
                    request: { headers: requestHeaders }
                });
            }

            // Redirect away from login if already has a valid session
            if (isLoginPage && payload) {
                return NextResponse.redirect(new URL('/dashboard', request.url));
            }
        }

        if (url.pathname === '/') {
            return NextResponse.rewrite(new URL('/login', request.url), {
                request: { headers: requestHeaders }
            });
        }
    }

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

