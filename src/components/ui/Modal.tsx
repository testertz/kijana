import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { classNames } from '@/lib/format';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeMap = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
};

export default function Modal({ open, onClose, title, children, size = 'md', className }: ModalProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="animate-fade-in absolute inset-0 bg-forest-950/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={ref}
        className={classNames(
          'animate-slide-down relative z-10 flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-3xl bg-cream-50 shadow-lift sm:rounded-3xl',
          sizeMap[size],
          className,
        )}
      >
        {title && (
          <div className="flex items-center justify-between border-b border-earth-200/70 px-5 py-4">
            <h2 className="font-display text-lg font-semibold text-forest-900">{title}</h2>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-forest-600 transition-colors hover:bg-forest-50"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>
        )}
        <div className="no-scrollbar overflow-y-auto px-5 py-5">{children}</div>
      </div>
    </div>
  );
}
