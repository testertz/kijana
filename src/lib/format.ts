import { siteConfig } from '@/config/site';

export const formatPrice = (n: number): string => siteConfig.currency.format(n);

export const formatDate = (iso: string): string => {
  if (!iso) return '—';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
};

export const formatDateTime = (iso: string): string => {
  if (!iso) return '—';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/** Generate a stable unique id for a cart line based on its configuration. */
export function cartLineId(productId: string, sizeId: string, selections: Record<string, string[]>): string {
  const selKey = Object.entries(selections)
    .map(([g, opts]) => `${g}:${[...opts].sort().join('.')}`)
    .sort()
    .join('|');
  return `${productId}__${sizeId}__${selKey}`;
}

export function classNames(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(' ');
}

export function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export function minDateISO(): string {
  return todayISO();
}

/** Generate a human-readable order/booking id. */
export function generateId(prefix: string): string {
  const n = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${n}`;
}
