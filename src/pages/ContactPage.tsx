import { useState } from 'react';
import { Check, Mail, MapPin, Phone, Clock } from 'lucide-react';
import { useRouter } from '@/state/Router';
import { useToast } from '@/state/ToastContext';
import { siteConfig } from '@/config/site';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { WhatsAppIcon } from '@/components/layout/Header';
import { validateRequired, validatePhone, validateEmail, isFormValid } from '@/lib/validation';

export default function ContactPage() {
  const { navigate } = useRouter();
  const { show } = useToast();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [submitted, setSubmitted] = useState(false);

  const update = (k: keyof typeof form, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string | null> = {
      name: validateRequired(form.name, 'Name'),
      email: validateEmail(form.email) ?? validateRequired(form.email, 'Email'),
      phone: validatePhone(form.phone),
      message: validateRequired(form.message, 'Message'),
    };
    setErrors(errs);
    if (!isFormValid(errs)) { show('Please complete all required fields', 'error'); return; }
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pt-16 sm:pt-20">
      <div className="bg-forest-700 py-12 text-cream-50 sm:py-16">
        <div className="container-px">
          <p className="eyebrow text-spice-300">Wasiliana Nasi</p>
          <h1 className="mt-2 font-display text-4xl font-semibold sm:text-5xl">Contact Us</h1>
          <p className="mt-3 max-w-xl text-cream-200/85">We would love to hear from you. Reach out for products, bookings, partnerships or any questions.</p>
        </div>
      </div>

      <div className="container-px py-12 sm:py-16">
        {submitted ? (
          <div className="mx-auto max-w-lg text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-forest-100 text-forest-700 animate-scale-in">
              <Check size={40} />
            </div>
            <h2 className="mt-6 font-display text-3xl font-semibold text-forest-900">Message sent!</h2>
            <p className="mt-4 text-earth-700">Thank you for reaching out. We will get back to you shortly.</p>
            <button onClick={() => navigate('/')} className="btn-outline btn-lg mt-6">Back to Home</button>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Contact info */}
            <div>
              <h2 className="font-display text-2xl font-semibold text-forest-900">Get in touch</h2>
              <div className="mt-6 space-y-4">
                <ContactRow icon={<Phone size={18} />} label="Phone" value={siteConfig.contact.phone} />
                <ContactRow icon={<WhatsAppIcon className="h-4 w-4" />} label="WhatsApp" value={siteConfig.contact.whatsapp} />
                <ContactRow icon={<Mail size={18} />} label="Email" value={siteConfig.contact.email} />
                <ContactRow icon={<MapPin size={18} />} label="Location" value={`${siteConfig.contact.addressLine}, ${siteConfig.contact.addressCountry}`} />
                <ContactRow icon={<Clock size={18} />} label="Hours" value={siteConfig.contact.hours} />
              </div>

              <a
                href={buildWhatsAppUrl('Habari KF! Ningeomba msaada.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp btn-lg mt-8 w-full"
              >
                <WhatsAppIcon className="h-5 w-5" /> Chat with KF on WhatsApp
              </a>

              {/* Map placeholder */}
              <div className="mt-6 overflow-hidden rounded-2xl border border-earth-200 bg-cream-100">
                <iframe
                  title="KF location map"
                  width="100%"
                  height="240"
                  loading="lazy"
                  style={{ border: 0 }}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(siteConfig.contact.mapQuery)}&output=embed`}
                />
              </div>
            </div>

            {/* Form */}
            <div className="card p-6">
              <h2 className="font-display text-2xl font-semibold text-forest-900">Send a message</h2>
              <form onSubmit={submit} className="mt-5 space-y-4">
                <div>
                  <label className="label label-required" htmlFor="ct-name">Name</label>
                  <input id="ct-name" className="input" value={form.name} onChange={(e) => update('name', e.target.value)} />
                  {errors.name && <p className="mt-1 text-xs text-hibiscus-600">{errors.name}</p>}
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="label label-required" htmlFor="ct-email">Email</label>
                    <input id="ct-email" className="input" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="you@example.com" inputMode="email" />
                    {errors.email && <p className="mt-1 text-xs text-hibiscus-600">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="label label-required" htmlFor="ct-phone">Phone</label>
                    <input id="ct-phone" className="input" value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="+255 7XX XXX XXX" inputMode="tel" />
                    {errors.phone && <p className="mt-1 text-xs text-hibiscus-600">{errors.phone}</p>}
                  </div>
                </div>
                <div>
                  <label className="label label-required" htmlFor="ct-msg">Message</label>
                  <textarea id="ct-msg" className="input min-h-32" value={form.message} onChange={(e) => update('message', e.target.value)} placeholder="How can we help?" />
                  {errors.message && <p className="mt-1 text-xs text-hibiscus-600">{errors.message}</p>}
                </div>
                <button type="submit" className="btn-primary btn-lg w-full">Send message</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ContactRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-spice-100 text-spice-700">{icon}</div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-earth-500">{label}</p>
        <p className="text-sm font-medium text-forest-900">{value}</p>
      </div>
    </div>
  );
}
