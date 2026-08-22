import { ChevronRight, Leaf, UtensilsCrossed, ChefHat, HeartHandshake, Truck, ShieldCheck, Sprout } from 'lucide-react';
import { useRouter } from '@/state/Router';
import { useCart } from '@/state/CartContext';
import { products, diningExperiences, testimonials, impactStats, chefs } from '@/data/mockData';
import ProductCard from '@/components/shop/ProductCard';
import { Badge, Stars } from '@/components/ui';
import { useCountUp, useInView } from '@/lib/hooks';
import { formatPrice } from '@/lib/format';
import { siteConfig } from '@/config/site';

const heroImage = 'https://images.pexels.com/photos/34143557/pexels-photo-34143557.jpeg?auto=compress&cs=tinysrgb&h=900&w=1400';

export default function HomePage() {
  const { navigate } = useRouter();
  const featured = products.filter((p) => p.featured).slice(0, 4);
  const topExperiences = diningExperiences.slice(0, 3);

  return (
    <div className="pt-16 sm:pt-20">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Tanzanian spices" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-950/85 via-forest-950/60 to-forest-950/20" />
        </div>
        <div className="container-px relative flex min-h-[88vh] flex-col justify-end pb-12 pt-24 sm:min-h-[92vh] sm:pb-20">
          <div className="max-w-2xl">
            <span className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-cream-100/20 bg-cream-50/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-cream-100 backdrop-blur-sm">
              <Leaf size={13} /> Farm to Table · Tanzania
            </span>
            <h1 className="animate-fade-up mt-5 font-display text-4xl font-semibold leading-[1.05] text-cream-50 text-balance sm:text-6xl lg:text-7xl" style={{ animationDelay: '80ms' }}>
              Asili ya Afya.<br />Asili ya Tanzania.
            </h1>
            <p className="animate-fade-up mt-5 max-w-xl text-base leading-relaxed text-cream-100/90 sm:text-lg" style={{ animationDelay: '160ms' }}>
              Kijana Factory connects Tanzanian farmers, food products, dining experiences and chefs — bringing natural, healthy and authentic flavours from farm to your table.
            </p>
            <div className="animate-fade-up mt-8 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: '240ms' }}>
              <button onClick={() => navigate('/shop')} className="btn-accent btn-lg">
                NUNUA BIDHAA <ChevronRight size={18} />
              </button>
              <button onClick={() => navigate('/services')} className="btn-outline btn-lg border-cream-100/30 text-cream-50 hover:bg-cream-50/10 hover:border-cream-100/50">
                EXPLORE EXPERIENCES
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Value strip */}
      <section className="border-b border-earth-200/60 bg-cream-100">
        <div className="container-px grid grid-cols-2 gap-px overflow-hidden md:grid-cols-4">
          {[
            { icon: Sprout, title: 'Natural & Healthy', sub: 'From Tanzanian farms' },
            { icon: ShieldCheck, title: 'Authentic', sub: 'Hand-crafted blends' },
            { icon: Truck, title: 'Fresh Delivery', sub: 'Across Dar es Salaam' },
            { icon: HeartHandshake, title: 'Community Impact', sub: 'Farmers & youth' },
          ].map((v) => (
            <div key={v.title} className="flex items-center gap-3 bg-cream-100 px-4 py-5">
              <v.icon className="h-6 w-6 shrink-0 text-spice-600" />
              <div>
                <p className="text-sm font-semibold text-forest-900">{v.title}</p>
                <p className="text-xs text-earth-600">{v.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="container-px py-16 sm:py-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Bidhaa Zinazopendwa</p>
            <h2 className="section-title mt-2">Featured Products</h2>
          </div>
          <button onClick={() => navigate('/shop')} className="btn-ghost btn-sm hidden sm:inline-flex">
            View all <ChevronRight size={16} />
          </button>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
        <div className="mt-8 text-center sm:hidden">
          <button onClick={() => navigate('/shop')} className="btn-outline btn-md">View all products</button>
        </div>
      </section>

      {/* Customize your taste */}
      <section className="bg-forest-900 py-16 text-cream-50 sm:py-24">
        <div className="container-px grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-spice-400">Customize Your Taste</p>
            <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">Make every blend yours</h2>
            <p className="mt-4 max-w-lg text-cream-200/85">
              Choose your size, heat level and extra ingredients — the price updates instantly. Build the exact flavour you love.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-cream-200/90">
              {['Adjustable heat levels', 'Extra ingredients with live pricing', 'Sizes from 250g to 5kg', 'Saved as unique cart items'].map((f) => (
                <li key={f} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-spice-600 text-xs">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <button onClick={() => navigate('/product/hibiscus-pepper')} className="btn-accent btn-lg mt-8">
              Try it now <ChevronRight size={18} />
            </button>
          </div>
          <div className="relative">
            <img src="https://images.pexels.com/photos/6671884/pexels-photo-6671884.png?auto=compress&cs=tinysrgb&h=650&w=940" alt="Hibiscus" className="aspect-[4/3] w-full rounded-3xl object-cover shadow-lift" />
            <div className="absolute -bottom-5 -left-3 rounded-2xl bg-cream-50 p-4 shadow-card sm:-left-6">
              <p className="text-xs text-earth-500">From</p>
              <p className="font-display text-2xl font-semibold text-forest-900">TZS 12,000</p>
              <p className="text-xs text-spice-600">+ customizations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Dining experiences */}
      <section className="container-px py-16 sm:py-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Dining Experiences</p>
            <h2 className="section-title mt-2">Unforgettable Tanzanian tables</h2>
          </div>
          <button onClick={() => navigate('/services')} className="btn-ghost btn-sm hidden sm:inline-flex">
            Explore all <ChevronRight size={16} />
          </button>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {topExperiences.map((exp) => (
            <button
              key={exp.id}
              onClick={() => navigate(`/experience/${exp.id}`)}
              className="group relative overflow-hidden rounded-3xl text-left shadow-card transition-all hover:shadow-lift"
            >
              <img src={exp.images[0]} alt={exp.name} className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-950/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-cream-50">
                <div className="flex items-center gap-2 text-xs text-cream-200/80">
                  <Stars rating={exp.rating} size={12} /> · {exp.duration}
                </div>
                <h3 className="mt-1.5 font-display text-xl font-semibold">{exp.name}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-cream-200/85">{exp.shortDescription}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-cream-200/70">From <span className="font-semibold text-cream-50">{formatPrice(exp.basePrice)}</span></span>
                  <span className="chip bg-spice-600 text-cream-50">Customize &amp; Book</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Hire a chef */}
      <section className="bg-cream-100 py-16 sm:py-20">
        <div className="container-px grid items-center gap-10 lg:grid-cols-2">
          <div className="relative order-2 lg:order-1">
            <img src={chefs[0].photo} alt="KF Chef" className="aspect-[4/5] w-full rounded-3xl object-cover shadow-lift" />
            <div className="absolute -bottom-5 -right-3 rounded-2xl bg-forest-700 p-4 text-cream-50 shadow-card sm:-right-6">
              <p className="font-display text-lg font-semibold">{chefs.length}+ Chefs</p>
              <p className="text-xs text-cream-200/85">Across Tanzania</p>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <p className="eyebrow">KF Chef</p>
            <h2 className="section-title mt-2">Hire a chef for any occasion</h2>
            <p className="mt-4 max-w-lg text-earth-700">
              Weddings, corporate dinners, birthdays or intimate meals at home. Tell us your needs and we will match you with the right chef.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {['Tanzanian', 'Swahili', 'Indian', 'BBQ', 'Seafood', 'Vegetarian'].map((c) => (
                <Badge key={c} variant="cream">{c}</Badge>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button onClick={() => navigate('/chef')} className="btn-accent btn-lg">Request a Chef</button>
              <button onClick={() => navigate('/chef/apply')} className="btn-outline btn-lg">Become a KF Chef</button>
            </div>
          </div>
        </div>
      </section>

      {/* Impact stats */}
      <section className="container-px py-16 sm:py-20">
        <ImpactStats />
      </section>

      {/* Why KF */}
      <section className="bg-forest-50 py-16 sm:py-20">
        <div className="container-px">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Why Kijana Factory</p>
            <h2 className="section-title mt-2">More than a food brand</h2>
            <p className="mt-4 text-earth-700">We connect farmers, youth, chefs and customers into one ecosystem rooted in Tanzanian soil.</p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Sprout, title: 'From our farms', text: 'Ingredients grown by Tanzanian farmers we know by name.' },
              { icon: UtensilsCrossed, title: 'Crafted in our factory', text: 'Small-batch blending for consistent, premium quality.' },
              { icon: ChefHat, title: 'Chefs you can trust', text: 'A roster of vetted chefs for every cuisine and occasion.' },
              { icon: HeartHandshake, title: 'Community first', text: 'Every purchase supports farmers, schools and youth.' },
              { icon: ShieldCheck, title: 'Transparent pricing', text: 'See your price update live — no surprises at checkout.' },
              { icon: Truck, title: 'Reliable delivery', text: 'Flexible delivery and pickup across Dar es Salaam.' },
            ].map((f) => (
              <div key={f.title} className="card p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-spice-100 text-spice-700">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-forest-900">{f.title}</h3>
                <p className="mt-1.5 text-sm text-earth-600">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container-px py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Wanasema</p>
          <h2 className="section-title mt-2">What our community says</h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t) => (
            <figure key={t.id} className="card flex flex-col p-6">
              <Stars rating={t.rating} />
              <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-earth-700">“{t.text}”</blockquote>
              <figcaption className="mt-4">
                <p className="font-semibold text-forest-900">{t.author}</p>
                <p className="text-xs text-earth-500">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="container-px pb-20">
        <div className="overflow-hidden rounded-3xl bg-spice-600 px-6 py-12 text-center text-cream-50 sm:px-12 sm:py-16">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">Ready to taste Tanzania?</h2>
          <p className="mx-auto mt-3 max-w-xl text-cream-100/90">
            Order products, book a dining experience or request a chef — all through WhatsApp.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <button onClick={() => navigate('/shop')} className="btn btn-lg bg-cream-50 text-spice-700 hover:bg-cream-100">Shop now</button>
            <button onClick={() => navigate('/services')} className="btn-outline btn-lg border-cream-50/40 text-cream-50 hover:bg-cream-50/10">Explore services</button>
          </div>
        </div>
      </section>
    </div>
  );
}

function ImpactStats() {
  const { navigate } = useRouter();
  const [ref, inView] = useInView<HTMLDivElement>();

  return (
    <div ref={ref}>
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">Tunabadili Tanzania</p>
        <h2 className="section-title mt-2">Our growing impact</h2>
        <p className="mt-4 text-earth-700">Every product and booking supports Tanzanian farmers, schools and communities.</p>
      </div>
      <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {impactStats.map((s) => (
          <StatCard key={s.id} value={s.value} suffix={s.suffix} label={s.label} subLabel={s.subLabel} start={inView} />
        ))}
      </div>
      <div className="mt-10 text-center">
        <button onClick={() => navigate('/impact')} className="btn-primary btn-lg">Read our story <ChevronRight size={18} /></button>
      </div>
    </div>
  );
}

function StatCard({ value, suffix, label, subLabel, start }: { value: number; suffix: string; label: string; subLabel: string; start: boolean }) {
  const v = useCountUp(value, 1600, start);
  return (
    <div className="card p-6 text-center">
      <p className="font-display text-3xl font-semibold text-spice-600 sm:text-4xl">
        {v.toLocaleString('en-US')}
        <span className="text-spice-500">{suffix}</span>
      </p>
      <p className="mt-1 font-semibold text-forest-900">{label}</p>
      <p className="text-xs text-earth-500">{subLabel}</p>
    </div>
  );
}
