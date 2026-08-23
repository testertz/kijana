import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

// A minimal hash-based router so the app works as a static SPA with no backend.
// Routes:
//   /            Home
//   /shop        Shop
//   /product/:id Product details
//   /cart        Cart
//   /checkout    Checkout
//   /order/success  Order success
//   /services    Services landing
//   /experiences Dining experiences listing
//   /experience/:id  Experience details
//   /experience/:id/book  Experience booking flow
//   /booking/success  Booking success
//   /chef        Chef booking
//   /chef/apply  Chef application
//   /chef/success  Application success
//   /impact      Our impact
//   /partner     Partner form
//   /contact     Contact
//   /admin       Admin dashboard

export interface RouteState {
  path: string;
  segments: string[];
  query: URLSearchParams;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouteState | null>(null);

function currentPath(): string {
  const hash = window.location.hash.replace(/^#/, '');
  return hash || '/';
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [path, setPath] = useState<string>(() => currentPath());

  useEffect(() => {
    const onHash = () => {
      setPath(currentPath());
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const navigate = useCallback((to: string) => {
    const clean = to.startsWith('/') ? to : `/${to}`;
    if (clean === currentPath()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    window.location.hash = clean;
  }, []);

  const [pathOnly, queryStr] = path.split('?');
  const segments = pathOnly.split('/').filter(Boolean);
  const query = useMemo(() => new URLSearchParams(queryStr ?? ''), [queryStr]);

  const value = useMemo<RouteState>(
    () => ({ path: pathOnly, segments, query, navigate }),
    [pathOnly, segments, query, navigate],
  );

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export function useRouter(): RouteState {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error('useRouter must be used within RouterProvider');
  return ctx;
}
