import { useMemo, useState } from 'react';
import { ArrowLeft, Check, Minus, Plus, ShoppingCart, SlidersHorizontal, Info } from 'lucide-react';
import type { Product, CustomizationGroup } from '@/types';
import { products } from '@/data/mockData';
import { useRouter } from '@/state/Router';
import { useCart } from '@/state/CartContext';
import { useToast } from '@/state/ToastContext';
import { calculateProductUnitPrice } from '@/lib/pricing';
import { formatPrice, classNames } from '@/lib/format';
import { Badge, Stars, Divider } from '@/components/ui';
import QuantityControl from '@/components/ui/QuantityControl';

export default function ProductDetailsPage({ productId }: { productId: string }) {
  const { navigate } = useRouter();
  const { addItem } = useCart();
  const { show } = useToast();

  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="container-px pt-32 pb-20 text-center">
        <p className="font-display text-2xl font-semibold text-forest-900">Product not found</p>
        <button onClick={() => navigate('/shop')} className="btn-primary btn-md mt-6">Back to shop</button>
      </div>
    );
  }

  return <ProductDetailsContent product={product} onAddToCart={addItem} onAdded={() => show(`${product.name} added to cart`, 'success')} />;
}

function ProductDetailsContent({ product, onAddToCart, onAdded }: { product: Product; onAddToCart: ReturnType<typeof useCart>['addItem']; onAdded: () => void }) {
  const { navigate } = useRouter();
  const [sizeId, setSizeId] = useState(product.sizes[0]?.id ?? '');
  const [quantity, setQuantity] = useState(1);
  const [selections, setSelections] = useState<Record<string, string[]>>(() => {
    // pre-select first option of required single-choice groups
    const init: Record<string, string[]> = {};
    for (const g of product.customizationGroups) {
      if (g.required && g.type === 'single') init[g.id] = [g.options[0]?.id];
    }
    return init;
  });

  const size = product.sizes.find((s) => s.id === sizeId);
  const unitPrice = useMemo(() => calculateProductUnitPrice(product, size, selections), [product, size, selections]);
  const total = unitPrice * quantity;

  const setSingle = (groupId: string, optionId: string) =>
    setSelections((p) => ({ ...p, [groupId]: [optionId] }));

  const toggleMulti = (groupId: string, optionId: string) =>
    setSelections((p) => {
      const cur = p[groupId] ?? [];
      return { ...p, [groupId]: cur.includes(optionId) ? cur.filter((o) => o !== optionId) : [...cur, optionId] };
    });

  const addToCart = () => {
    const sel = product.customizationGroups.map((g) => ({
      groupId: g.id,
      groupName: g.name,
      optionIds: selections[g.id] ?? [],
      optionLabels: (selections[g.id] ?? []).map((oid) => g.options.find((o) => o.id === oid)?.label ?? '').filter(Boolean),
    }));
    onAddToCart({
      productId: product.id,
      name: product.name,
      image: product.image,
      sizeId,
      sizeLabel: size?.label ?? '',
      quantity,
      selections: sel,
      unitPrice,
    });
    onAdded();
    navigate('/cart');
  };

  const requiredOk = product.customizationGroups.every((g) => !g.required || (selections[g.id]?.length ?? 0) > 0);

  return (
    <div className="pt-16 sm:pt-20">
      <div className="container-px py-6">
        <button onClick={() => navigate('/shop')} className="btn-ghost btn-sm -ml-2">
          <ArrowLeft size={16} /> Back to shop
        </button>
      </div>

      <div className="container-px grid gap-8 pb-20 lg:grid-cols-2 lg:gap-12">
        {/* Image */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="overflow-hidden rounded-3xl shadow-card">
            <img src={product.image} alt={product.name} className="aspect-square w-full object-cover" />
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.tags?.map((t) => <Badge key={t} variant="spice">{t}</Badge>)}
          </div>
        </div>

        {/* Details */}
        <div>
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm text-earth-600">
              <Stars rating={product.rating} size={14} /> <span>{product.rating.toFixed(1)}</span>
            </div>
            {product.customizationGroups.length > 0 && (
              <Badge variant="forest"><SlidersHorizontal size={12} /> Customizable</Badge>
            )}
          </div>
          <h1 className="mt-2 font-display text-3xl font-semibold text-forest-900 sm:text-4xl">{product.name}</h1>
          <p className="mt-3 text-earth-700">{product.description}</p>

          <Divider className="my-6" />

          {/* Ingredients */}
          <div>
            <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-forest-900">Ingredients</h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.ingredients.map((ing) => <Badge key={ing} variant="cream">{ing}</Badge>)}
            </div>
          </div>

          {/* Size */}
          <div className="mt-7">
            <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-forest-900">Size</h2>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {product.sizes.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSizeId(s.id)}
                  className={classNames(
                    'rounded-xl border px-3 py-3 text-center transition-all',
                    sizeId === s.id
                      ? 'border-spice-500 bg-spice-50 ring-2 ring-spice-500/20'
                      : 'border-earth-200 bg-white hover:border-spice-300',
                  )}
                >
                  <span className="block text-sm font-semibold text-forest-900">{s.label}</span>
                  <span className="block text-xs text-earth-600">{formatPrice(s.price)}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Customization groups */}
          {product.customizationGroups.map((group) => (
            <CustomizationGroupView
              key={group.id}
              group={group}
              selected={selections[group.id] ?? []}
              onSingle={(oid) => setSingle(group.id, oid)}
              onMulti={(oid) => toggleMulti(group.id, oid)}
            />
          ))}

          {/* Quantity */}
          <div className="mt-7 flex items-center justify-between">
            <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-forest-900">Quantity</h2>
            <QuantityControl value={quantity} onChange={setQuantity} min={1} max={99} />
          </div>

          {/* Price breakdown */}
          <div className="mt-8 rounded-2xl bg-forest-50 p-5">
            <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-forest-700">Price breakdown</h2>
            <dl className="mt-3 space-y-1.5 text-sm">
              <div className="flex justify-between"><dt className="text-earth-700">Base ({size?.label})</dt><dd className="font-medium text-forest-900">{formatPrice(size?.price ?? 0)}</dd></div>
              {product.customizationGroups.map((g) =>
                (selections[g.id] ?? []).map((oid) => {
                  const opt = g.options.find((o) => o.id === oid);
                  if (!opt || opt.price === 0) return null;
                  return (
                    <div key={`${g.id}-${oid}`} className="flex justify-between">
                      <dt className="text-earth-700">{opt.label}</dt>
                      <dd className="font-medium text-forest-900">+ {formatPrice(opt.price)}</dd>
                    </div>
                  );
                }),
              )}
              <div className="flex justify-between border-t border-forest-200 pt-2 text-earth-700"><dt>Unit price</dt><dd className="font-medium text-forest-900">{formatPrice(unitPrice)}</dd></div>
              <div className="flex justify-between"><dt className="text-earth-700">Quantity</dt><dd className="font-medium text-forest-900">× {quantity}</dd></div>
              <div className="flex items-center justify-between border-t border-forest-300 pt-3">
                <dt className="font-display text-base font-semibold text-forest-900">Total</dt>
                <dd className="font-display text-2xl font-semibold text-spice-600 animate-price-pulse" key={total}>{formatPrice(total)}</dd>
              </div>
            </dl>
          </div>

          {/* CTA */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button onClick={addToCart} disabled={!product.available || !requiredOk} className="btn-accent btn-lg flex-1">
              <ShoppingCart size={18} /> Add to cart · {formatPrice(total)}
            </button>
          </div>
          {!requiredOk && (
            <p className="mt-2 flex items-center gap-1.5 text-xs text-hibiscus-600">
              <Info size={13} /> Please complete all required customization options.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function CustomizationGroupView({
  group,
  selected,
  onSingle,
  onMulti,
}: {
  group: CustomizationGroup;
  selected: string[];
  onSingle: (oid: string) => void;
  onMulti: (oid: string) => void;
}) {
  return (
    <div className="mt-7">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-forest-900">
          {group.name}{group.required && <span className="text-hibiscus-600"> *</span>}
        </h2>
        <span className="text-xs text-earth-500">{group.type === 'single' ? 'Choose one' : 'Choose any'}</span>
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {group.options.map((opt) => {
          const isSelected = selected.includes(opt.id);
          return (
            <button
              key={opt.id}
              onClick={() => (group.type === 'single' ? onSingle(opt.id) : onMulti(opt.id))}
              className={classNames(
                'flex items-center justify-between rounded-xl border px-4 py-3 text-left transition-all',
                isSelected
                  ? 'border-spice-500 bg-spice-50 ring-2 ring-spice-500/20'
                  : 'border-earth-200 bg-white hover:border-spice-300',
              )}
              aria-pressed={isSelected}
            >
              <span className="flex items-center gap-2.5">
                <span
                  className={classNames(
                    'flex h-5 w-5 items-center justify-center border transition-colors',
                    group.type === 'single' ? 'rounded-full' : 'rounded',
                    isSelected ? 'border-spice-600 bg-spice-600 text-cream-50' : 'border-earth-300 bg-white',
                  )}
                >
                  {isSelected && <Check size={12} />}
                </span>
                <span className="text-sm font-medium text-forest-900">{opt.label}</span>
              </span>
              <span className="text-sm text-earth-600">{opt.price === 0 ? 'Included' : `+ ${formatPrice(opt.price)}`}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
