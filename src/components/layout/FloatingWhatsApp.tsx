import { useEffect, useState } from 'react';
import { WhatsAppIcon } from './Header';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { classNames } from '@/lib/format';

export default function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <a
      href={buildWhatsAppUrl('Habari KF! Ningeomba msaada.')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Kijana Factory on WhatsApp"
      className={classNames(
        'fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#1f7a4d] text-white shadow-lift transition-all duration-300 hover:bg-[#1a6a42]',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0',
      )}
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#1f7a4d] opacity-20" />
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
