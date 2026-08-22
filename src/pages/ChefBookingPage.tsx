import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, ChefHat, Check, Clock, MapPin, Users, Utensils, Info } from 'lucide-react';
import { useRouter } from '@/state/Router';
import { useToast } from '@/state/ToastContext';
import { chefs, chefCuisines, mealTypes, eventTypes, deliveryZones } from '@/data/mockData';
import { calculateChefEstimate } from '@/lib/pricing';
import { formatPrice, todayISO, classNames, generateId } from '@/lib/format';
import { validateRequired, validatePhone, validateEmail, validateDate, validateMinGuests, isFormValid } from '@/lib/validation';
import { generateChefRequestMessage, openWhatsApp } from '@/lib/whatsapp';
import { Badge, Divider, Stars } from '@/components/ui';
import Stepper from '@/components/ui/Stepper';
import QuantityControl from '@/components/ui/QuantityControl';
import type { Customer } from '@/types';

const chefSteps = [
  { label: 'Requirements', sub: 'Chefs & guests' },
  { label: 'Cuisine', sub: 'Food type' },
  { label: 'Schedule', sub: 'Date & time' },
  { label: 'Event', sub: 'Type & location' },
  { label: 'Details', sub: 'Allergies & budget' },
  { label: 'Your info', sub: 'Contact' },
];

export default function ChefBookingPage() {
  const { navigate } = useRouter();
  const { show } = useToast();
  const [step, setStep] = useState(0);

  const [numberOfChefs, setNumberOfChefs] = useState(1);
  const [guests, setGuests] = useState(10);
  const [cuisines, setCuisines] = useState<string[]>([]);
  const [meal, setMeal] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [eventType, setEventType] = useState('');
  const [budget, setBudget] = useState('');
  const [allergies, setAllergies] = useState('');
  const [dietary, setDietary] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [customer, setCustomer] = useState<Customer>({ name: '', phone: '', email: '' });
  const [errors, setErrors] = useState<Record<string, string | null>>({});

  const estimate = useMemo(
    () => calculateChefEstimate({ numberOfChefs, guests, meal, cuisines, eventType, location }),
    [numberOfChefs, guests, meal, cuisines, eventType, location],
  );

  const toggleCuisine = (id: string) =>
    setCuisines((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]));

  const validateStep = (s: number): boolean => {
    const e: Record<string, string | null> = {};
    if (s === 0) { e.guests = validateMinGuests(guests, 1); }
    if (s === 1) e.cuisines = cuisines.length === 0 ? 'Select at least one cuisine' : null;
    if (s === 2) { e.meal = validateRequired(meal, 'Meal'); e.date = validateDate(date); e.time = validateRequired(time, 'Time'); }
    if (s === 3) { e.eventType = validateRequired(eventType, 'Event type'); e.location = validateRequired(location, 'Location'); }
    if (s === 5) {
      e.name = validateRequired(customer.name, 'Full name');
      e.phone = validatePhone(customer.phone);
      e.email = validateEmail(customer.email);
    }
    setErrors(e);
    return isFormValid(e);
  };

  const next = () => {
    if (!validateStep(step)) { show('Please complete this step', 'error'); return; }
    setStep((s) => Math.min(chefSteps.length - 1, s + 1));
  };
  const back = () => setStep((s) => Math.max(0, s - 1));

  const sendRequest = () => {
    if (!validateStep(5)) { show('Please complete your details', 'error'); return; }
    const requestData = {
      customer,
      numberOfChefs,
      guests,
      cuisines,
      meal,
      date,
      time,
      location,
      eventType,
      budget,
      allergies,
      dietary,
      specialRequests,
      estimatedCost: estimate,
      id: generateId('CR'),
      createdAt: new Date().toISOString(),
      status: 'New' as const,
    };
    const msg = generateChefRequestMessage({ customer, request: requestData });
    openWhatsApp(msg);
    navigate('/chef/success');
  };

  return (
    <div className="pt-16 sm:pt-20">
      <div className="bg-forest-700 py-10 text-cream-50 sm:py-14">
        <div className="container-px">
          <p className="eyebrow text-spice-300">KF Chef</p>
          <h1 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">Request a Chef</h1>
          <p className="mt-2 max-w-xl text-cream-200/85">Tell us your needs and get an instant estimated cost. Final confirmation happens through KF via WhatsApp.</p>
        </div>
      </div>

      <div className="container-px py-8 pb-24">
        <div className="mb-8 overflow-x-auto no-scrollbar">
          <div className="min-w-[560px]">
            <Stepper steps={chefSteps} current={step} onStepClick={(i) => { if (i < step) setStep(i); }} />
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          <div>
            {/* Step 0: Requirements */}
            {step === 0 && (
              <div className="card animate-fade-up p-6">
                <h2 className="font-display text-xl font-semibold text-forest-900">Chef requirements</h2>
                <div className="mt-5 space-y-5">
                  <div>
                    <span className="label">Number of chefs</span>
                    <div className="flex items-center gap-4">
                      <QuantityControl value={numberOfChefs} onChange={setNumberOfChefs} min={1} max={10} />
                      <span className="text-sm text-earth-600">chef{numberOfChefs !== 1 ? 's' : ''}</span>
                    </div>
                  </div>
                  <div>
                    <span className="label">Number of guests</span>
                    <div className="flex items-center gap-4">
                      <QuantityControl value={guests} onChange={setGuests} min={1} max={500} />
                      <span className="text-sm text-earth-600">guest{guests !== 1 ? 's' : ''}</span>
                    </div>
                    {errors.guests && <p className="mt-1 text-xs text-hibiscus-600">{errors.guests}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Step 1: Cuisine */}
            {step === 1 && (
              <div className="card animate-fade-up p-6">
                <h2 className="font-display text-xl font-semibold text-forest-900">Cuisine preferences</h2>
                <p className="mt-1 text-sm text-earth-600">Select one or more cuisines.</p>
                <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {chefCuisines.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => toggleCuisine(c.id)}
                      className={classNames(
                        'flex items-center gap-2 rounded-xl border px-3 py-3 text-sm font-medium transition-all',
                        cuisines.includes(c.id) ? 'border-spice-500 bg-spice-50 ring-2 ring-spice-500/20 text-forest-900' : 'border-earth-200 bg-white text-forest-800 hover:border-spice-300',
                      )}
                    >
                      {cuisines.includes(c.id) && <Check size={14} className="text-spice-600" />}
                      {c.name}
                    </button>
                  ))}
                </div>
                {errors.cuisines && <p className="mt-2 text-xs text-hibiscus-600">{errors.cuisines}</p>}
              </div>
            )}

            {/* Step 2: Schedule */}
            {step === 2 && (
              <div className="card animate-fade-up p-6">
                <h2 className="font-display text-xl font-semibold text-forest-900">Meal &amp; schedule</h2>
                <div className="mt-5 space-y-4">
                  <div>
                    <span className="label label-required">Meal</span>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {mealTypes.map((m) => (
                        <button
                          key={m.id}
                          onClick={() => setMeal(m.id)}
                          className={classNames(
                            'rounded-xl border px-3 py-3 text-sm font-medium transition-all',
                            meal === m.id ? 'border-spice-500 bg-spice-50 ring-2 ring-spice-500/20 text-forest-900' : 'border-earth-200 bg-white text-forest-800 hover:border-spice-300',
                          )}
                        >
                          {m.name}
                        </button>
                      ))}
                    </div>
                    {errors.meal && <p className="mt-1 text-xs text-hibiscus-600">{errors.meal}</p>}
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="label label-required" htmlFor="chef-date">Date</label>
                      <input id="chef-date" type="date" className="input" min={todayISO()} value={date} onChange={(e) => setDate(e.target.value)} />
                      {errors.date && <p className="mt-1 text-xs text-hibiscus-600">{errors.date}</p>}
                    </div>
                    <div>
                      <label className="label label-required" htmlFor="chef-time">Time</label>
                      <input id="chef-time" type="time" className="input" value={time} onChange={(e) => setTime(e.target.value)} />
                      {errors.time && <p className="mt-1 text-xs text-hibiscus-600">{errors.time}</p>}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Event & location */}
            {step === 3 && (
              <div className="card animate-fade-up p-6">
                <h2 className="font-display text-xl font-semibold text-forest-900">Event &amp; location</h2>
                <div className="mt-5 space-y-4">
                  <div>
                    <span className="label label-required">Event type</span>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {eventTypes.map((ev) => (
                        <button
                          key={ev.id}
                          onClick={() => setEventType(ev.id)}
                          className={classNames(
                            'rounded-xl border px-3 py-3 text-sm font-medium transition-all',
                            eventType === ev.id ? 'border-spice-500 bg-spice-50 ring-2 ring-spice-500/20 text-forest-900' : 'border-earth-200 bg-white text-forest-800 hover:border-spice-300',
                          )}
                        >
                          {ev.name}
                        </button>
                      ))}
                    </div>
                    {errors.eventType && <p className="mt-1 text-xs text-hibiscus-600">{errors.eventType}</p>}
                  </div>
                  <div>
                    <label className="label label-required" htmlFor="chef-loc">Location</label>
                    <select id="chef-loc" className="input" value={location} onChange={(e) => setLocation(e.target.value)}>
                      <option value="">Select area...</option>
                      {deliveryZones.map((z) => <option key={z.id} value={z.id}>{z.name}</option>)}
                    </select>
                    {errors.location && <p className="mt-1 text-xs text-hibiscus-600">{errors.location}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Details */}
            {step === 4 && (
              <div className="card animate-fade-up p-6">
                <h2 className="font-display text-xl font-semibold text-forest-900">Additional details</h2>
                <div className="mt-5 space-y-4">
                  <div>
                    <label className="label" htmlFor="budget">Budget range (optional)</label>
                    <select id="budget" className="input" value={budget} onChange={(e) => setBudget(e.target.value)}>
                      <option value="">Select budget...</option>
                      <option value="0-200000">Under TZS 200,000</option>
                      <option value="200000-500000">TZS 200,000 – 500,000</option>
                      <option value="500000-1000000">TZS 500,000 – 1,000,000</option>
                      <option value="1000000+">Above TZS 1,000,000</option>
                    </select>
                  </div>
                  <div>
                    <label className="label" htmlFor="allergies">Allergies (optional)</label>
                    <input id="allergies" className="input" value={allergies} onChange={(e) => setAllergies(e.target.value)} placeholder="e.g. peanuts, dairy" />
                  </div>
                  <div>
                    <label className="label" htmlFor="dietary">Dietary requirements (optional)</label>
                    <input id="dietary" className="input" value={dietary} onChange={(e) => setDietary(e.target.value)} placeholder="e.g. vegetarian, halal" />
                  </div>
                  <div>
                    <label className="label" htmlFor="special">Special requests (optional)</label>
                    <textarea id="special" className="input min-h-24" value={specialRequests} onChange={(e) => setSpecialRequests(e.target.value)} placeholder="Any specific requirements..." />
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Customer info */}
            {step === 5 && (
              <div className="card animate-fade-up p-6">
                <h2 className="font-display text-xl font-semibold text-forest-900">Your details</h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="label label-required" htmlFor="c-name">Full name</label>
                    <input id="c-name" className="input" value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} placeholder="e.g. Juma Kessy" />
                    {errors.name && <p className="mt-1 text-xs text-hibiscus-600">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="label label-required" htmlFor="c-phone">Phone</label>
                    <input id="c-phone" className="input" value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} placeholder="+255 7XX XXX XXX" inputMode="tel" />
                    {errors.phone && <p className="mt-1 text-xs text-hibiscus-600">{errors.phone}</p>}
                  </div>
                  <div>
                    <label className="label" htmlFor="c-email">Email (optional)</label>
                    <input id="c-email" className="input" value={customer.email} onChange={(e) => setCustomer({ ...customer, email: e.target.value })} placeholder="you@example.com" inputMode="email" />
                    {errors.email && <p className="mt-1 text-xs text-hibiscus-600">{errors.email}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Nav */}
            <div className="mt-6 flex items-center justify-between">
              <button onClick={() => (step === 0 ? navigate('/services') : back())} className="btn-ghost btn-md">
                <ArrowLeft size={16} /> {step === 0 ? 'Back to services' : 'Back'}
              </button>
              {step < chefSteps.length - 1 ? (
                <button onClick={next} className="btn-accent btn-md">Continue <ArrowRight size={16} /></button>
              ) : (
                <button onClick={sendRequest} className="btn-whatsapp btn-lg">
                  <ChefHat size={18} /> Request Chef via WhatsApp
                </button>
              )}
            </div>
          </div>

          {/* Sticky estimate */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="card p-5">
              <h2 className="font-display text-base font-semibold text-forest-900">Request summary</h2>
              <dl className="mt-3 space-y-1.5 text-sm">
                <div className="flex justify-between"><dt className="text-earth-700">Chefs</dt><dd className="font-medium text-forest-900">{numberOfChefs}</dd></div>
                <div className="flex justify-between"><dt className="text-earth-700">Guests</dt><dd className="font-medium text-forest-900">{guests}</dd></div>
                <div className="flex justify-between"><dt className="text-earth-700">Cuisines</dt><dd className="text-right font-medium text-forest-900">{cuisines.length > 0 ? cuisines.map((c) => chefCuisines.find((x) => x.id === c)?.name).join(', ') : '—'}</dd></div>
                <div className="flex justify-between"><dt className="text-earth-700">Meal</dt><dd className="font-medium text-forest-900">{meal ? mealTypes.find((m) => m.id === meal)?.name : '—'}</dd></div>
                <div className="flex justify-between"><dt className="text-earth-700">Date</dt><dd className="font-medium text-forest-900">{date || '—'}</dd></div>
              </dl>
              <Divider className="my-3" />
              <div className="rounded-xl bg-spice-50 p-4">
                <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-spice-700">
                  <Info size={13} /> Estimated Cost
                </div>
                <p className="mt-1 font-display text-3xl font-semibold text-spice-600 animate-price-pulse" key={estimate}>{formatPrice(estimate)}</p>
                <p className="mt-1 text-xs text-earth-600">Final price confirmed by KF via WhatsApp.</p>
              </div>
            </div>
          </aside>
        </div>

        {/* Chef showcase */}
        {step === 0 && (
          <div className="mt-12">
            <h2 className="font-display text-xl font-semibold text-forest-900">Meet some of our chefs</h2>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {chefs.filter((c) => c.status === 'active').slice(0, 4).map((chef) => (
                <div key={chef.id} className="card overflow-hidden">
                  <img src={chef.photo} alt={chef.name} className="aspect-square w-full object-cover" />
                  <div className="p-3">
                    <p className="truncate text-sm font-semibold text-forest-900">{chef.name}</p>
                    <p className="truncate text-xs text-earth-600">{chef.speciality}</p>
                    <div className="mt-1.5 flex items-center gap-1 text-xs text-earth-500"><Stars rating={chef.rating} size={10} /> {chef.rating.toFixed(1)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
