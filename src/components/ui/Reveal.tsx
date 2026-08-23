import { useEffect, useRef, useState } from 'react';
import { classNames } from '@/lib/format';

type RevealDirection = 'up' | 'left' | 'scale';

interface RevealProps {
  children: React.ReactNode;
  /** Delay in milliseconds before the reveal starts */
  delay?: number;
  /** Direction of the reveal animation */
  direction?: RevealDirection;
  /** Render as a specific element (default: div) */
  as?: 'div' | 'section' | 'article' | 'li' | 'span' | 'figure';
  className?: string;
  /** Stagger index — sets delay = index * staggerMs */
  staggerIndex?: number;
  staggerMs?: number;
  /** Disable the observer and always show (e.g. for above-the-fold content) */
  immediate?: boolean;
}

const directionClass: Record<RevealDirection, string> = {
  up: 'reveal',
  left: 'reveal-left',
  scale: 'reveal-scale',
};

export function Reveal({
  children,
  delay = 0,
  direction = 'up',
  as: Tag = 'div',
  className,
  staggerIndex,
  staggerMs = 80,
  immediate = false,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(immediate);
  const computedDelay = staggerIndex !== undefined ? staggerIndex * staggerMs : delay;

  useEffect(() => {
    if (immediate) return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [immediate]);

  return (
    <Tag
      // @ts-expect-error — ref is valid for all rendered tags
      ref={ref}
      className={classNames(directionClass[direction], visible && 'is-visible', className)}
      style={computedDelay > 0 ? { transitionDelay: `${computedDelay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}

/**
 * Stagger container — wraps children and each Reveal with an incremental delay.
 * Use with Reveal children that have staggerIndex props.
 */
interface RevealGroupProps {
  children: React.ReactNode;
  className?: string;
  staggerMs?: number;
}

export function RevealGroup({ children, className, staggerMs = 80 }: RevealGroupProps) {
  return (
    <div className={className} style={{ '--kf-stagger': `${staggerMs}ms` } as React.CSSProperties}>
      {children}
    </div>
  );
}
