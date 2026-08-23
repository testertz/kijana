import { useEffect, useRef, useState } from 'react';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { useRouter } from '@/state/Router';
import { useCart } from '@/state/CartContext';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { classNames } from '@/lib/format';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'Services', to: '/services' },
  { label: 'About', to: '/about' },
  { label: 'Our Impact', to: '/impact' },
  { label: 'Contact', to: '/contact' },
];

export default function Header() {
  const { path, navigate } = useRouter();
  const { count } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartBump, setCartBump] = useState(false);
  const prevCountRef = useRef(count);

  useEffect(() => {
    if (count > prevCountRef.current) {
      setCartBump(true);
      const t = setTimeout(() => setCartBump(false), 500);
      return () => clearTimeout(t);
    }
    prevCountRef.current = count;
  }, [count]);

  useEffect(() => {
    prevCountRef.current = count;
  }, [count]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [path]);

  const isActive = (to: string) => (to === '/' ? path === '/' : path.startsWith(to));

  const go = (to: string) => {
    setMenuOpen(false);
    navigate(to);
  };

  return (
    <header
      className={classNames(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-cream-50/90 shadow-soft backdrop-blur-md'
          : 'bg-cream-50/40 backdrop-blur-sm',
      )}
    >
      <div className="container-px flex h-16 items-center justify-between gap-4 sm:h-20">
        {/* Logo */}
        <button onClick={() => go('/')} className="flex items-center gap-2.5" aria-label="Kijana Factory home">
          <img src="/kf-logo-mark.svg" alt="Kijana Factory logo" className="h-10 w-10 rounded-xl shadow-soft sm:h-11 sm:w-11" />
          <span className="flex flex-col leading-none">
            <span className="font-display text-base font-semibold text-forest-900 sm:text-lg">
              Kijana Factory
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-spice-600">
              Asili ya Tanzania
            </span>
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <button
              key={link.to}
              onClick={() => go(link.to)}
              className={classNames(
                'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                isActive(link.to)
                  ? 'bg-forest-700 text-cream-50'
                  : 'text-forest-800 hover:bg-forest-50',
              )}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <a
            href={buildWhatsAppUrl('Habari! Ningeomba msaada kuhusu KF products/services.')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp btn-sm hidden sm:inline-flex"
          >
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp
          </a>
          <button
            onClick={() => go('/cart')}
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-forest-50 text-forest-800 transition-all duration-200 hover:bg-forest-100 active:scale-90"
            aria-label={`Cart with ${count} items`}
          >
            <ShoppingBag size={18} className={classNames('transition-transform duration-200', cartBump && 'scale-110')} />
            {count > 0 && (
              <span
                className={classNames(
                  'absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-spice-600 px-1 text-[10px] font-bold text-cream-50',
                  cartBump ? 'animate-cart-bounce' : 'animate-scale-in',
                )}
              >
                {count}
              </span>
            )}
          </button>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-forest-50 text-forest-800 lg:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={classNames(
          'overflow-hidden border-t border-earth-200/70 bg-cream-50 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden',
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <nav className="container-px flex flex-col gap-1 py-4">
          {navLinks.map((link, i) => (
            <button
              key={link.to}
              onClick={() => go(link.to)}
              className={classNames(
                'animate-slide-right rounded-xl px-4 py-3 text-left text-base font-medium transition-colors',
                isActive(link.to)
                  ? 'bg-forest-700 text-cream-50'
                  : 'text-forest-800 hover:bg-forest-50',
              )}
              style={{ animationDelay: menuOpen ? `${i * 40}ms` : undefined }}
            >
              {link.label}
            </button>
          ))}
          <a
            href={buildWhatsAppUrl('Habari! Ningeomba msaada kuhusu KF products/services.')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp btn-lg mt-2 w-full"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Chat with KF
          </a>
        </nav>
      </div>
    </header>
  );
}

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}
