import { useState } from 'react';
import { ArrowLeft, ArrowRight, Calendar, Check, Clock, MapPin, Users, Star, SlidersHorizontal } from 'lucide-react';
import { diningExperiences, experienceAddons } from '@/data/mockData';
import { useRouter } from '@/state/Router';
import { Badge, Stars, Divider, EmptyState } from '@/components/ui';
import Stepper from '@/components/ui/Stepper';
import QuantityControl from '@/components/ui/QuantityControl';
import { calculateExperiencePrice } from '@/lib/pricing';
import { formatPrice, todayISO, classNames, generateId } from '@/lib/format';
import { validateRequired, validatePhone, validateEmail, validateDate, validateMinGuests, isFormValid } from '@/lib/validation';
import { generateDiningBookingMessage, openWhatsApp } from '@/lib/whatsapp';
import { useToast } from '@/state/ToastContext';
import type { Customer } from '@/types';

const bookingSteps = [
  { label: 'Date', sub: 'Choose date' },
  { label: 'Time', sub: 'Choose time' },
  { label: 'Guests', sub: 'Party size' },
  { label: 'Occasion', sub: 'Celebrate' },
  { label: 'Add-ons', sub: 'Enhance' },
  { label: 'Dietary', sub: 'Requirements' },
  { label: 'Requests', sub: 'Special' },
  { label: 'Details', sub: 'Your info' },
];

const occasions = ['Birthday', 'Anniversary', 'Proposal', 'Wedding', 'Corporate', 'Family Gathering', 'Other'];
const dietaryOptions = ['Vegetarian', 'Vegan', 'Halal', 'Gluten-free', 'Dairy-free', 'Nut allergy', 'Seafood allergy', 'No pork'];

export default function ExperienceDetailsPage({ experienceId }: { experienceId: string }) {
  const { navigate } = useRouter();
  const { show } = useToast();
  const experience = diningExperiences.find((e) => e.id === experienceId);

  const [booking, setBooking] = useState(false);
  const [step, setStep] = useState(0);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState(2);
  const [occasion, setOccasion] = useState('');
  const [addonIds, setAddonIds] = useState<string[]>([]);
  const [allergies, setAllergies] = useState('');
  const [dietary, setDietary] = useState<string[]>([]);
  const [specialRequests, setSpecialRequests] = useState('');
  const [customer, setCustomer] = useState<Customer>({ name: '', phone: '', email: '' });
  const [errors, setErrors] = useState<Record<string, string | null>>({});

  if (!experience) {
    return (
      <div className="container-px pt-32 pb-20 text-center">
        <EmptyState title="Experience not found" description="This experience may no longer be available." action={<button onClick={() => navigate('/services')} className="btn-primary btn-md">Back to services</button>} />
      </div>
    );
  }

  const availableAddons = experienceAddons.filter((a) => experience.addons.includes(a.id));
  const selectedAddons = availableAddons.filter((a) => addonIds.includes(a.id));
  const price = calculateExperiencePrice(experience.basePrice, selectedAddons);

  const toggleAddon = (id: string) =>
    setAddonIds((prev) => (prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]));

  const toggleDietary = (id: string) =>
    setDietary((prev) => (prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]));

  const validateStep = (s: number): boolean => {
    const e: Record<string, string | null> = {};
    if (s === 0) e.date = validateDate(date);
    if (s === 1) e.time = validateRequired(time, 'Time slot');
    if (s === 2) e.guests = validateMinGuests(guests, 1);
    if (s === 3) e.occasion = validateRequired(occasion, 'Occasion');
    if (s === 7) {
      e.name = validateRequired(customer.name, 'Full name');
      e.phone = validatePhone(customer.phone);
      e.email = validateEmail(customer.email);
    }
    setErrors(e);
    return isFormValid(e);
  };

  const next = () => {
    if (!validateStep(step)) { show('Please complete this step', 'error'); return; }
    setStep((s) => Math.min(bookingSteps.length - 1, s + 1));
  };
  const back = () => setStep((s) => Math.max(0, s - 1));

  const sendBooking = () => {
    if (!validateStep(7)) { show('Please complete your details', 'error'); return; }
    const bookingData = {
      experienceId: experience.id,
      experienceName: experience.name,
      customer,
      date,
      time,
      guests,
      occasion,
      addonIds,
      allergies,
      dietary: dietary.join(', '),
      specialRequests,
      basePrice: experience.basePrice,
      addonsTotal: price.addonsTotal,
      total: price.total,
      id: generateId('BK'),
      createdAt: new Date().toISOString(),
      status: 'New' as const,
    };
    const msg = generateDiningBookingMessage({ customer, experience, booking: bookingData, selectedAddons });
    openWhatsApp(msg);
    navigate('/booking/success');
  };

  return (
    <div className="pt-16 sm:pt-20">
      <div className="container-px py-6">
        <button onClick={() => navigate('/services')} className="btn-ghost btn-sm -ml-2">
          <ArrowLeft size={16} /> Back to experiences
        </button>
      </div>

      {/* Gallery + info */}
      <div className="container-px">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="overflow-hidden rounded-3xl shadow-card">
            <img src={experience.images[0]} alt={experience.name} className="aspect-[4/3] w-full object-cover" />
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2">
              <Stars rating={experience.rating} size={14} /> <span className="text-sm text-earth-600">{experience.rating.toFixed(1)}</span>
            </div>
            <h1 className="mt-2 font-display text-3xl font-semibold text-forest-900 sm:text-4xl">{experience.name}</h1>
            <p className="mt-3 text-earth-700">{experience.description}</p>
            <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 text-earth-700"><MapPin size={16} className="text-spice-600" /> {experience.location}</div>
              <div className="flex items-center gap-2 text-earth-700"><Clock size={16} className="text-spice-600" /> {experience.duration}</div>
              <div className="flex items-center gap-2 text-earth-700"><Users size={16} className="text-spice-600" /> Up to {experience.capacity} guests</div>
              <div className="flex items-center gap-2 text-earth-700"><Calendar size={16} className="text-spice-600" /> {experience.availableDates.length} dates</div>
            </div>
            <div className="mt-6 flex items-center justify-between rounded-2xl bg-forest-50 p-4">
              <div>
                <span className="block text-xs text-earth-600">Starting from</span>
                <span className="font-display text-2xl font-semibold text-spice-600">{formatPrice(experience.basePrice)}</span>
              </div>
              {!booking && (
                <button onClick={() => setBooking(true)} className="btn-accent btn-lg">
                  <SlidersHorizontal size={18} /> Customize Experience
                </button>
              )}
            </div>
          </div>
        </div>

        {/* What's included + reviews */}
        {!booking && (
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <div className="card p-6">
              <h2 className="font-display text-xl font-semibold text-forest-900">What's included</h2>
              <ul className="mt-4 space-y-2.5">
                {experience.whatsIncluded.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-earth-700">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-forest-100 text-forest-700"><Check size={12} /></span>
                    {item}
                  </li>
                ))}
              </ul>
              <Divider className="my-5" />
              <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-forest-900">Available dates</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {experience.availableDates.map((d) => <Badge key={d} variant="cream">{d}</Badge>)}
              </div>
              <h3 className="mt-5 font-display text-sm font-semibold uppercase tracking-wider text-forest-900">Time slots</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {experience.timeSlots.map((t) => <Badge key={t} variant="spice">{t}</Badge>)}
              </div>
            </div>
            <div className="card p-6">
              <h2 className="font-display text-xl font-semibold text-forest-900">Reviews</h2>
              <div className="mt-4 space-y-4">
                {experience.reviews.map((r, i) => (
                  <figure key={i} className="rounded-2xl bg-cream-100 p-4">
                    <div className="flex items-center justify-between">
                      <Stars rating={r.rating} size={12} />
                      <span className="text-xs text-earth-500">{r.date}</span>
                    </div>
                    <blockquote className="mt-2 text-sm text-earth-700">"{r.text}"</blockquote>
                    <figcaption className="mt-2 text-xs font-semibold text-forest-900">— {r.author}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Booking flow */}
      {booking && (
        <div className="container-px mt-10 pb-24">
          <div className="mb-8 overflow-x-auto no-scrollbar">
            <div className="min-w-[640px]">
              <Stepper steps={bookingSteps} current={step} onStepClick={(i) => { if (i < step) setStep(i); }} />
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
            <div>
              {/* Step 0: Date */}
              {step === 0 && (
                <div className="card animate-fade-up p-6">
                  <h2 className="font-display text-xl font-semibold text-forest-900">Choose a date</h2>
                  <p className="mt-1 text-sm text-earth-600">Pick from available dates.</p>
                  <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {experience.availableDates.map((d) => (
                      <button
                        key={d}
                        onClick={() => setDate(d)}
                        className={classNames(
                          'rounded-xl border px-3 py-3 text-center text-sm font-medium transition-all',
                          date === d ? 'border-spice-500 bg-spice-50 ring-2 ring-spice-500/20 text-forest-900' : 'border-earth-200 bg-white text-forest-800 hover:border-spice-300',
                        )}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                  {errors.date && <p className="mt-2 text-xs text-hibiscus-600">{errors.date}</p>}
                </div>
              )}

              {/* Step 1: Time */}
              {step === 1 && (
                <div className="card animate-fade-up p-6">
                  <h2 className="font-display text-xl font-semibold text-forest-900">Choose a time</h2>
                  <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {experience.timeSlots.map((t) => (
                      <button
                        key={t}
                        onClick={() => setTime(t)}
                        className={classNames(
                          'rounded-xl border px-3 py-3 text-center text-sm font-medium transition-all',
                          time === t ? 'border-spice-500 bg-spice-50 ring-2 ring-spice-500/20 text-forest-900' : 'border-earth-200 bg-white text-forest-800 hover:border-spice-300',
                        )}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                  {errors.time && <p className="mt-2 text-xs text-hibiscus-600">{errors.time}</p>}
                </div>
              )}

              {/* Step 2: Guests */}
              {step === 2 && (
                <div className="card animate-fade-up p-6">
                  <h2 className="font-display text-xl font-semibold text-forest-900">Number of guests</h2>
                  <p className="mt-1 text-sm text-earth-600">Up to {experience.capacity} guests for this experience.</p>
                  <div className="mt-6 flex items-center justify-center gap-4">
                    <QuantityControl value={guests} onChange={setGuests} min={1} max={experience.capacity} />
                    <span className="text-sm text-earth-600">guest{guests !== 1 ? 's' : ''}</span>
                  </div>
                  {errors.guests && <p className="mt-2 text-center text-xs text-hibiscus-600">{errors.guests}</p>}
                </div>
              )}

              {/* Step 3: Occasion */}
              {step === 3 && (
                <div className="card animate-fade-up p-6">
                  <h2 className="font-display text-xl font-semibold text-forest-900">What's the occasion?</h2>
                  <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {occasions.map((o) => (
                      <button
                        key={o}
                        onClick={() => setOccasion(o)}
                        className={classNames(
                          'rounded-xl border px-3 py-3 text-center text-sm font-medium transition-all',
                          occasion === o ? 'border-spice-500 bg-spice-50 ring-2 ring-spice-500/20 text-forest-900' : 'border-earth-200 bg-white text-forest-800 hover:border-spice-300',
                        )}
                      >
                        {o}
                      </button>
                    ))}
                  </div>
                  {errors.occasion && <p className="mt-2 text-xs text-hibiscus-600">{errors.occasion}</p>}
                </div>
              )}

              {/* Step 4: Add-ons */}
              {step === 4 && (
                <div className="card animate-fade-up p-6">
                  <h2 className="font-display text-xl font-semibold text-forest-900">Customize your experience</h2>
                  <p className="mt-1 text-sm text-earth-600">Add any extras to make it special.</p>
                  <div className="mt-4 space-y-2">
                    {availableAddons.map((a) => (
                      <button
                        key={a.id}
                        onClick={() => toggleAddon(a.id)}
                        className={classNames(
                          'flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition-all',
                          addonIds.includes(a.id) ? 'border-spice-500 bg-spice-50 ring-2 ring-spice-500/20' : 'border-earth-200 bg-white hover:border-spice-300',
                        )}
                      >
                        <span className="flex items-center gap-3">
                          <span className={classNames('flex h-5 w-5 items-center justify-center rounded border', addonIds.includes(a.id) ? 'border-spice-600 bg-spice-600 text-cream-50' : 'border-earth-300')}>
                            {addonIds.includes(a.id) && <Check size={12} />}
                          </span>
                          <span>
                            <span className="block text-sm font-semibold text-forest-900">{a.name}</span>
                            <span className="block text-xs text-earth-600">{a.description}</span>
                          </span>
                        </span>
                        <span className="text-sm font-medium text-spice-600">+ {formatPrice(a.price)}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 5: Dietary */}
              {step === 5 && (
                <div className="card animate-fade-up p-6">
                  <h2 className="font-display text-xl font-semibold text-forest-900">Allergies &amp; dietary requirements</h2>
                  <div className="mt-4">
                    <label className="label" htmlFor="allergies">Allergies (optional)</label>
                    <input id="allergies" className="input" value={allergies} onChange={(e) => setAllergies(e.target.value)} placeholder="e.g. peanuts, shellfish" />
                  </div>
                  <div className="mt-4">
                    <span className="label">Dietary preferences</span>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {dietaryOptions.map((d) => (
                        <button
                          key={d}
                          onClick={() => toggleDietary(d)}
                          className={classNames(
                            'rounded-xl border px-3 py-2.5 text-center text-sm font-medium transition-all',
                            dietary.includes(d) ? 'border-forest-600 bg-forest-50 text-forest-900' : 'border-earth-200 bg-white text-forest-800 hover:border-forest-300',
                          )}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 6: Special requests */}
              {step === 6 && (
                <div className="card animate-fade-up p-6">
                  <h2 className="font-display text-xl font-semibold text-forest-900">Special requests</h2>
                  <p className="mt-1 text-sm text-earth-600">Any specific preferences or requests for your experience.</p>
                  <textarea className="input mt-4 min-h-32" value={specialRequests} onChange={(e) => setSpecialRequests(e.target.value)} placeholder="e.g. rooftop setup, surprise cake, specific cuisine..." />
                </div>
              )}

              {/* Step 7: Customer details */}
              {step === 7 && (
                <div className="card animate-fade-up p-6">
                  <h2 className="font-display text-xl font-semibold text-forest-900">Your details</h2>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label className="label label-required" htmlFor="b-name">Full name</label>
                      <input id="b-name" className="input" value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} placeholder="e.g. Amina Mohamed" />
                      {errors.name && <p className="mt-1 text-xs text-hibiscus-600">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="label label-required" htmlFor="b-phone">Phone</label>
                      <input id="b-phone" className="input" value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} placeholder="+255 7XX XXX XXX" inputMode="tel" />
                      {errors.phone && <p className="mt-1 text-xs text-hibiscus-600">{errors.phone}</p>}
                    </div>
                    <div>
                      <label className="label" htmlFor="b-email">Email (optional)</label>
                      <input id="b-email" className="input" value={customer.email} onChange={(e) => setCustomer({ ...customer, email: e.target.value })} placeholder="you@example.com" inputMode="email" />
                      {errors.email && <p className="mt-1 text-xs text-hibiscus-600">{errors.email}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* Nav */}
              <div className="mt-6 flex items-center justify-between">
                <button onClick={() => (step === 0 ? setBooking(false) : back())} className="btn-ghost btn-md">
                  <ArrowLeft size={16} /> {step === 0 ? 'Cancel' : 'Back'}
                </button>
                {step < bookingSteps.length - 1 ? (
                  <button onClick={next} className="btn-accent btn-md">Continue <ArrowRight size={16} /></button>
                ) : (
                  <button onClick={sendBooking} className="btn-whatsapp btn-lg">
                    <Star size={16} /> Book Experience via WhatsApp
                  </button>
                )}
              </div>
            </div>

            {/* Sticky summary */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="card p-5">
                <h2 className="font-display text-base font-semibold text-forest-900">Booking summary</h2>
                <dl className="mt-3 space-y-1.5 text-sm">
                  <div className="flex justify-between"><dt className="text-earth-700">Experience</dt><dd className="text-right font-medium text-forest-900">{experience.name}</dd></div>
                  <div className="flex justify-between"><dt className="text-earth-700">Date</dt><dd className="font-medium text-forest-900">{date || '—'}</dd></div>
                  <div className="flex justify-between"><dt className="text-earth-700">Time</dt><dd className="font-medium text-forest-900">{time || '—'}</dd></div>
                  <div className="flex justify-between"><dt className="text-earth-700">Guests</dt><dd className="font-medium text-forest-900">{guests}</dd></div>
                  <div className="flex justify-between"><dt className="text-earth-700">Occasion</dt><dd className="font-medium text-forest-900">{occasion || '—'}</dd></div>
                </dl>
                <Divider className="my-3" />
                <dl className="space-y-1.5 text-sm">
                  <div className="flex justify-between"><dt className="text-earth-700">Base experience</dt><dd className="font-medium text-forest-900">{formatPrice(price.base)}</dd></div>
                  {selectedAddons.map((a) => (
                    <div key={a.id} className="flex justify-between"><dt className="text-earth-700">{a.name}</dt><dd className="font-medium text-forest-900">+ {formatPrice(a.price)}</dd></div>
                  ))}
                  <div className="flex justify-between border-t border-earth-200 pt-2">
                    <dt className="font-display font-semibold text-forest-900">Total</dt>
                    <dd className="font-display text-xl font-semibold text-spice-600 animate-price-pulse" key={price.total}>{formatPrice(price.total)}</dd>
                  </div>
                </dl>
              </div>
            </aside>
          </div>
        </div>
      )}
    </div>
  );
}
