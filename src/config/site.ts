// Central site configuration for Kijana Factory.
// Change KF WhatsApp number, contact info, and pricing defaults here.

export const siteConfig = {
  brand: {
    name: 'Kijana Factory',
    shortName: 'KF',
    tagline: 'Asili ya Afya. Asili ya Tanzania.',
    description:
      'Kijana Factory connects Tanzanian farmers, food products, dining experiences and chefs — bringing natural, healthy, authentic flavours from farm to table.',
    logoMark: 'KF',
  },

  // Single source of truth for the KF WhatsApp number (international format, no +).
  whatsappNumber: '255700000000',

  contact: {
    phone: '+255 700 000 000',
    whatsapp: '+255 700 000 000',
    email: 'habari@kijanafactory.co.tz',
    addressLine: 'Mikocheni, Dar es Salaam',
    addressCountry: 'Tanzania',
    mapQuery: 'Mikocheni, Dar es Salaam, Tanzania',
    hours: 'Mon–Sat: 8:00 AM – 8:00 PM',
    social: {
      instagram: 'https://instagram.com',
      facebook: 'https://facebook.com',
      twitter: 'https://twitter.com',
    },
  },

  currency: {
    code: 'TZS',
    symbol: 'TZS',
    // Format an integer amount into "TZS 12,000"
    format(amount: number): string {
      return `TZS ${Math.round(amount).toLocaleString('en-US')}`;
    },
  },

  delivery: {
    defaultMethod: 'delivery' as 'delivery' | 'pickup',
    defaultFee: 8000,
  },
} as const;

export type SiteConfig = typeof siteConfig;
