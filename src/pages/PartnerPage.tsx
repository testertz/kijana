import { useState } from 'react';
import { ArrowLeft, Check, HeartHandshake } from 'lucide-react';
import { useRouter } from '@/state/Router';
import { useToast } from '@/state/ToastContext';
import { validateRequired, validatePhone, validateEmail, isFormValid } from '@/lib/validation';
import { classNames } from '@/lib/format';
import { Reveal } from '@/components/ui';

const supportTypes = [
  'Farmer Partnership',
  'School Partnership',
  'Corporate Partnership',
  'Distribution',
  'Sponsorship',
  'Investment',
  'Other',
];

export default function PartnerPage() {
  const { navigate } = useRouter();
  const { show } = useToast();
  const [form, setForm] = useState({ name: '', organization: '', email: '', phone: '', message: '' });
  const [supportType, setSupportType] = useState('');
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
    errs.supportType = validateRequired(supportType, 'Support type');
    setErrors(errs);
    if (!isFormValid(errs)) { show('Please complete all required fields', 'error'); return; }
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (submitted) {
    return (
      <div className="pt-16 sm:pt-20">
        <div className="container-px py-16 sm:py-24">
          <Reveal direction="scale" className="mx-auto max-w-lg text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-forest-100 text-forest-700 animate-scale-in">
              <Check size={40} className="animate-check-draw" style={{ strokeDasharray: 40, strokeDashoffset: 0 }} />
            </div>
            <h1 className="mt-6 font-display text-3xl font-semibold text-forest-900 sm:text-4xl">Thank you for partnering with KF!</h1>
            <p className="mt-4 text-earth-700">Your partnership interest has been received. Our team will reach out within 3–5 business days to discuss how we can work together.</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <button onClick={() => navigate('/')} className="btn-outline btn-lg">Back to Home</button>
              <button onClick={() => navigate('/impact')} className="btn-primary btn-lg">Read our impact</button>
            </div>
          </Reveal>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 sm:pt-20">
      <div className="bg-forest-700 py-10 text-cream-50 sm:py-14">
        <div className="container-px">
          <button onClick={() => navigate('/impact')} className="btn-ghost btn-sm -ml-2 text-cream-100 hover:bg-cream-50/10">
            <ArrowLeft size={16} /> Back to impact
          </button>
          <div className="mt-4 flex items-center gap-3">
            <HeartHandshake className="h-8 w-8 text-spice-400" />
            <div>
              <h1 className="font-display text-3xl font-semibold sm:text-4xl">Partner with KF</h1>
              <p className="mt-1 text-cream-200/85">Join us in building a healthier, more prosperous Tanzania.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-px py-10 pb-24">
        <form onSubmit={submit} className="mx-auto max-w-2xl space-y-6">
          <div className="card p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label label-required" htmlFor="p-name">Name</label>
                <input id="p-name" className={classNames('input', errors.name && 'input-error border-hibiscus-400')} value={form.name} onChange={(e) => update('name', e.target.value)} />
                {errors.name && <p className="mt-1 animate-slide-down text-xs text-hibiscus-600">{errors.name}</p>}
              </div>
              <div>
                <label className="label" htmlFor="p-org">Organization</label>
                <input id="p-org" className="input" value={form.organization} onChange={(e) => update('organization', e.target.value)} placeholder="Optional" />
              </div>
              <div>
                <label className="label label-required" htmlFor="p-email">Email</label>
                <input id="p-email" className={classNames('input', errors.email && 'input-error border-hibiscus-400')} value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="you@example.com" inputMode="email" />
                {errors.email && <p className="mt-1 animate-slide-down text-xs text-hibiscus-600">{errors.email}</p>}
              </div>
              <div>
                <label className="label label-required" htmlFor="p-phone">Phone</label>
                <input id="p-phone" className={classNames('input', errors.phone && 'input-error border-hibiscus-400')} value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="+255 7XX XXX XXX" inputMode="tel" />
                {errors.phone && <p className="mt-1 animate-slide-down text-xs text-hibiscus-600">{errors.phone}</p>}
              </div>
            </div>
          </div>

          <div className="card p-6">
            <span className="label label-required">How would you like to support KF?</span>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {supportTypes.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setSupportType(t)}
                  className={classNames(
                    'flex items-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-medium transition-all duration-200 active:scale-95',
                    supportType === t ? 'border-spice-500 bg-spice-50 ring-2 ring-spice-500/20 text-forest-900' : 'border-earth-200 bg-white text-forest-800 hover:border-spice-300 hover:shadow-soft',
                  )}
                >
                  {supportType === t && <Check size={14} className="text-spice-600" />}
                  {t}
                </button>
              ))}
            </div>
            {errors.supportType && <p className="mt-1 animate-slide-down text-xs text-hibiscus-600">{errors.supportType}</p>}

            <div className="mt-4">
              <label className="label label-required" htmlFor="p-msg">Message</label>
              <textarea id="p-msg" className={classNames('input min-h-32', errors.message && 'input-error border-hibiscus-400')} value={form.message} onChange={(e) => update('message', e.target.value)} placeholder="Tell us about your partnership interest..." />
              {errors.message && <p className="mt-1 animate-slide-down text-xs text-hibiscus-600">{errors.message}</p>}
            </div>
          </div>

          <button type="submit" className="btn-accent btn-lg w-full">
            <HeartHandshake size={18} /> Submit Partnership Interest
          </button>
        </form>
      </div>
    </div>
  );
}
