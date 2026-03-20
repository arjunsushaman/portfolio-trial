import { NextRequest, NextResponse } from 'next/server';

// EU country codes (ISO 3166-1 alpha-2)
const EU_COUNTRIES = new Set([
  'AT','BE','BG','CY','CZ','DE','DK','EE','ES','FI',
  'FR','GR','HR','HU','IE','IT','LT','LU','LV','MT',
  'NL','PL','PT','RO','SE','SI','SK',
]);

function resolveCurrency(country: string): string {
  if (country === 'IN') return 'INR';
  if (country === 'GB') return 'GBP';
  if (EU_COUNTRIES.has(country)) return 'EUR';
  return 'USD';
}

export function middleware(req: NextRequest) {
  const response = NextResponse.next();

  // Only stamp once — skip if cookies already present
  if (req.cookies.has('user-locale') && req.cookies.has('user-currency')) {
    return response;
  }

  // req.geo is populated by Vercel's edge network; falls back to 'US' locally
  const locale   = req.geo?.country ?? 'US';
  const currency = resolveCurrency(locale);

  const cookieOptions = {
    path: '/',
    maxAge: 60 * 60 * 24, // 24 h
    sameSite: 'lax' as const,
  };

  response.cookies.set('user-locale',   locale,   cookieOptions);
  response.cookies.set('user-currency', currency, cookieOptions);

  return response;
}

export const config = {
  // Run on every page / RSC request; skip static assets and _next internals
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
