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
    let baseDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost';

    // Auto-detect root domain on Vercel if not explicitly provided
    // This handles the case where school-hub-s8go.vercel.app is accessed directly
    if (baseDomain === 'localhost' && hostname.includes('vercel.app')) {
        const parts = hostname.split('.');
        if (parts.length === 3 && parts[1] === 'vercel' && parts[2] === 'app') {
            baseDomain = hostname;
        }
    }

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

    // --- NEW VERCEL BYPASS ---
    const tenantQuery = url.searchParams.get('tenant');
    let setTenantCookie = false;
    
    if (tenantQuery) {
        tenantDomain = tenantQuery;
        setTenantCookie = true;
    } else {
        const tenantCookie = request.cookies.get('demo_tenant')?.value;
        if (tenantCookie && tenantDomain === 'default') {
            tenantDomain = tenantCookie;
        }
    }
    // -------------------------

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
    let response = NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });

    if (tenantDomain !== 'default') {
        const session = request.cookies.get("session")?.value;
        const isLoginPage = url.pathname === '/login';

        if (!session) {
            if (!isLoginPage) {
                response =  NextResponse.rewrite(new URL('/login', request.url), {
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
                 response = NextResponse.rewrite(new URL('/login', request.url), {
                    request: { headers: requestHeaders }
                });
            } else if (isLoginPage && payload) {
                // Redirect away from login if already has a valid session
                response = NextResponse.redirect(new URL('/dashboard', request.url));
            }
        }

        if (url.pathname === '/') {
            response = NextResponse.rewrite(new URL('/login', request.url), {
                request: { headers: requestHeaders }
            });
        }
    }

    if (setTenantCookie) {
        response.cookies.set('demo_tenant', tenantDomain, { path: '/', maxAge: 60 * 60 * 24 * 7 });
    }

    return response;
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

