import { useMemo, useState } from 'react';
import { Search, SlidersHorizontal, PackageSearch } from 'lucide-react';
import { products, categories } from '@/data/mockData';
import ProductCard from '@/components/shop/ProductCard';
import { EmptyState } from '@/components/ui';
import { useRouter } from '@/state/Router';
import { classNames } from '@/lib/format';

export default function ShopPage() {
  const { query } = useRouter();
  const initialCategory = query.get('category') ?? 'all';

  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [sort, setSort] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let list = products.filter((p) => p.available);
    if (activeCategory !== 'all') list = list.filter((p) => p.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.tags?.some((t) => t.toLowerCase().includes(q)),
      );
    }
    const minPrice = (p: (typeof products)[number]) => Math.min(...p.sizes.map((s) => s.price));
    switch (sort) {
      case 'price-low':
        list = [...list].sort((a, b) => minPrice(a) - minPrice(b));
        break;
      case 'price-high':
        list = [...list].sort((a, b) => minPrice(b) - minPrice(a));
        break;
      case 'rating':
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      default:
        list = [...list].sort((a, b) => Number(b.featured) - Number(a.featured));
    }
    return list;
  }, [activeCategory, search, sort]);

  return (
    <div className="pt-16 sm:pt-20">
      {/* Header */}
      <section className="bg-forest-700 py-12 text-cream-50 sm:py-16">
        <div className="container-px">
          <p className="eyebrow text-spice-300">Duka</p>
          <h1 className="mt-2 font-display text-4xl font-semibold sm:text-5xl">Shop KF Products</h1>
          <p className="mt-3 max-w-xl text-cream-200/85">
            Spices, hibiscus, moringa, herbs and gift packs — grown by Tanzanian farmers and crafted in our factory.
          </p>
        </div>
      </section>

      {/* Search + filters */}
      <section className="sticky top-16 z-30 border-b border-earth-200/70 bg-cream-50/90 backdrop-blur-md sm:top-20">
        <div className="container-px flex flex-col gap-3 py-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-earth-400" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="input pl-11"
              aria-label="Search products"
            />
          </div>
          <div className="flex items-center gap-2">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="input w-auto"
              aria-label="Sort products"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
            <button
              onClick={() => setShowFilters((s) => !s)}
              className="btn-outline btn-md lg:hidden"
              aria-expanded={showFilters}
            >
              <SlidersHorizontal size={16} /> Filters
            </button>
          </div>
        </div>
      </section>

      <section className="container-px py-8">
        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className={classNames('w-full shrink-0 lg:block lg:w-56', showFilters ? 'block' : 'hidden')}>
            <div className="lg:sticky lg:top-36">
              <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-forest-900">Categories</h2>
              <ul className="mt-3 space-y-1">
                <li>
                  <button
                    onClick={() => { setActiveCategory('all'); setShowFilters(false); }}
                    className={classNames(
                      'w-full rounded-lg px-3 py-2 text-left text-sm transition-colors',
                      activeCategory === 'all' ? 'bg-forest-700 text-cream-50' : 'text-forest-800 hover:bg-forest-50',
                    )}
                  >
                    All Products
                  </button>
                </li>
                {categories.map((c) => (
                  <li key={c.id}>
                    <button
                      onClick={() => { setActiveCategory(c.id); setShowFilters(false); }}
                      className={classNames(
                        'w-full rounded-lg px-3 py-2 text-left text-sm transition-colors',
                        activeCategory === c.id ? 'bg-forest-700 text-cream-50' : 'text-forest-800 hover:bg-forest-50',
                      )}
                    >
                      {c.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Grid */}
          <div className="flex-1">
            <p className="mb-4 text-sm text-earth-600">{filtered.length} product{filtered.length !== 1 ? 's' : ''}</p>
            {filtered.length === 0 ? (
              <EmptyState
                icon={<PackageSearch size={40} />}
                title="No products found"
                description="Try a different search or category."
                action={<button onClick={() => { setSearch(''); setActiveCategory('all'); }} className="btn-outline btn-md">Clear filters</button>}
              />
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
                {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
