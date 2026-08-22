import { ArrowRight, Calendar, ChefHat, Clock, MapPin, Users } from 'lucide-react';
import { useRouter } from '@/state/Router';
import { diningExperiences } from '@/data/mockData';
import { Stars, Badge } from '@/components/ui';
import { formatPrice } from '@/lib/format';

export default function ServicesPage() {
  const { navigate } = useRouter();

  return (
    <div className="pt-16 sm:pt-20">
      {/* Hero */}
      <section className="bg-forest-700 py-14 text-cream-50 sm:py-20">
        <div className="container-px">
          <p className="eyebrow text-spice-300">Huduma Zetu</p>
          <h1 className="mt-2 max-w-2xl font-display text-4xl font-semibold sm:text-5xl">Our Services</h1>
          <p className="mt-3 max-w-xl text-cream-200/85">
            From unforgettable dining experiences to private chefs — we bring Tanzanian flavours to your table.
          </p>
        </div>
      </section>

      {/* Two major services */}
      <section className="container-px py-12 sm:py-16">
        <div className="grid gap-6 lg:grid-cols-2">
          <button
            onClick={() => navigate('/experiences')}
            className="group relative overflow-hidden rounded-3xl text-left shadow-card transition-all hover:shadow-lift"
          >
            <img src={diningExperiences[0].images[0]} alt="Dining experiences" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:aspect-[16/10]" />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-950/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-cream-50 sm:p-8">
              <Badge variant="spice" className="mb-2">Dining Experiences</Badge>
              <h2 className="font-display text-2xl font-semibold sm:text-3xl">Memory Dinner &amp; more</h2>
              <p className="mt-2 max-w-md text-sm text-cream-200/85">
                Curated multi-course dinners, farm-to-table days, Swahili feasts and private dinners — fully customizable.
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-spice-300">
                Explore experiences <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </button>

          <button
            onClick={() => navigate('/chef')}
            className="group relative overflow-hidden rounded-3xl text-left shadow-card transition-all hover:shadow-lift"
          >
            <img src="https://images.pexels.com/photos/4253298/pexels-photo-4253298.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="KF Chef" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:aspect-[16/10]" />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-950/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-cream-50 sm:p-8">
              <Badge variant="spice" className="mb-2">KF Chef</Badge>
              <h2 className="font-display text-2xl font-semibold sm:text-3xl">Hire a private chef</h2>
              <p className="mt-2 max-w-md text-sm text-cream-200/85">
                Tell us your cuisine, guests and occasion — get an instant estimate and request a chef via WhatsApp.
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-spice-300">
                Request a chef <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </button>
        </div>
      </section>

      {/* Experiences listing */}
      <section className="bg-cream-100 py-12 sm:py-16">
        <div className="container-px">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Dining Experiences</p>
              <h2 className="section-title mt-2">Browse all experiences</h2>
            </div>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {diningExperiences.map((exp) => (
              <article key={exp.id} className="card group flex flex-col overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lift">
                <button onClick={() => navigate(`/experience/${exp.id}`)} className="relative aspect-[4/3] overflow-hidden">
                  <img src={exp.images[0]} alt={exp.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute left-3 top-3"><Badge variant="forest">{exp.duration}</Badge></div>
                </button>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-display text-lg font-semibold text-forest-900">{exp.name}</h3>
                    <Stars rating={exp.rating} size={12} />
                  </div>
                  <p className="mt-1.5 line-clamp-2 text-sm text-earth-600">{exp.shortDescription}</p>
                  <div className="mt-3 flex flex-wrap gap-3 text-xs text-earth-600">
                    <span className="flex items-center gap-1"><MapPin size={12} /> {exp.location}</span>
                    <span className="flex items-center gap-1"><Users size={12} /> up to {exp.capacity}</span>
                    <span className="flex items-center gap-1"><Calendar size={12} /> {exp.availableDates.length} dates</span>
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-earth-200/70 pt-4">
                    <div>
                      <span className="block text-xs text-earth-500">From</span>
                      <span className="font-display text-lg font-semibold text-forest-900">{formatPrice(exp.basePrice)}</span>
                    </div>
                    <button onClick={() => navigate(`/experience/${exp.id}`)} className="btn-accent btn-sm">
                      Customize &amp; Book <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Become a chef */}
      <section className="container-px py-12 sm:py-16">
        <div className="overflow-hidden rounded-3xl bg-forest-900 px-6 py-10 text-cream-50 sm:px-12 sm:py-14">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div>
              <ChefHat className="h-10 w-10 text-spice-400" />
              <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">Are you a chef?</h2>
              <p className="mt-3 max-w-md text-cream-200/85">
                Join the Kijana Factory chef network. Get matched with events across Tanzania and grow your culinary career.
              </p>
              <button onClick={() => navigate('/chef/apply')} className="btn-accent btn-lg mt-6">
                Become a KF Chef <ArrowRight size={18} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {['Flexible schedule', 'Vetted clients', 'Competitive pay', 'Grow your brand'].map((b) => (
                <div key={b} className="rounded-2xl bg-forest-800 p-4 text-sm font-medium text-cream-100">
                  <Clock className="mb-2 h-5 w-5 text-spice-400" /> {b}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
