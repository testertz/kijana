import { classNames } from '@/lib/format';
import { Star } from 'lucide-react';

export function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`Rating ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={size}
          className={classNames(
            n <= Math.round(rating) ? 'fill-spice-500 text-spice-500' : 'fill-earth-200 text-earth-200',
          )}
        />
      ))}
    </div>
  );
}

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'spice' | 'forest' | 'hibiscus' | 'cream';
  className?: string;
}

const badgeVariants = {
  default: 'bg-forest-50 text-forest-700',
  spice: 'bg-spice-100 text-spice-700',
  forest: 'bg-forest-700 text-cream-50',
  hibiscus: 'bg-hibiscus-100 text-hibiscus-700',
  cream: 'bg-cream-200 text-earth-800',
};

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return <span className={classNames('chip', badgeVariants[variant], className)}>{children}</span>;
}

export function Divider({ className }: { className: string }) {
  return <hr className={classNames('border-earth-200/70', className)} />;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-earth-200 bg-white/60 px-6 py-16 text-center">
      {icon && <div className="mb-4 text-spice-500">{icon}</div>}
      <h3 className="font-display text-xl font-semibold text-forest-900">{title}</h3>
      {description && <p className="mt-2 max-w-sm text-sm text-earth-600">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export function PriceTag({
  amount,
  className,
  size = 'md',
}: {
  amount: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}) {
  const text = size === 'lg' ? 'text-2xl' : size === 'sm' ? 'text-sm' : 'text-lg';
  return <span className={classNames('font-display font-semibold text-forest-900', text, className)}>{`TZS ${amount.toLocaleString('en-US')}`}</span>;
}
