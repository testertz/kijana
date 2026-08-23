import { ShoppingCart, SlidersHorizontal } from 'lucide-react';
import type { Product } from '@/types';
import { useRouter } from '@/state/Router';
import { useCart } from '@/state/CartContext';
import { useToast } from '@/state/ToastContext';
import { formatPrice } from '@/lib/format';
import { Badge, Stars, Reveal } from '@/components/ui';

export default function ProductCard({ product }: { product: Product }) {
  const { navigate } = useRouter();
  const { addItem } = useCart();
  const { show } = useToast();

  const customizable = product.customizationGroups.length > 0;
  const minPrice = Math.min(...product.sizes.map((s) => s.price));

  const quickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const size = product.sizes[0];
    const unitPrice = size.price;
    addItem({
      productId: product.id,
      name: product.name,
      image: product.image,
      sizeId: size.id,
      sizeLabel: size.label,
      quantity: 1,
      selections: [],
      unitPrice,
    });
    show(`${product.name} added to cart`, 'success');
  };

  return (
    <Reveal as="article" direction="up" className="group card flex cursor-pointer flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
      <div className="relative aspect-square overflow-hidden bg-cream-100">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {product.featured && <Badge variant="spice">Featured</Badge>}
          {customizable && <Badge variant="forest">Customizable</Badge>}
        </div>
        {!product.available && (
          <div className="absolute inset-0 flex items-center justify-center bg-forest-950/60">
            <span className="rounded-full bg-cream-50 px-4 py-1.5 text-sm font-semibold text-forest-900">Out of stock</span>
          </div>
        )}
      </div>

      <div onClick={() => navigate(`/product/${product.id}`)} className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-base font-semibold leading-tight text-forest-900">{product.name}</h3>
          <Stars rating={product.rating} size={12} />
        </div>
        <p className="mt-1.5 line-clamp-2 text-sm text-earth-600">{product.shortDescription}</p>

        <div className="mt-3 flex items-end justify-between">
          <div>
            <span className="block text-xs text-earth-500">From</span>
            <span className="font-display text-lg font-semibold text-forest-900">{formatPrice(minPrice)}</span>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); navigate(`/product/${product.id}`); }}
            className={customizable ? 'btn-accent btn-sm flex-1' : 'btn-outline btn-sm flex-1'}
          >
            <SlidersHorizontal size={14} />
            {customizable ? 'Customize' : 'Details'}
          </button>
          <button
            onClick={quickAdd}
            disabled={!product.available}
            className="btn-primary btn-sm"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCart size={14} />
          </button>
        </div>
      </div>
    </Reveal>
  );
}
