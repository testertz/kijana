import { useRouter } from '@/state/Router';
import { siteConfig } from '@/config/site';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { WhatsAppIcon } from './Header';
import { Mail, MapPin, Phone, Instagram, Facebook, Twitter } from 'lucide-react';

const shopLinks = [
  { label: 'All Products', to: '/shop' },
  { label: 'Spices', to: '/shop?category=spices' },
  { label: 'Hibiscus', to: '/shop?category=hibiscus' },
  { label: 'Gift Packs', to: '/shop?category=giftpacks' },
];

const servicesLinks = [
  { label: 'Dining Experiences', to: '/services' },
  { label: 'Book a Chef', to: '/chef' },
  { label: 'Become a KF Chef', to: '/chef/apply' },
  { label: 'About KF', to: '/about' },
  { label: 'Our Impact', to: '/impact' },
];

export default function Footer() {
  const { navigate } = useRouter();

  return (
    <footer className="mt-20 bg-forest-950 text-cream-100">
      <div className="container-px grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <img src="/kf-logo-mark.svg" alt="Kijana Factory logo" className="h-11 w-11 rounded-xl" />
            <span className="font-display text-lg font-semibold">Kijana Factory</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream-200/80">
            {siteConfig.brand.description}
          </p>
          <div className="mt-5 flex gap-2">
            <a href={siteConfig.contact.social.instagram} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-forest-800 transition-colors hover:bg-spice-600" aria-label="Instagram">
              <Instagram size={16} />
            </a>
            <a href={siteConfig.contact.social.facebook} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-forest-800 transition-colors hover:bg-spice-600" aria-label="Facebook">
              <Facebook size={16} />
            </a>
            <a href={siteConfig.contact.social.twitter} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-forest-800 transition-colors hover:bg-spice-600" aria-label="Twitter">
              <Twitter size={16} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-spice-300">Shop</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {shopLinks.map((l) => (
              <li key={l.to}>
                <button onClick={() => navigate(l.to)} className="text-cream-200/80 transition-colors hover:text-cream-50">
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-spice-300">Services</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {servicesLinks.map((l) => (
              <li key={l.to}>
                <button onClick={() => navigate(l.to)} className="text-cream-200/80 transition-colors hover:text-cream-50">
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-spice-300">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm text-cream-200/80">
            <li className="flex items-center gap-2.5">
              <Phone size={15} className="text-spice-400" /> {siteConfig.contact.phone}
            </li>
            <li className="flex items-center gap-2.5">
              <WhatsAppIcon className="h-4 w-4 text-spice-400" />
              <a href={buildWhatsAppUrl('Habari KF!')} target="_blank" rel="noopener noreferrer" className="hover:text-cream-50">
                {siteConfig.contact.whatsapp}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail size={15} className="text-spice-400" /> {siteConfig.contact.email}
            </li>
            <li className="flex items-center gap-2.5">
              <MapPin size={15} className="text-spice-400" /> {siteConfig.contact.addressLine}, {siteConfig.contact.addressCountry}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-forest-800">
        <div className="container-px flex flex-col items-center justify-between gap-2 py-5 text-xs text-cream-200/70 sm:flex-row">
          <p>© {new Date().getFullYear()} Kijana Factory. All rights reserved.</p>
          <p>Made with care in Dar es Salaam, Tanzania.</p>
        </div>
      </div>
    </footer>
  );
}
