import { ArrowLeft, ArrowRight, Minus, Plus, ShoppingBag, Trash2, Truck } from 'lucide-react';
import { useRouter } from '@/state/Router';
import { useCart } from '@/state/CartContext';
import { formatPrice } from '@/lib/format';
import { EmptyState } from '@/components/ui';

export default function CartPage() {
  const { navigate } = useRouter();
  const { items, subtotal, updateQuantity, removeItem, clearCart } = useCart();

  if (items.length === 0) {
  return (
      <div className="pt-16 sm:pt-20">
        <div className="container-px py-16">
          <EmptyState
            icon={<ShoppingBag size={40} />}
            title="Your cart is empty"
            description="Browse our spices, hibiscus blends and gift packs to get started."
            action={<button onClick={() => navigate('/shop')} className="btn-accent btn-md">Shop products</button>}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 sm:pt-20">
      <div className="container-px py-6">
        <button onClick={() => navigate('/shop')} className="btn-ghost btn-sm -ml-2">
          <ArrowLeft size={16} /> Continue shopping
        </button>
        <h1 className="mt-4 font-display text-3xl font-semibold text-forest-900 sm:text-4xl">Your Cart</h1>
        <p className="mt-1 text-sm text-earth-600">{items.length} item{items.length !== 1 ? 's' : ''}</p>
      </div>

      <div className="container-px grid gap-8 pb-24 lg:grid-cols-[1fr_360px]">
        {/* Items */}
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="card flex gap-4 p-4">
              <img src={item.image} alt={item.name} className="h-24 w-24 shrink-0 rounded-xl object-cover" />
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-display text-base font-semibold text-forest-900">{item.name}</h3>
                    <p className="text-xs text-earth-600">Size: {item.sizeLabel}</p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="rounded-lg p-1.5 text-earth-400 transition-colors hover:bg-hibiscus-50 hover:text-hibiscus-600"
                    aria-label={`Remove ${item.name}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                {item.selections.length > 0 && (
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {item.selections.map((s) => (
                      <span key={s.groupId} className="chip bg-forest-50 text-forest-700">
                        {s.groupName}: {s.optionLabels.join(', ')}
                      </span>
                    ))}
                  </div>
                )}
                <div className="mt-auto flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="flex h-8 w-8 items-center justify-center rounded-full border border-earth-200 text-forest-700 hover:bg-forest-50" aria-label="Decrease"><Minus size={14} /></button>
                    <span className="w-6 text-center text-sm font-semibold">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="flex h-8 w-8 items-center justify-center rounded-full border border-earth-200 text-forest-700 hover:bg-forest-50" aria-label="Increase"><Plus size={14} /></button>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-earth-500">{formatPrice(item.unitPrice)} each</p>
                    <p className="font-display text-lg font-semibold text-forest-900">{formatPrice(item.total)}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <button onClick={clearCart} className="btn-ghost btn-sm text-hibiscus-600 hover:bg-hibiscus-50">Clear cart</button>
        </div>

        {/* Summary */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="card p-5">
            <h2 className="font-display text-lg font-semibold text-forest-900">Order summary</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between"><dt className="text-earth-700">Subtotal</dt><dd className="font-medium text-forest-900">{formatPrice(subtotal)}</dd></div>
              <div className="flex justify-between text-earth-600"><dt className="flex items-center gap-1.5"><Truck size={14} /> Delivery</dt><dd>Calculated at checkout</dd></div>
              <div className="flex justify-between border-t border-earth-200 pt-3">
                <dt className="font-display text-base font-semibold text-forest-900">Total</dt>
                <dd className="font-display text-xl font-semibold text-spice-600">{formatPrice(subtotal)}</dd>
              </div>
            </dl>
            <button onClick={() => navigate('/checkout')} className="btn-accent btn-lg mt-5 w-full">
              Checkout <ArrowRight size={18} />
            </button>
            <p className="mt-3 text-center text-xs text-earth-500">No online payment — order via WhatsApp.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
