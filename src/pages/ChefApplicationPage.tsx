import { useState } from 'react';
import { ArrowLeft, ChefHat, Check, Upload } from 'lucide-react';
import { useRouter } from '@/state/Router';
import { useToast } from '@/state/ToastContext';
import { chefCuisines } from '@/data/mockData';
import { validateRequired, validatePhone, validateEmail, isFormValid } from '@/lib/validation';
import { classNames } from '@/lib/format';

export default function ChefApplicationPage() {
  const { navigate } = useRouter();
  const { show } = useToast();
  const [form, setForm] = useState({
    name: '', phone: '', email: '', location: '', speciality: '',
    experienceYears: '', bio: '', availability: '', additional: '',
  });
  const [cuisines, setCuisines] = useState<string[]>([]);
  const [photoName, setPhotoName] = useState('');
  const [portfolioNames, setPortfolioNames] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [submitted, setSubmitted] = useState(false);

  const update = (k: keyof typeof form, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const toggleCuisine = (id: string) =>
    setCuisines((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string | null> = {
      name: validateRequired(form.name, 'Full name'),
      phone: validatePhone(form.phone),
      email: validateEmail(form.email),
      location: validateRequired(form.location, 'Location'),
      speciality: validateRequired(form.speciality, 'Speciality'),
      experienceYears: validateRequired(form.experienceYears, 'Years of experience'),
      bio: validateRequired(form.bio, 'Biography'),
    };
    errs.cuisines = cuisines.length === 0 ? 'Select at least one cuisine' : null;
    setErrors(errs);
    if (!isFormValid(errs)) { show('Please complete all required fields', 'error'); return; }
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (submitted) {
    return (
      <div className="pt-16 sm:pt-20">
        <div className="container-px py-16 sm:py-24">
          <div className="mx-auto max-w-lg text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-forest-100 text-forest-700 animate-scale-in">
              <Check size={40} />
            </div>
            <h1 className="mt-6 font-display text-3xl font-semibold text-forest-900 sm:text-4xl">Application received!</h1>
            <p className="mt-4 text-earth-700">Thank you for applying to become a KF Chef, {form.name.split(' ')[0]}. Our team will review your application and contact you within 3–5 business days.</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <button onClick={() => navigate('/')} className="btn-outline btn-lg">Back to Home</button>
              <button onClick={() => navigate('/services')} className="btn-primary btn-lg">Explore Services</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 sm:pt-20">
      <div className="bg-forest-700 py-10 text-cream-50 sm:py-14">
        <div className="container-px">
          <button onClick={() => navigate('/services')} className="btn-ghost btn-sm -ml-2 text-cream-100 hover:bg-cream-50/10">
            <ArrowLeft size={16} /> Back to services
          </button>
          <div className="mt-4 flex items-center gap-3">
            <ChefHat className="h-8 w-8 text-spice-400" />
            <div>
              <h1 className="font-display text-3xl font-semibold sm:text-4xl">Become a KF Chef</h1>
              <p className="mt-1 text-cream-200/85">Join our network of Tanzanian chefs and get matched with events.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-px py-10 pb-24">
        <form onSubmit={submit} className="mx-auto max-w-2xl space-y-6">
          <div className="card p-6">
            <h2 className="font-display text-lg font-semibold text-forest-900">Personal information</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="label label-required" htmlFor="ap-name">Full name</label>
                <input id="ap-name" className="input" value={form.name} onChange={(e) => update('name', e.target.value)} />
                {errors.name && <p className="mt-1 text-xs text-hibiscus-600">{errors.name}</p>}
              </div>
              <div>
                <label className="label label-required" htmlFor="ap-phone">Phone</label>
                <input id="ap-phone" className="input" value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="+255 7XX XXX XXX" inputMode="tel" />
                {errors.phone && <p className="mt-1 text-xs text-hibiscus-600">{errors.phone}</p>}
              </div>
              <div>
                <label className="label label-required" htmlFor="ap-email">Email</label>
                <input id="ap-email" className="input" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="you@example.com" inputMode="email" />
                {errors.email && <p className="mt-1 text-xs text-hibiscus-600">{errors.email}</p>}
              </div>
              <div>
                <label className="label label-required" htmlFor="ap-loc">Location</label>
                <input id="ap-loc" className="input" value={form.location} onChange={(e) => update('location', e.target.value)} placeholder="e.g. Dar es Salaam" />
                {errors.location && <p className="mt-1 text-xs text-hibiscus-600">{errors.location}</p>}
              </div>
              <div>
                <label className="label" htmlFor="ap-photo">Profile photo</label>
                <label htmlFor="ap-photo" className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-earth-300 px-4 py-3 text-sm text-earth-600 transition-colors hover:border-spice-400 hover:bg-spice-50">
                  <Upload size={16} /> {photoName || 'Upload photo'}
                </label>
                <input id="ap-photo" type="file" accept="image/*" className="hidden" onChange={(e) => setPhotoName(e.target.files?.[0]?.name ?? '')} />
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h2 className="font-display text-lg font-semibold text-forest-900">Culinary expertise</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label label-required" htmlFor="ap-spec">Speciality</label>
                <input id="ap-spec" className="input" value={form.speciality} onChange={(e) => update('speciality', e.target.value)} placeholder="e.g. Swahili cuisine" />
                {errors.speciality && <p className="mt-1 text-xs text-hibiscus-600">{errors.speciality}</p>}
              </div>
              <div>
                <label className="label label-required" htmlFor="ap-exp">Years of experience</label>
                <input id="ap-exp" type="number" min="0" className="input" value={form.experienceYears} onChange={(e) => update('experienceYears', e.target.value)} placeholder="e.g. 5" inputMode="numeric" />
                {errors.experienceYears && <p className="mt-1 text-xs text-hibiscus-600">{errors.experienceYears}</p>}
              </div>
            </div>
            <div className="mt-4">
              <span className="label label-required">Cuisine types</span>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {chefCuisines.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => toggleCuisine(c.id)}
                    className={classNames(
                      'flex items-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-medium transition-all',
                      cuisines.includes(c.id) ? 'border-spice-500 bg-spice-50 ring-2 ring-spice-500/20 text-forest-900' : 'border-earth-200 bg-white text-forest-800 hover:border-spice-300',
                    )}
                  >
                    {cuisines.includes(c.id) && <Check size={14} className="text-spice-600" />}
                    {c.name}
                  </button>
                ))}
              </div>
              {errors.cuisines && <p className="mt-1 text-xs text-hibiscus-600">{errors.cuisines}</p>}
            </div>
            <div className="mt-4">
              <label className="label label-required" htmlFor="ap-bio">Biography</label>
              <textarea id="ap-bio" className="input min-h-28" value={form.bio} onChange={(e) => update('bio', e.target.value)} placeholder="Tell us about your culinary journey..." />
              {errors.bio && <p className="mt-1 text-xs text-hibiscus-600">{errors.bio}</p>}
            </div>
          </div>

          <div className="card p-6">
            <h2 className="font-display text-lg font-semibold text-forest-900">Portfolio &amp; availability</h2>
            <div className="mt-5 space-y-4">
              <div>
                <label className="label" htmlFor="ap-portfolio">Portfolio photos (optional)</label>
                <label htmlFor="ap-portfolio" className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-earth-300 px-4 py-3 text-sm text-earth-600 transition-colors hover:border-spice-400 hover:bg-spice-50">
                  <Upload size={16} /> {portfolioNames.length > 0 ? `${portfolioNames.length} file(s) selected` : 'Upload photos'}
                </label>
                <input id="ap-portfolio" type="file" accept="image/*" multiple className="hidden" onChange={(e) => setPortfolioNames(Array.from(e.target.files ?? []).map((f) => f.name))} />
              </div>
              <div>
                <label className="label" htmlFor="ap-avail">Availability</label>
                <input id="ap-avail" className="input" value={form.availability} onChange={(e) => update('availability', e.target.value)} placeholder="e.g. Weekends, full-time" />
              </div>
              <div>
                <label className="label" htmlFor="ap-add">Additional information (optional)</label>
                <textarea id="ap-add" className="input min-h-20" value={form.additional} onChange={(e) => update('additional', e.target.value)} placeholder="Anything else we should know?" />
              </div>
            </div>
          </div>

          <button type="submit" className="btn-accent btn-lg w-full">
            <ChefHat size={18} /> Apply as KF Chef
          </button>
        </form>
      </div>
    </div>
  );
}
