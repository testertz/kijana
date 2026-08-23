import { ArrowRight, Sprout, Factory, GraduationCap, Users, HeartHandshake, Leaf, UtensilsCrossed, ChefHat, ShieldCheck, Target, Eye, Compass } from 'lucide-react';
import { useRouter } from '@/state/Router';
import { impactStats, testimonials, chefs } from '@/data/mockData';
import { useCountUp, useInView } from '@/lib/hooks';
import { Stars, Reveal } from '@/components/ui';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { WhatsAppIcon } from '@/components/layout/Header';

const heroImage = 'https://images.pexels.com/photos/13042951/pexels-photo-13042951.jpeg?auto=compress&cs=tinysrgb&h=900&w=1400';
const storyImage = 'https://images.pexels.com/photos/20371811/pexels-photo-20371811.jpeg?auto=compress&cs=tinysrgb&h=700&w=1000';
const craftImage = 'https://images.pexels.com/photos/34375935/pexels-photo-34375935.jpeg?auto=compress&cs=tinysrgb&h=700&w=1000';
const communityImage = 'https://images.pexels.com/photos/11350431/pexels-photo-11350431.jpeg?auto=compress&cs=tinysrgb&h=700&w=1000';
const kitchenImage = 'https://images.pexels.com/photos/12924182/pexels-photo-12924182.jpeg?auto=compress&cs=tinysrgb&h=700&w=1000';

export default function AboutPage() {
  const { navigate } = useRouter();

  const values = [
    { icon: Leaf, title: 'Natural', text: 'We use ingredients grown in Tanzanian soil — no artificial additives, no shortcuts.' },
    { icon: ShieldCheck, title: 'Authentic', text: 'Every blend honours traditional Tanzanian and Swahili flavour profiles.' },
    { icon: HeartHandshake, title: 'Community-First', text: 'Farmers, youth and women share in the value we create together.' },
    { icon: Sprout, title: 'Sustainable', text: 'We farm, blend and deliver with respect for the land and future generations.' },
    { icon: ChefHat, title: 'Premium Quality', text: 'Small-batch craftsmanship in everything from spice blends to dining experiences.' },
    { icon: Users, title: 'Empowering Youth', text: 'We create jobs, training and leadership paths for young Tanzanians.' },
  ];

  const pillars = [
    { icon: Sprout, title: 'Farming', text: 'We partner directly with smallholder farmers across Tanzania, paying fair prices and providing training on sustainable agriculture.' },
    { icon: Factory, title: 'Factory', text: 'Our Mikocheni facility blends, packages and quality-checks every product in small batches for consistent premium quality.' },
    { icon: UtensilsCrossed, title: 'Food Products', text: 'Spices, hibiscus, moringa, herbs and seasonings — all customizable to your taste and delivered fresh.' },
    { icon: ChefHat, title: 'Dining & Chefs', text: 'Curated dining experiences and a roster of vetted chefs for every cuisine and occasion.' },
    { icon: GraduationCap, title: 'Education', text: 'We partner with schools to teach nutrition, agriculture and entrepreneurship to young Tanzanians.' },
    { icon: HeartHandshake, title: 'Community', text: 'Every purchase reinvests in the communities that grow our ingredients, creating shared prosperity.' },
  ];

  const timeline = [
    { year: '2021', title: 'The Seed', text: 'Kijana Factory started with a simple idea: connect Tanzanian farmers directly to customers who value natural, healthy food.' },
    { year: '2022', title: 'First Harvest', text: 'We launched our first spice blends, partnering with 12 farmers in the Morogoro region and selling at local markets.' },
    { year: '2023', title: 'Growing Roots', text: 'Expanded to 30+ farmers, opened our Mikocheni blending facility, and introduced customizable products with live pricing.' },
    { year: '2024', title: 'Beyond Products', text: 'Launched dining experiences and chef booking services, creating a full farm-to-table ecosystem.' },
    { year: '2025', title: 'Changing Tanzania', text: 'Now supporting 50+ farmers, 10+ schools, and empowering women and youth across the country.' },
  ];

  return (
    <div className="pt-16 sm:pt-20">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Tanzanian farmer harvesting crops" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-950/90 via-forest-950/65 to-forest-950/25" />
        </div>
        <div className="container-px relative flex min-h-[70vh] flex-col justify-center py-20">
          <div className="max-w-2xl">
            <span className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-cream-100/20 bg-cream-50/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-cream-100 backdrop-blur-sm">
              <Leaf size={13} /> About Kijana Factory
            </span>
            <h1 className="animate-fade-up mt-5 font-display text-4xl font-semibold leading-[1.05] text-cream-50 text-balance sm:text-5xl lg:text-6xl" style={{ animationDelay: '80ms' }}>
              From Tanzanian soil<br />to your table
            </h1>
            <p className="animate-fade-up mt-5 max-w-xl text-base leading-relaxed text-cream-100/90 sm:text-lg" style={{ animationDelay: '160ms' }}>
              Kijana Factory is a Tanzanian food, agriculture and hospitality brand connecting farmers, chefs and communities — bringing natural, healthy and authentic flavours to every table.
            </p>
            <div className="animate-fade-up mt-8 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: '240ms' }}>
              <button onClick={() => navigate('/impact')} className="btn-accent btn-lg">
                See our impact <ArrowRight size={18} />
              </button>
              <button onClick={() => navigate('/shop')} className="btn-outline btn-lg border-cream-100/30 text-cream-50 hover:bg-cream-50/10 hover:border-cream-100/50">
                Explore products
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="container-px py-16 sm:py-20">
        <div className="grid gap-6 lg:grid-cols-3">
          {[
            { icon: Target, cls: 'bg-forest-100 text-forest-700', title: 'Our Mission', text: 'To connect Tanzanian farmers, food products, dining experiences and chefs into one ecosystem that delivers natural, healthy and authentic flavours — while creating economic opportunity for young Tanzanians.' },
            { icon: Eye, cls: 'bg-spice-100 text-spice-700', title: 'Our Vision', text: 'A Tanzania where healthy, natural food is accessible to all, where farmers are valued partners, and where young people build careers in agriculture, food and hospitality.' },
            { icon: Compass, cls: 'bg-hibiscus-100 text-hibiscus-700', title: 'Our Promise', text: 'Every product, experience and chef booking supports our community. Transparent pricing, honest ingredients and a commitment to the people who make Kijana Factory possible.' },
          ].map((c, i) => (
            <Reveal key={c.title} staggerIndex={i} staggerMs={100} className="card p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${c.cls}`}>
                <c.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold text-forest-900">{c.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-earth-700">{c.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Story section */}
      <section className="bg-cream-100 py-16 sm:py-24">
        <div className="container-px grid items-center gap-10 lg:grid-cols-2">
          <Reveal direction="scale" className="relative">
            <img src={storyImage} alt="Tanzanian farmer in the field" className="aspect-[4/3] w-full rounded-3xl object-cover shadow-lift" />
            <div className="absolute -bottom-5 -right-3 rounded-2xl bg-spice-600 p-5 text-cream-50 shadow-card sm:-right-6">
              <p className="font-display text-3xl font-semibold">50+</p>
              <p className="text-sm text-cream-200/90">Partner farmers</p>
            </div>
          </Reveal>
          <Reveal direction="left" delay={100}>
            <p className="eyebrow">Our Story</p>
            <h2 className="section-title mt-2">It started with farmers</h2>
            <div className="mt-5 space-y-4 text-earth-700">
              <p>
                Kijana Factory was born from a simple observation: Tanzanian farmers grow incredible ingredients, but too often they are disconnected from the customers who would value them most.
              </p>
              <p>
                We set out to bridge that gap — not just by buying and selling, but by building a brand that celebrates the natural richness of Tanzanian agriculture. Spices, hibiscus, moringa, herbs — all grown by farmers we know by name, blended in small batches, and delivered fresh.
              </p>
              <p>
                Today, Kijana Factory is more than a food brand. It is a platform where customers can buy products, customize them to their taste, book dining experiences, hire chefs, and support a movement that is changing Tanzania from the ground up.
              </p>
            </div>
            <button onClick={() => navigate('/impact')} className="btn-primary btn-lg mt-8">
              Read our full impact story <ArrowRight size={18} />
            </button>
          </Reveal>
        </div>
      </section>

      {/* What we do — pillars */}
      <section className="container-px py-16 sm:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">What We Do</p>
          <h2 className="section-title mt-2">Six pillars of Kijana Factory</h2>
          <p className="mt-4 text-earth-700">From the farm to your dining table, every pillar is connected and every one serves our community.</p>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.title} staggerIndex={i} staggerMs={80} className="card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-forest-100 text-forest-700">
                <p.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-forest-900">{p.title}</h3>
              <p className="mt-2 text-sm text-earth-600">{p.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Craft section */}
      <section className="bg-forest-900 py-16 text-cream-50 sm:py-24">
        <div className="container-px grid items-center gap-10 lg:grid-cols-2">
          <Reveal direction="left" className="order-2 lg:order-1">
            <p className="eyebrow text-spice-400">Our Craft</p>
            <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">Small-batch, big care</h2>
            <p className="mt-4 max-w-lg text-cream-200/85">
              Every KF product is blended in our Mikocheni facility in small batches. We quality-check every step, from sourcing raw ingredients to the final seal on the package.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-cream-200/90">
              {[
                'Direct sourcing from partner farmers',
                'Small-batch blending for freshness',
                'Quality checks at every stage',
                'Customizable to your exact taste',
                'Transparent pricing — you see every cost',
              ].map((f, i) => (
                <li key={f} className="flex items-center gap-3" style={{ transitionDelay: `${i * 60}ms` }}>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-spice-600 text-xs">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <button onClick={() => navigate('/shop')} className="btn-accent btn-lg mt-8">
              Browse products <ArrowRight size={18} />
            </button>
          </Reveal>
          <Reveal direction="scale" delay={100} className="relative order-1 lg:order-2">
            <img src={craftImage} alt="Colorful spices in bowls" className="aspect-[4/3] w-full rounded-3xl object-cover shadow-lift" />
          </Reveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="container-px py-16 sm:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Our Journey</p>
          <h2 className="section-title mt-2">How we grew</h2>
        </Reveal>
        <div className="mt-12 max-w-3xl space-y-0">
          {timeline.map((item, i) => (
            <Reveal key={item.year} staggerIndex={i} staggerMs={100} direction="left">
              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-spice-600 font-display text-sm font-bold text-cream-50">
                    {item.year}
                  </div>
                  {i < timeline.length - 1 && <div className="w-px flex-1 bg-earth-200" />}
                </div>
                <div className={i < timeline.length - 1 ? 'pb-10' : ''}>
                  <h3 className="font-display text-lg font-semibold text-forest-900">{item.title}</h3>
                  <p className="mt-1.5 text-sm text-earth-600">{item.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="bg-cream-100 py-16 sm:py-24">
        <div className="container-px">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">What We Stand For</p>
            <h2 className="section-title mt-2">Our values</h2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} staggerIndex={i} staggerMs={80} className="card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-spice-100 text-spice-700">
                  <v.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-forest-900">{v.title}</h3>
                <p className="mt-1.5 text-sm text-earth-600">{v.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Impact stats */}
      <section className="container-px py-16 sm:py-20">
        <AboutStats />
      </section>

      {/* Community image strip */}
      <section className="container-px pb-16 sm:pb-20">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { src: communityImage, alt: 'Farmers working together' },
            { src: kitchenImage, alt: 'Traditional cooking' },
            { src: storyImage, alt: 'Farmer with fresh harvest' },
          ].map((img, i) => (
            <Reveal key={i} staggerIndex={i} staggerMs={100} direction="scale" className="group overflow-hidden rounded-2xl shadow-soft">
              <img src={img.src} alt={img.alt} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110" />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Team highlight */}
      <section className="bg-forest-50 py-16 sm:py-20">
        <div className="container-px">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Our Team</p>
            <h2 className="section-title mt-2">The people behind KF</h2>
            <p className="mt-4 text-earth-700">From farmers to chefs, every person in the Kijana Factory family shares a commitment to natural, healthy and authentic Tanzanian food.</p>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {chefs.slice(0, 4).map((chef, i) => (
              <Reveal key={chef.id} staggerIndex={i} staggerMs={80} className="card overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                <img src={chef.photo} alt={chef.name} loading="lazy" className="aspect-square w-full object-cover" />
                <div className="p-4">
                  <p className="font-display text-sm font-semibold text-forest-900">{chef.name}</p>
                  <p className="text-xs text-earth-500">{chef.speciality}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-8 text-center">
            <button onClick={() => navigate('/chef')} className="btn-primary btn-md">
              Meet all our chefs <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container-px py-16 sm:py-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Wanasema</p>
          <h2 className="section-title mt-2">What our community says</h2>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <Reveal key={t.id} as="figure" staggerIndex={i} staggerMs={80} className="card flex flex-col p-6">
              <Stars rating={t.rating} />
              <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-earth-700">&ldquo;{t.text}&rdquo;</blockquote>
              <figcaption className="mt-4">
                <p className="font-semibold text-forest-900">{t.author}</p>
                <p className="text-xs text-earth-500">{t.role}</p>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-px pb-20">
        <Reveal direction="scale" className="overflow-hidden rounded-3xl bg-spice-600 px-6 py-12 text-center text-cream-50 sm:px-12 sm:py-16">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">Join the KF family</h2>
          <p className="mx-auto mt-3 max-w-xl text-cream-100/90">
            Shop our products, book a dining experience, hire a chef, or partner with us. Every action supports Tanzanian farmers and communities.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <button onClick={() => navigate('/shop')} className="btn btn-lg bg-cream-50 text-spice-700 hover:bg-cream-100 active:scale-95">Shop now</button>
            <a
              href={buildWhatsAppUrl('Habari! Ningeomba kujua zaidi kuhusu Kijana Factory.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-lg border border-cream-50/40 text-cream-50 hover:bg-cream-50/10 active:scale-95"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Chat with us
            </a>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

function AboutStats() {
  const { navigate } = useRouter();
  const [ref, inView] = useInView<HTMLDivElement>();

  return (
    <div ref={ref}>
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">By the Numbers</p>
        <h2 className="section-title mt-2">Our growing impact</h2>
      </div>
      <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {impactStats.map((s) => (
          <StatCard key={s.id} value={s.value} suffix={s.suffix} label={s.label} subLabel={s.subLabel} start={inView} />
        ))}
      </div>
      <div className="mt-10 text-center">
        <button onClick={() => navigate('/impact')} className="btn-primary btn-lg">
          See full impact <ArrowRight size={18} />
        </button>
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
