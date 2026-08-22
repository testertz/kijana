import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, MessageCircle, ShoppingCart, Truck, User, ClipboardCheck } from 'lucide-react';
import { useRouter } from '@/state/Router';
import { useCart } from '@/state/CartContext';
import { useToast } from '@/state/ToastContext';
import { deliveryZones, deliveryTimeSlots } from '@/data/mockData';
import { calculateDeliveryFee } from '@/lib/pricing';
import { formatPrice, todayISO, generateId, classNames } from '@/lib/format';
import { validatePhone, validateEmail, validateRequired, validateDate, isFormValid } from '@/lib/validation';
import { generateProductOrderMessage, openWhatsApp } from '@/lib/whatsapp';
import type { Customer, DeliveryInfo, Order } from '@/types';
import { EmptyState } from '@/components/ui';
import Stepper from '@/components/ui/Stepper';

const steps = [
  { label: 'Cart', sub: 'Review items', icon: ShoppingCart },
  { label: 'Details', sub: 'Your information', icon: User },
  { label: 'Delivery', sub: 'Where & when', icon: Truck },
  { label: 'Review', sub: 'Confirm & send', icon: ClipboardCheck },
];

export default function CheckoutPage() {
  const { navigate } = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const { show } = useToast();
  const [step, setStep] = useState(1); // start at details (cart is step 0 conceptually)

  const [customer, setCustomer] = useState<Customer>({ name: '', phone: '', email: '' });
  const [delivery, setDelivery] = useState<DeliveryInfo>({
    method: 'delivery',
    zoneId: deliveryZones[0].id,
    address: '',
    date: todayISO(),
    time: deliveryTimeSlots[0],
    notes: '',
  });
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [lastOrder, setLastOrder] = useState<Order | null>(null);

  const deliveryFee = useMemo(
    () => calculateDeliveryFee(delivery.method, delivery.zoneId),
    [delivery.method, delivery.zoneId],
  );
  const total = subtotal + deliveryFee;

  if (items.length === 0 && !lastOrder) {
    return (
      <div className="pt-16 sm:pt-20">
        <div className="container-px py-16">
          <EmptyState
            icon={<ShoppingCart size={40} />}
            title="Your cart is empty"
            description="Add some products before checking out."
            action={<button onClick={() => navigate('/shop')} className="btn-accent btn-md">Shop products</button>}
          />
        </div>
      </div>
    );
  }

  const validateDetails = () => {
    const e: Record<string, string | null> = {
      name: validateRequired(customer.name, 'Full name'),
      phone: validatePhone(customer.phone),
      email: validateEmail(customer.email),
    };
    setErrors(e);
    return isFormValid(e);
  };

  const validateDelivery = () => {
    const e: Record<string, string | null> = {};
    if (delivery.method === 'delivery') {
      e.zoneId = validateRequired(delivery.zoneId ?? '', 'Delivery zone');
      e.address = validateRequired(delivery.address, 'Address');
    }
    e.date = validateDate(delivery.date);
    e.time = validateRequired(delivery.time, 'Delivery time');
    setErrors(e);
    return isFormValid(e);
  };

  const next = () => {
    if (step === 1 && !validateDetails()) { show('Please fix the errors below', 'error'); return; }
    if (step === 2 && !validateDelivery()) { show('Please fix the errors below', 'error'); return; }
    setStep((s) => Math.min(3, s + 1));
  };
  const back = () => setStep((s) => Math.max(0, s - 1));

  const sendOrder = () => {
    if (!validateDetails() || !validateDelivery()) { show('Please complete all required fields', 'error'); return; }
    const order: Order = {
      id: generateId('ORD'),
      items,
      customer,
      delivery,
      subtotal,
      deliveryFee,
      total,
      createdAt: new Date().toISOString(),
      status: 'New',
      whatsappStatus: 'sent',
    };
    setLastOrder(order);
    const msg = generateProductOrderMessage({ customer, items, delivery, subtotal, deliveryFee, total, notes: delivery.notes });
    openWhatsApp(msg);
    clearCart();
    navigate('/order/success');
  };

  return (
    <div className="pt-16 sm:pt-20">
      <div className="container-px py-6">
        <button onClick={() => navigate('/cart')} className="btn-ghost btn-sm -ml-2">
          <ArrowLeft size={16} /> Back to cart
        </button>
        <h1 className="mt-4 font-display text-3xl font-semibold text-forest-900 sm:text-4xl">Checkout</h1>
      </div>

      <div className="container-px pb-24">
        <div className="mb-8">
          <Stepper steps={steps} current={step} onStepClick={(i) => { if (i < step) setStep(i); }} />
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          <div>
            {/* Step 1: Details */}
            {step === 1 && (
              <div className="card animate-fade-up p-6">
                <h2 className="font-display text-xl font-semibold text-forest-900">Your details</h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="label label-required" htmlFor="name">Full name</label>
                    <input id="name" className="input" value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} placeholder="e.g. Amina Mohamed" />
                    {errors.name && <p className="mt-1 text-xs text-hibiscus-600">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="label label-required" htmlFor="phone">Phone</label>
                    <input id="phone" className="input" value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} placeholder="+255 7XX XXX XXX" inputMode="tel" />
                    {errors.phone && <p className="mt-1 text-xs text-hibiscus-600">{errors.phone}</p>}
                  </div>
                  <div>
                    <label className="label" htmlFor="email">Email (optional)</label>
                    <input id="email" className="input" value={customer.email} onChange={(e) => setCustomer({ ...customer, email: e.target.value })} placeholder="you@example.com" inputMode="email" />
                    {errors.email && <p className="mt-1 text-xs text-hibiscus-600">{errors.email}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Delivery */}
            {step === 2 && (
              <div className="card animate-fade-up p-6">
                <h2 className="font-display text-xl font-semibold text-forest-900">Delivery information</h2>
                {/* Method */}
                <div className="mt-5 grid grid-cols-2 gap-3">
                  {([['delivery', 'Home Delivery', Truck], ['pickup', 'Pickup', ShoppingCart]] as const).map(([m, label, Icon]) => (
                    <button
                      key={m}
                      onClick={() => setDelivery({ ...delivery, method: m })}
                      className={classNames(
                        'flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all',
                        delivery.method === m ? 'border-spice-500 bg-spice-50 ring-2 ring-spice-500/20' : 'border-earth-200 bg-white hover:border-spice-300',
                      )}
                    >
                      <Icon size={18} className="text-spice-600" />
                      <span className="text-sm font-semibold text-forest-900">{label}</span>
                    </button>
                  ))}
                </div>

                {delivery.method === 'delivery' && (
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="label label-required" htmlFor="zone">Delivery zone</label>
                      <select id="zone" className="input" value={delivery.zoneId ?? ''} onChange={(e) => setDelivery({ ...delivery, zoneId: e.target.value })}>
                        {deliveryZones.map((z) => <option key={z.id} value={z.id}>{z.name} — {formatPrice(z.fee)}</option>)}
                      </select>
                      {errors.zoneId && <p className="mt-1 text-xs text-hibiscus-600">{errors.zoneId}</p>}
                    </div>
                    <div className="sm:col-span-2">
                      <label className="label label-required" htmlFor="address">Address</label>
                      <input id="address" className="input" value={delivery.address} onChange={(e) => setDelivery({ ...delivery, address: e.target.value })} placeholder="House number, street, area" />
                      {errors.address && <p className="mt-1 text-xs text-hibiscus-600">{errors.address}</p>}
                    </div>
                  </div>
                )}

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="label label-required" htmlFor="date">Delivery date</label>
                    <input id="date" type="date" className="input" min={todayISO()} value={delivery.date} onChange={(e) => setDelivery({ ...delivery, date: e.target.value })} />
                    {errors.date && <p className="mt-1 text-xs text-hibiscus-600">{errors.date}</p>}
                  </div>
                  <div>
                    <label className="label label-required" htmlFor="time">Delivery time</label>
                    <select id="time" className="input" value={delivery.time} onChange={(e) => setDelivery({ ...delivery, time: e.target.value })}>
                      {deliveryTimeSlots.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                    {errors.time && <p className="mt-1 text-xs text-hibiscus-600">{errors.time}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="label" htmlFor="notes">Notes (optional)</label>
                    <textarea id="notes" className="input min-h-20" value={delivery.notes} onChange={(e) => setDelivery({ ...delivery, notes: e.target.value })} placeholder="Landmark, delivery instructions..." />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="card animate-fade-up p-6">
                  <h2 className="font-display text-xl font-semibold text-forest-900">Review your order</h2>

                  <div className="mt-5">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-earth-500">Customer</h3>
                    <p className="mt-1 text-sm text-forest-900">{customer.name} · {customer.phone}{customer.email ? ` · ${customer.email}` : ''}</p>
                  </div>

                  <div className="mt-4">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-earth-500">Delivery</h3>
                    <p className="mt-1 text-sm text-forest-900">
                      {delivery.method === 'delivery' ? 'Home Delivery' : 'Pickup'}
                      {delivery.method === 'delivery' && delivery.zoneId && ` · ${deliveryZones.find((z) => z.id === delivery.zoneId)?.name} · ${delivery.address}`}
                      {' · '}{delivery.date} · {delivery.time}
                    </p>
                  </div>

                  <hr className="my-5 border-earth-200" />

                  <h3 className="text-xs font-semibold uppercase tracking-wider text-earth-500">Products</h3>
                  <ul className="mt-2 space-y-3">
                    {items.map((item) => (
                      <li key={item.id} className="flex gap-3">
                        <img src={item.image} alt={item.name} className="h-14 w-14 rounded-lg object-cover" />
                        <div className="flex-1 text-sm">
                          <p className="font-semibold text-forest-900">{item.name}</p>
                          <p className="text-xs text-earth-600">{item.sizeLabel} · Qty {item.quantity}</p>
                          {item.selections.length > 0 && (
                            <p className="text-xs text-earth-600">{item.selections.map((s) => `${s.groupName}: ${s.optionLabels.join(', ')}`).join(' | ')}</p>
                          )}
                        </div>
                        <p className="text-sm font-semibold text-forest-900">{formatPrice(item.total)}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Nav buttons */}
            <div className="mt-6 flex items-center justify-between">
              <button onClick={back} disabled={step === 0} className="btn-ghost btn-md">
                <ArrowLeft size={16} /> Back
              </button>
              {step < 3 ? (
                <button onClick={next} className="btn-accent btn-md">
                  Continue <ArrowRight size={16} />
                </button>
              ) : (
                <button onClick={sendOrder} className="btn-whatsapp btn-lg">
                  <MessageCircle size={18} /> Order via WhatsApp
                </button>
              )}
            </div>
          </div>

          {/* Summary sidebar */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="card p-5">
              <h2 className="font-display text-base font-semibold text-forest-900">Summary</h2>
              <ul className="mt-3 space-y-2 text-sm">
                {items.map((i) => (
                  <li key={i.id} className="flex justify-between gap-2">
                    <span className="text-earth-700">{i.name} × {i.quantity}</span>
                    <span className="font-medium text-forest-900">{formatPrice(i.total)}</span>
                  </li>
                ))}
              </ul>
              <hr className="my-3 border-earth-200" />
              <dl className="space-y-1.5 text-sm">
                <div className="flex justify-between"><dt className="text-earth-700">Subtotal</dt><dd className="font-medium text-forest-900">{formatPrice(subtotal)}</dd></div>
                <div className="flex justify-between"><dt className="text-earth-700">Delivery</dt><dd className="font-medium text-forest-900">{formatPrice(deliveryFee)}</dd></div>
                <div className="flex justify-between border-t border-earth-200 pt-2">
                  <dt className="font-display font-semibold text-forest-900">Total</dt>
                  <dd className="font-display text-xl font-semibold text-spice-600">{formatPrice(total)}</dd>
                </div>
              </dl>
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-forest-50 p-3 text-xs text-forest-700">
                <Check size={14} className="text-forest-600" /> No payment online — you will confirm with KF via WhatsApp.
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
