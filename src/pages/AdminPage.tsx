import { useState } from 'react';
import {
  LayoutDashboard, Package, UtensilsCrossed, ChefHat, ClipboardList, Settings,
  Tag, Truck, CalendarDays, CheckCircle2, Users, Star, TrendingUp, DollarSign,
  Edit2, Trash2, Eye, Plus, Search,
} from 'lucide-react';
import {
  products, categories, diningExperiences, experienceAddons,
  chefs, sampleOrders, sampleDiningBookings, sampleChefRequests, sampleChefApplications,
  deliveryZones, testimonials,
} from '@/data/mockData';
import { formatPrice, formatDate, classNames } from '@/lib/format';
import { siteConfig } from '@/config/site';
import { Badge } from '@/components/ui';

type AdminSection =
  | 'overview' | 'products' | 'categories' | 'customizations' | 'orders' | 'delivery'
  | 'experiences' | 'dining-bookings' | 'addons'
  | 'chef-applications' | 'chefs' | 'chef-requests'
  | 'impact' | 'testimonials' | 'settings';

const nav: { group: string; items: { id: AdminSection; label: string; icon: typeof Package }[] }[] = [
  {
    group: 'Dashboard',
    items: [{ id: 'overview', label: 'Overview', icon: LayoutDashboard }],
  },
  {
    group: 'Shop',
    items: [
      { id: 'products', label: 'Products', icon: Package },
      { id: 'categories', label: 'Categories', icon: Tag },
      { id: 'customizations', label: 'Customizations', icon: Settings },
      { id: 'orders', label: 'Orders', icon: ClipboardList },
      { id: 'delivery', label: 'Delivery Zones', icon: Truck },
    ],
  },
  {
    group: 'Services',
    items: [
      { id: 'experiences', label: 'Dining Experiences', icon: UtensilsCrossed },
      { id: 'dining-bookings', label: 'Dining Bookings', icon: CalendarDays },
      { id: 'addons', label: 'Experience Add-ons', icon: Plus },
    ],
  },
  {
    group: 'Chefs',
    items: [
      { id: 'chef-applications', label: 'Chef Applications', icon: Users },
      { id: 'chefs', label: 'Chefs', icon: ChefHat },
      { id: 'chef-requests', label: 'Chef Requests', icon: ClipboardList },
    ],
  },
  {
    group: 'Content',
    items: [
      { id: 'impact', label: 'Impact', icon: TrendingUp },
      { id: 'testimonials', label: 'Testimonials', icon: Star },
    ],
  },
  {
    group: 'System',
    items: [{ id: 'settings', label: 'Settings', icon: Settings }],
  },
];

const orderStatuses = ['New', 'Contacted', 'Confirmed', 'Preparing', 'Ready', 'Delivered', 'Completed', 'Cancelled'];
const bookingStatuses = ['New', 'Contacted', 'Confirmed', 'Completed', 'Cancelled'];

export default function AdminPage() {
  const [section, setSection] = useState<AdminSection>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-cream-100 pt-16 sm:pt-20">
      {/* Sidebar */}
      <aside
        className={classNames(
          'fixed inset-y-0 left-0 z-40 w-64 transform overflow-y-auto bg-forest-950 pt-20 text-cream-100 transition-transform lg:static lg:translate-x-0 lg:pt-20',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <nav className="px-3 pb-6">
          {nav.map((g) => (
            <div key={g.group} className="mb-5">
              <p className="px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-cream-300/60">{g.group}</p>
              <ul className="mt-2 space-y-0.5">
                {g.items.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => { setSection(item.id); setSidebarOpen(false); }}
                      className={classNames(
                        'flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                        section === item.id ? 'bg-spice-600 text-cream-50' : 'text-cream-200/80 hover:bg-forest-800 hover:text-cream-50',
                      )}
                    >
                      <item.icon size={16} /> {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 z-30 bg-forest-950/50 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <main className="flex-1 overflow-x-hidden">
        <div className="border-b border-earth-200 bg-white px-4 py-3 sm:px-6">
          <button onClick={() => setSidebarOpen(true)} className="btn-ghost btn-sm lg:hidden">
            <LayoutDashboard size={16} /> Menu
          </button>
          <h1 className="hidden font-display text-xl font-semibold text-forest-900 lg:block">Admin Dashboard</h1>
        </div>

        <div className="p-4 sm:p-6">
          {section === 'overview' && <Overview />}
          {section === 'products' && <ProductsAdmin />}
          {section === 'categories' && <CategoriesAdmin />}
          {section === 'customizations' && <CustomizationsAdmin />}
          {section === 'orders' && <OrdersAdmin />}
          {section === 'delivery' && <DeliveryAdmin />}
          {section === 'experiences' && <ExperiencesAdmin />}
          {section === 'dining-bookings' && <DiningBookingsAdmin />}
          {section === 'addons' && <AddonsAdmin />}
          {section === 'chef-applications' && <ChefApplicationsAdmin />}
          {section === 'chefs' && <ChefsAdmin />}
          {section === 'chef-requests' && <ChefRequestsAdmin />}
          {section === 'impact' && <ImpactAdmin />}
          {section === 'testimonials' && <TestimonialsAdmin />}
          {section === 'settings' && <SettingsAdmin />}
        </div>
      </main>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, trend }: { icon: typeof Package; label: string; value: string; trend?: string }) {
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-forest-100 text-forest-700">
          <Icon size={18} />
        </div>
        {trend && <span className="text-xs font-medium text-forest-600">{trend}</span>}
      </div>
      <p className="mt-3 font-display text-2xl font-semibold text-forest-900">{value}</p>
      <p className="text-xs text-earth-600">{label}</p>
    </div>
  );
}

function Overview() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={DollarSign} label="Total revenue (mock)" value={formatPrice(2840000)} trend="+12%" />
        <StatCard icon={ClipboardList} label="Orders" value={String(sampleOrders.length)} trend="+3" />
        <StatCard icon={CalendarDays} label="Dining bookings" value={String(sampleDiningBookings.length)} />
        <StatCard icon={ChefHat} label="Active chefs" value={String(chefs.filter((c) => c.status === 'active').length)} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card p-5">
          <h2 className="font-display text-lg font-semibold text-forest-900">Recent orders</h2>
          <div className="mt-4 space-y-2">
            {sampleOrders.map((o) => (
              <div key={o.id} className="flex items-center justify-between rounded-xl bg-cream-100 p-3">
                <div>
                  <p className="text-sm font-semibold text-forest-900">{o.id}</p>
                  <p className="text-xs text-earth-600">{o.customer.name} · {formatDate(o.createdAt)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-forest-900">{formatPrice(o.total)}</p>
                  <Badge variant={o.status === 'Delivered' ? 'forest' : 'spice'}>{o.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card p-5">
          <h2 className="font-display text-lg font-semibold text-forest-900">Recent bookings</h2>
          <div className="mt-4 space-y-2">
            {sampleDiningBookings.map((b) => (
              <div key={b.id} className="flex items-center justify-between rounded-xl bg-cream-100 p-3">
                <div>
                  <p className="text-sm font-semibold text-forest-900">{b.id}</p>
                  <p className="text-xs text-earth-600">{b.experienceName} · {b.guests} guests</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-forest-900">{formatPrice(b.total)}</p>
                  <Badge variant={b.status === 'Confirmed' ? 'forest' : 'spice'}>{b.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminHeader({ title, action }: { title: string; action?: React.ReactNode }) {
  return (
    <div className="mb-5 flex items-center justify-between gap-3">
      <h2 className="font-display text-2xl font-semibold text-forest-900">{title}</h2>
      {action}
    </div>
  );
}

function Table({ headers, children }: { headers: string[]; children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-earth-200 bg-white">
      <table className="w-full text-sm">
        <thead className="bg-cream-100 text-left text-xs font-semibold uppercase tracking-wider text-earth-600">
          <tr>
            {headers.map((h) => <th key={h} className="px-4 py-3">{h}</th>)}
          </tr>
        </thead>
        <tbody className="divide-y divide-earth-200">{children}</tbody>
      </table>
    </div>
  );
}

function ProductsAdmin() {
  return (
    <div>
      <AdminHeader title="Products" action={<button className="btn-accent btn-sm"><Plus size={14} /> Add Product</button>} />
      <Table headers={['Product', 'Category', 'Sizes', 'Price from', 'Status', 'Actions']}>
        {products.map((p) => (
          <tr key={p.id} className="hover:bg-cream-50">
            <td className="px-4 py-3">
              <div className="flex items-center gap-2">
                <img src={p.image} alt={p.name} className="h-9 w-9 rounded-lg object-cover" />
                <span className="font-medium text-forest-900">{p.name}</span>
              </div>
            </td>
            <td className="px-4 py-3 text-earth-600">{categories.find((c) => c.id === p.category)?.name}</td>
            <td className="px-4 py-3 text-earth-600">{p.sizes.length}</td>
            <td className="px-4 py-3 font-medium text-forest-900">{formatPrice(Math.min(...p.sizes.map((s) => s.price)))}</td>
            <td className="px-4 py-3"><Badge variant={p.available ? 'forest' : 'hibiscus'}>{p.available ? 'Active' : 'Disabled'}</Badge></td>
            <td className="px-4 py-3">
              <div className="flex gap-1">
                <button className="rounded-lg p-1.5 text-earth-500 hover:bg-forest-50 hover:text-forest-700" aria-label="Edit"><Edit2 size={15} /></button>
                <button className="rounded-lg p-1.5 text-earth-500 hover:bg-hibiscus-50 hover:text-hibiscus-600" aria-label="Delete"><Trash2 size={15} /></button>
              </div>
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
}

function CategoriesAdmin() {
  return (
    <div>
      <AdminHeader title="Categories" action={<button className="btn-accent btn-sm"><Plus size={14} /> Add Category</button>} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <div key={c.id} className="card overflow-hidden">
            <img src={c.image} alt={c.name} className="h-32 w-full object-cover" />
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-semibold text-forest-900">{c.name}</h3>
                <div className="flex gap-1">
                  <button className="rounded-lg p-1.5 text-earth-500 hover:bg-forest-50 hover:text-forest-700"><Edit2 size={14} /></button>
                </div>
              </div>
              <p className="mt-1 text-xs text-earth-600">{c.description}</p>
              <p className="mt-2 text-xs text-earth-500">{products.filter((p) => p.category === c.id).length} products</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CustomizationsAdmin() {
  const customizable = products.filter((p) => p.customizationGroups.length > 0);
  return (
    <div>
      <AdminHeader title="Customizations & Pricing" />
      <div className="space-y-4">
        {customizable.map((p) => (
          <div key={p.id} className="card p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-semibold text-forest-900">{p.name}</h3>
              <button className="btn-outline btn-sm"><Plus size={14} /> Add Group</button>
            </div>
            <div className="mt-4 space-y-3">
              {p.customizationGroups.map((g) => (
                <div key={g.id} className="rounded-xl bg-cream-100 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-forest-900">{g.name}</span>
                      <span className="ml-2 text-xs text-earth-500">{g.type === 'single' ? 'Single choice' : 'Multi choice'} · {g.required ? 'Required' : 'Optional'}</span>
                    </div>
                    <button className="rounded-lg p-1.5 text-earth-500 hover:bg-forest-50 hover:text-forest-700"><Edit2 size={14} /></button>
                  </div>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                    {g.options.map((o) => (
                      <div key={o.id} className="flex items-center justify-between rounded-lg bg-white px-3 py-2 text-sm">
                        <span className="text-forest-800">{o.label}</span>
                        <span className="font-medium text-spice-600">{o.price === 0 ? 'Free' : formatPrice(o.price)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function OrdersAdmin() {
  return (
    <div>
      <AdminHeader title="Orders" />
      <Table headers={['Order ID', 'Customer', 'Location', 'Total', 'Date', 'WhatsApp', 'Status']}>
        {sampleOrders.map((o) => (
          <tr key={o.id} className="hover:bg-cream-50">
            <td className="px-4 py-3 font-medium text-forest-900">{o.id}</td>
            <td className="px-4 py-3 text-earth-700">{o.customer.name}</td>
            <td className="px-4 py-3 text-earth-600">{o.delivery.method === 'pickup' ? 'Pickup' : deliveryZones.find((z) => z.id === o.delivery.zoneId)?.name ?? '—'}</td>
            <td className="px-4 py-3 font-semibold text-forest-900">{formatPrice(o.total)}</td>
            <td className="px-4 py-3 text-earth-600">{formatDate(o.createdAt)}</td>
            <td className="px-4 py-3"><Badge variant={o.whatsappStatus === 'sent' ? 'forest' : 'cream'}>{o.whatsappStatus}</Badge></td>
            <td className="px-4 py-3">
              <select defaultValue={o.status} className="rounded-lg border border-earth-200 bg-white px-2 py-1 text-xs">
                {orderStatuses.map((s) => <option key={s}>{s}</option>)}
              </select>
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
}

function DeliveryAdmin() {
  return (
    <div>
      <AdminHeader title="Delivery Zones" action={<button className="btn-accent btn-sm"><Plus size={14} /> Add Zone</button>} />
      <Table headers={['Zone', 'Delivery Fee', 'Actions']}>
        {deliveryZones.map((z) => (
          <tr key={z.id} className="hover:bg-cream-50">
            <td className="px-4 py-3 font-medium text-forest-900">{z.name}</td>
            <td className="px-4 py-3 text-earth-700">{formatPrice(z.fee)}</td>
            <td className="px-4 py-3">
              <button className="rounded-lg p-1.5 text-earth-500 hover:bg-forest-50 hover:text-forest-700"><Edit2 size={15} /></button>
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
}

function ExperiencesAdmin() {
  return (
    <div>
      <AdminHeader title="Dining Experiences" action={<button className="btn-accent btn-sm"><Plus size={14} /> Add Experience</button>} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {diningExperiences.map((e) => (
          <div key={e.id} className="card overflow-hidden">
            <img src={e.images[0]} alt={e.name} className="h-36 w-full object-cover" />
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-semibold text-forest-900">{e.name}</h3>
                <Badge variant={e.customizable ? 'forest' : 'cream'}>{e.customizable ? 'Active' : 'Inactive'}</Badge>
              </div>
              <p className="mt-1 text-xs text-earth-600">{e.location} · {e.duration}</p>
              <p className="mt-2 font-display text-lg font-semibold text-spice-600">{formatPrice(e.basePrice)}</p>
              <div className="mt-3 flex gap-1">
                <button className="btn-outline btn-sm flex-1"><Edit2 size={13} /> Edit</button>
                <button className="rounded-lg border border-earth-200 p-2 text-earth-500 hover:bg-forest-50"><Eye size={14} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DiningBookingsAdmin() {
  return (
    <div>
      <AdminHeader title="Dining Bookings" />
      <Table headers={['Booking ID', 'Customer', 'Experience', 'Guests', 'Date', 'Time', 'Total', 'Status']}>
        {sampleDiningBookings.map((b) => (
          <tr key={b.id} className="hover:bg-cream-50">
            <td className="px-4 py-3 font-medium text-forest-900">{b.id}</td>
            <td className="px-4 py-3 text-earth-700">{b.customer.name}</td>
            <td className="px-4 py-3 text-earth-600">{b.experienceName}</td>
            <td className="px-4 py-3 text-earth-600">{b.guests}</td>
            <td className="px-4 py-3 text-earth-600">{b.date}</td>
            <td className="px-4 py-3 text-earth-600">{b.time}</td>
            <td className="px-4 py-3 font-semibold text-forest-900">{formatPrice(b.total)}</td>
            <td className="px-4 py-3">
              <select defaultValue={b.status} className="rounded-lg border border-earth-200 bg-white px-2 py-1 text-xs">
                {bookingStatuses.map((s) => <option key={s}>{s}</option>)}
              </select>
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
}

function AddonsAdmin() {
  return (
    <div>
      <AdminHeader title="Experience Add-ons" action={<button className="btn-accent btn-sm"><Plus size={14} /> Add Add-on</button>} />
      <Table headers={['Add-on', 'Description', 'Price', 'Actions']}>
        {experienceAddons.map((a) => (
          <tr key={a.id} className="hover:bg-cream-50">
            <td className="px-4 py-3 font-medium text-forest-900">{a.name}</td>
            <td className="px-4 py-3 text-earth-600">{a.description}</td>
            <td className="px-4 py-3 font-semibold text-spice-600">{formatPrice(a.price)}</td>
            <td className="px-4 py-3">
              <button className="rounded-lg p-1.5 text-earth-500 hover:bg-forest-50 hover:text-forest-700"><Edit2 size={15} /></button>
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
}

function ChefApplicationsAdmin() {
  return (
    <div>
      <AdminHeader title="Chef Applications" />
      <Table headers={['Applicant', 'Location', 'Speciality', 'Experience', 'Status', 'Actions']}>
        {sampleChefApplications.map((a) => (
          <tr key={a.id} className="hover:bg-cream-50">
            <td className="px-4 py-3">
              <p className="font-medium text-forest-900">{a.name}</p>
              <p className="text-xs text-earth-500">{a.email}</p>
            </td>
            <td className="px-4 py-3 text-earth-600">{a.location}</td>
            <td className="px-4 py-3 text-earth-600">{a.speciality}</td>
            <td className="px-4 py-3 text-earth-600">{a.experienceYears} yrs</td>
            <td className="px-4 py-3"><Badge variant={a.status === 'approved' ? 'forest' : a.status === 'rejected' ? 'hibiscus' : 'spice'}>{a.status}</Badge></td>
            <td className="px-4 py-3">
              <div className="flex gap-1">
                {a.status === 'pending' && (
                  <>
                    <button className="rounded-lg bg-forest-100 p-1.5 text-forest-700 hover:bg-forest-200" aria-label="Approve"><CheckCircle2 size={15} /></button>
                    <button className="rounded-lg bg-hibiscus-100 p-1.5 text-hibiscus-700 hover:bg-hibiscus-200" aria-label="Reject"><Trash2 size={15} /></button>
                  </>
                )}
                <button className="rounded-lg p-1.5 text-earth-500 hover:bg-forest-50 hover:text-forest-700" aria-label="View"><Eye size={15} /></button>
              </div>
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
}

function ChefsAdmin() {
  return (
    <div>
      <AdminHeader title="Chefs" />
      <Table headers={['Chef', 'Speciality', 'Location', 'Rating', 'Status', 'Actions']}>
        {chefs.map((c) => (
          <tr key={c.id} className="hover:bg-cream-50">
            <td className="px-4 py-3">
              <div className="flex items-center gap-2">
                <img src={c.photo} alt={c.name} className="h-9 w-9 rounded-full object-cover" />
                <span className="font-medium text-forest-900">{c.name}</span>
              </div>
            </td>
            <td className="px-4 py-3 text-earth-600">{c.speciality}</td>
            <td className="px-4 py-3 text-earth-600">{c.location}</td>
            <td className="px-4 py-3 text-earth-600">{c.rating.toFixed(1)} ★</td>
            <td className="px-4 py-3"><Badge variant={c.status === 'active' ? 'forest' : 'cream'}>{c.status}</Badge></td>
            <td className="px-4 py-3">
              <div className="flex gap-1">
                <button className="rounded-lg p-1.5 text-earth-500 hover:bg-forest-50 hover:text-forest-700" aria-label="Edit"><Edit2 size={15} /></button>
                <button className="rounded-lg p-1.5 text-earth-500 hover:bg-forest-50 hover:text-forest-700" aria-label="View"><Eye size={15} /></button>
              </div>
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
}

function ChefRequestsAdmin() {
  return (
    <div>
      <AdminHeader title="Chef Requests" />
      <Table headers={['Request ID', 'Customer', 'Chefs', 'Cuisine', 'Meal', 'Event', 'Date', 'Est. Cost', 'Status']}>
        {sampleChefRequests.map((r) => (
          <tr key={r.id} className="hover:bg-cream-50">
            <td className="px-4 py-3 font-medium text-forest-900">{r.id}</td>
            <td className="px-4 py-3 text-earth-700">{r.customer.name}</td>
            <td className="px-4 py-3 text-earth-600">{r.numberOfChefs}</td>
            <td className="px-4 py-3 text-earth-600">{r.cuisines.join(', ')}</td>
            <td className="px-4 py-3 text-earth-600">{r.meal}</td>
            <td className="px-4 py-3 text-earth-600">{r.eventType}</td>
            <td className="px-4 py-3 text-earth-600">{r.date}</td>
            <td className="px-4 py-3 font-semibold text-forest-900">{formatPrice(r.estimatedCost)}</td>
            <td className="px-4 py-3">
              <select defaultValue={r.status} className="rounded-lg border border-earth-200 bg-white px-2 py-1 text-xs">
                {bookingStatuses.map((s) => <option key={s}>{s}</option>)}
              </select>
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
}

function ImpactAdmin() {
  return (
    <div>
      <AdminHeader title="Impact Content" action={<button className="btn-accent btn-sm"><Plus size={14} /> Add Stat</button>} />
      <Table headers={['Stat', 'Value', 'Label', 'Sub-label', 'Actions']}>
        <tr className="hover:bg-cream-50"><td className="px-4 py-3 font-medium text-forest-900">Farmers</td><td className="px-4 py-3 text-earth-700">50+</td><td className="px-4 py-3 text-earth-600">Wakulima</td><td className="px-4 py-3 text-earth-600">Farmers supported</td><td className="px-4 py-3"><button className="rounded-lg p-1.5 text-earth-500 hover:bg-forest-50 hover:text-forest-700"><Edit2 size={15} /></button></td></tr>
        <tr className="hover:bg-cream-50"><td className="px-4 py-3 font-medium text-forest-900">Schools</td><td className="px-4 py-3 text-earth-700">10+</td><td className="px-4 py-3 text-earth-600">Shule</td><td className="px-4 py-3 text-earth-600">Schools partnered</td><td className="px-4 py-3"><button className="rounded-lg p-1.5 text-earth-500 hover:bg-forest-50 hover:text-forest-700"><Edit2 size={15} /></button></td></tr>
        <tr className="hover:bg-cream-50"><td className="px-4 py-3 font-medium text-forest-900">Products</td><td className="px-4 py-3 text-earth-700">2,000kg+</td><td className="px-4 py-3 text-earth-600">Bidhaa Zimeuzwa</td><td className="px-4 py-3 text-earth-600">Products sold (kg)</td><td className="px-4 py-3"><button className="rounded-lg p-1.5 text-earth-500 hover:bg-forest-50 hover:text-forest-700"><Edit2 size={15} /></button></td></tr>
      </Table>
    </div>
  );
}

function TestimonialsAdmin() {
  return (
    <div>
      <AdminHeader title="Testimonials" action={<button className="btn-accent btn-sm"><Plus size={14} /> Add Testimonial</button>} />
      <div className="grid gap-4 sm:grid-cols-2">
        {testimonials.map((t) => (
          <div key={t.id} className="card p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-forest-900">{t.author}</p>
                <p className="text-xs text-earth-500">{t.role}</p>
              </div>
              <div className="flex items-center gap-0.5">{Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={13} className="fill-spice-500 text-spice-500" />)}</div>
            </div>
            <p className="mt-3 text-sm text-earth-700">"{t.text}"</p>
            <div className="mt-3 flex gap-1">
              <button className="rounded-lg p-1.5 text-earth-500 hover:bg-forest-50 hover:text-forest-700"><Edit2 size={14} /></button>
              <button className="rounded-lg p-1.5 text-earth-500 hover:bg-hibiscus-50 hover:text-hibiscus-600"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsAdmin() {
  return (
    <div>
      <AdminHeader title="Settings" />
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <h3 className="font-display text-lg font-semibold text-forest-900">WhatsApp Configuration</h3>
          <p className="mt-1 text-sm text-earth-600">The KF WhatsApp number used for all orders and bookings.</p>
          <div className="mt-4">
            <label className="label" htmlFor="wa-number">WhatsApp Number</label>
            <input id="wa-number" className="input" defaultValue={siteConfig.whatsappNumber} />
            <p className="mt-1 text-xs text-earth-500">International format, no + (e.g. 255700000000)</p>
          </div>
          <button className="btn-primary btn-md mt-4">Save</button>
        </div>

        <div className="card p-6">
          <h3 className="font-display text-lg font-semibold text-forest-900">General Settings</h3>
          <div className="mt-4 space-y-4">
            <div>
              <label className="label" htmlFor="brand-name">Brand Name</label>
              <input id="brand-name" className="input" defaultValue={siteConfig.brand.name} />
            </div>
            <div>
              <label className="label" htmlFor="brand-tag">Tagline</label>
              <input id="brand-tag" className="input" defaultValue={siteConfig.brand.tagline} />
            </div>
            <div>
              <label className="label" htmlFor="contact-email">Contact Email</label>
              <input id="contact-email" className="input" defaultValue={siteConfig.contact.email} />
            </div>
          </div>
          <button className="btn-primary btn-md mt-4">Save</button>
        </div>

        <div className="card p-6">
          <h3 className="font-display text-lg font-semibold text-forest-900">Pricing Configuration</h3>
          <p className="mt-1 text-sm text-earth-600">Chef pricing base rates and multipliers.</p>
          <div className="mt-4 space-y-4">
            <div>
              <label className="label" htmlFor="base-chef">Base fee per chef (TZS)</label>
              <input id="base-chef" className="input" defaultValue="80000" />
            </div>
            <div>
              <label className="label" htmlFor="per-guest">Cost per guest (TZS)</label>
              <input id="per-guest" className="input" defaultValue="12000" />
            </div>
          </div>
          <button className="btn-primary btn-md mt-4">Save</button>
        </div>
      </div>
    </div>
  );
}
