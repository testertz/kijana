import { ArrowRight, Sprout, Factory, GraduationCap, Users, HeartHandshake, Leaf, UtensilsCrossed } from 'lucide-react';
import { useRouter } from '@/state/Router';
import { impactStats, impactGallery } from '@/data/mockData';
import { useCountUp, useInView } from '@/lib/hooks';
import { Reveal } from '@/components/ui';

export default function ImpactPage() {
  const { navigate } = useRouter();

  const sections = [
    { icon: Sprout, title: 'Farmers', text: 'We partner with smallholder farmers across Tanzania, providing fair prices, training and a reliable market for their produce.' },
    { icon: Leaf, title: 'Agriculture', text: 'Sustainable farming practices that protect soil, conserve water and preserve indigenous crop varieties.' },
    { icon: Factory, title: 'Factory', text: 'Our Mikocheni facility blends, packages and quality-checks every product in small batches for consistent premium quality.' },
    { icon: GraduationCap, title: 'Schools', text: 'We partner with schools to educate young Tanzanians about nutrition, agriculture and entrepreneurship.' },
    { icon: UtensilsCrossed, title: 'Food', text: 'Healthy, natural food is at the heart of everything — from our spices to our dining experiences.' },
    { icon: Users, title: 'Community', text: 'Every purchase reinvests in the communities that grow our ingredients, creating a cycle of shared prosperity.' },
    { icon: HeartHandshake, title: 'Women & Youth', text: 'We actively empower women and young people through employment, training and leadership opportunities.' },
  ];

  return (
    <div className="pt-16 sm:pt-20">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={impactGallery[1]} alt="Tanzanian farming" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-950/90 to-forest-950/50" />
        </div>
        <div className="container-px relative flex min-h-[60vh] flex-col justify-center py-20">
          <div className="max-w-2xl">
            <p className="eyebrow text-spice-300">Our Impact</p>
            <h1 className="mt-3 font-display text-4xl font-semibold text-cream-50 sm:text-5xl lg:text-6xl">Tunabadili Tanzania</h1>
            <p className="mt-4 max-w-xl text-lg text-cream-200/90">
              We are changing Tanzania from the ground up — supporting farmers, empowering youth and bringing healthy, natural food to every table.
            </p>
            <button onClick={() => navigate('/partner')} className="btn-accent btn-lg mt-8">
              Partner with KF <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container-px py-16 sm:py-20">
        <ImpactStats />
      </section>

      {/* Story sections */}
      <section className="bg-cream-100 py-16 sm:py-20">
        <div className="container-px">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Our Story</p>
            <h2 className="section-title mt-2">How we create change</h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sections.map((s, i) => (
              <Reveal key={s.title} staggerIndex={i} staggerMs={80} className="card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-forest-100 text-forest-700">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-forest-900">{s.title}</h3>
                <p className="mt-2 text-sm text-earth-600">{s.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="container-px py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Gallery</p>
          <h2 className="section-title mt-2">From our farms & communities</h2>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {impactGallery.map((img, i) => (
            <Reveal key={i} staggerIndex={i} staggerMs={60} direction="scale" className={`group overflow-hidden rounded-2xl shadow-soft ${i % 5 === 0 ? 'sm:col-span-2 sm:row-span-2' : ''}`}>
              <img src={img} alt={`KF community ${i + 1}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110" />
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-px pb-20">
        <Reveal direction="scale" className="overflow-hidden rounded-3xl bg-forest-900 px-6 py-12 text-center text-cream-50 sm:px-12 sm:py-16">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">Want to grow with us?</h2>
          <p className="mx-auto mt-3 max-w-xl text-cream-200/85">
            Partner with Kijana Factory as a farmer, school, corporate or sponsor. Together we can build a healthier Tanzania.
          </p>
          <button onClick={() => navigate('/partner')} className="btn-accent btn-lg mt-7">
            Partner with KF <ArrowRight size={18} />
          </button>
        </Reveal>
      </section>
    </div>
  );
}

function ImpactStats() {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <div ref={ref}>
      <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {impactStats.map((s) => (
          <StatCard key={s.id} value={s.value} suffix={s.suffix} label={s.label} subLabel={s.subLabel} start={inView} />
        ))}
      </div>
    </div>
  );
}

function StatCard({ value, suffix, label, subLabel, start }: { value: number; suffix: string; label: string; subLabel: string; start: boolean }) {
  const v = useCountUp(value, 1600, start);
  return (
    <div className="card p-6 text-center">
      <p className="font-display text-3xl font-semibold text-spice-600 sm:text-4xl">
        {v.toLocaleString('en-US')}<span className="text-spice-500">{suffix}</span>
      </p>
      <p className="mt-1 font-semibold text-forest-900">{label}</p>
      <p className="text-xs text-earth-500">{subLabel}</p>
    </div>
  );
}
