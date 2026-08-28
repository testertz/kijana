import { classNames } from '@/lib/format';

interface StepperProps {
  steps: { label: string; sub?: string }[];
  current: number; // 0-indexed
  onStepClick?: (index: number) => void;
}

export default function Stepper({ steps, current, onStepClick }: StepperProps) {
  return (
    <div className="w-full">
      <ol className="flex items-center gap-1 sm:gap-2">
        {steps.map((step, i) => {
          const done = i < current;
          const active = i === current;
          const clickable = onStepClick && i <= current;
          return (
            <li key={i} className="flex flex-1 items-center gap-1 sm:gap-2">
              <button
                type="button"
                disabled={!clickable}
                onClick={() => clickable && onStepClick?.(i)}
                className={classNames(
                  'flex min-w-0 flex-1 items-center gap-2 rounded-xl px-2 py-2 text-left transition-colors sm:px-3',
                  active && 'bg-forest-50',
                  done && !active && 'hover:bg-forest-50/60',
                )}
              >
                <span
                  className={classNames(
                    'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold',
                    done && 'bg-forest-700 text-cream-50',
                    active && 'bg-spice-600 text-cream-50 ring-2 ring-spice-500/20',
                    !done && !active && 'bg-earth-100 text-earth-500',
                  )}
                >
                  {done ? '✓' : i + 1}
                </span>
                <span className="min-w-0">
                  <span
                    className={classNames(
                      'block truncate text-xs font-semibold sm:text-sm',
                      active ? 'text-forest-900' : done ? 'text-forest-700' : 'text-earth-500',
                    )}
                  >
                    {step.label}
                  </span>
                  {step.sub && (
                    <span className="hidden truncate text-xs text-earth-500 sm:block">{step.sub}</span>
                  )}
                </span>
              </button>
              {i < steps.length - 1 && (
                <span
                  className={classNames(
                    'h-px flex-1',
                    i < current ? 'bg-forest-400' : 'bg-earth-200',
                  )}
                />
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
