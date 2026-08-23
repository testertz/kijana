import { Minus, Plus } from 'lucide-react';
import { classNames } from '@/lib/format';

interface QuantityControlProps {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md';
}

export default function QuantityControl({
  value,
  onChange,
  min = 1,
  max = 999,
  size = 'md',
}: QuantityControlProps) {
  const v = value;
  const dec = () => onChange(Math.max(min, v - 1));
  const inc = () => onChange(Math.min(max, v + 1));

  const btn =
    size === 'sm'
      ? 'h-8 w-8'
      : 'h-10 w-10';
  const txt = size === 'sm' ? 'text-sm w-8' : 'text-base w-12';

  return (
    <div className="inline-flex items-center rounded-full border border-earth-200 bg-white">
      <button
        type="button"
        onClick={dec}
        disabled={v <= min}
        className={classNames(
          'flex items-center justify-center rounded-full text-forest-700 transition-colors hover:bg-forest-50 disabled:opacity-40',
          btn,
        )}
        aria-label="Decrease quantity"
      >
        <Minus size={size === 'sm' ? 14 : 16} />
      </button>
      <span key={v} className={classNames('text-center font-semibold text-forest-900 animate-scale-in', txt)}>{v}</span>
      <button
        type="button"
        onClick={inc}
        disabled={v >= max}
        className={classNames(
          'flex items-center justify-center rounded-full text-forest-700 transition-colors hover:bg-forest-50 disabled:opacity-40',
          btn,
        )}
        aria-label="Increase quantity"
      >
        <Plus size={size === 'sm' ? 14 : 16} />
      </button>
    </div>
  );
}
