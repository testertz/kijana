import { CheckCircle2, MessageCircle, ShoppingBag } from 'lucide-react';
import { useRouter } from '@/state/Router';
import { WhatsAppIcon } from '@/components/layout/Header';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

interface SuccessPageProps {
  variant: 'order' | 'booking' | 'chef' | 'application' | 'partner' | 'contact';
  title?: string;
  message?: string;
  primaryLabel?: string;
  primaryTo?: string;
  whatsappContext?: string;
}

const defaults: Record<SuccessPageProps['variant'], { title: string; message: string; primaryLabel: string; primaryTo: string; whatsappContext: string }> = {
  order: {
    title: 'Your order is ready!',
    message: 'Your order details have been prepared for WhatsApp. Send the message to Kijana Factory to complete your request.',
    primaryLabel: 'Back to Shop',
    primaryTo: '/shop',
    whatsappContext: 'Habari! Niliweka order yangu kupitia tovuti yenu.',
  },
  booking: {
    title: 'Your dining experience request is ready.',
    message: 'Your booking details have been prepared for WhatsApp. Send the message to KF to confirm your experience.',
    primaryLabel: 'Explore more experiences',
    primaryTo: '/services',
    whatsappContext: 'Habari! Niliweka booking yangu ya dining experience.',
  },
  chef: {
    title: 'Your chef request is ready.',
    message: 'Your chef request details have been prepared for WhatsApp. Send the message to KF to complete your request.',
    primaryLabel: 'Back to Services',
    primaryTo: '/services',
    whatsappContext: 'Habari! Niliomba chef kupitia tovuti yenu.',
  },
  application: {
    title: 'Application received!',
    message: 'Thank you for applying to become a KF Chef. Our team will review your application and contact you soon.',
    primaryLabel: 'Back to Home',
    primaryTo: '/',
    whatsappContext: 'Habari! Niliwasilisha maombi yangu ya kuwa KF Chef.',
  },
  partner: {
    title: 'Thank you for partnering with KF!',
    message: 'Your partnership interest has been received. Our team will reach out to discuss how we can work together.',
    primaryLabel: 'Back to Home',
    primaryTo: '/',
    whatsappContext: 'Habari! Nimejaza fomu ya ushirikiano na KF.',
  },
  contact: {
    title: 'Message sent!',
    message: 'Thank you for reaching out. We will get back to you shortly.',
    primaryLabel: 'Back to Home',
    primaryTo: '/',
    whatsappContext: 'Habari! Nilikutumia ujumbe kupitia tovuti yenu.',
  },
};

export default function SuccessPage({ variant, title, message, primaryLabel, primaryTo, whatsappContext }: SuccessPageProps) {
  const { navigate } = useRouter();
  const d = defaults[variant];

  return (
    <div className="pt-16 sm:pt-20">
      <div className="container-px py-16 sm:py-24">
        <div className="mx-auto max-w-lg text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-forest-100 text-forest-700 animate-scale-in">
            <CheckCircle2 size={40} />
          </div>
          <h1 className="mt-6 font-display text-3xl font-semibold text-forest-900 sm:text-4xl">{title ?? d.title}</h1>
          <p className="mt-4 text-earth-700">{message ?? d.message}</p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={buildWhatsAppUrl(whatsappContext ?? d.whatsappContext)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp btn-lg"
            >
              <WhatsAppIcon className="h-5 w-5" /> Open WhatsApp
            </a>
            <button onClick={() => navigate(primaryTo ?? d.primaryTo)} className="btn-outline btn-lg">
              <ShoppingBag size={18} /> {primaryLabel ?? d.primaryLabel}
            </button>
          </div>

          <button onClick={() => navigate('/')} className="mt-6 text-sm text-earth-500 underline-offset-2 hover:underline">
            Back to home
          </button>
        </div>
      </div>
    </div>
  );
}
