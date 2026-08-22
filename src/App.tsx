import { RouterProvider, useRouter } from '@/state/Router';
import { CartProvider } from '@/state/CartContext';
import { ToastProvider } from '@/state/ToastContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWhatsApp from '@/components/layout/FloatingWhatsApp';
import HomePage from '@/pages/HomePage';
import ShopPage from '@/pages/ShopPage';
import ProductDetailsPage from '@/pages/ProductDetailsPage';
import CartPage from '@/pages/CartPage';
import CheckoutPage from '@/pages/CheckoutPage';
import SuccessPage from '@/pages/SuccessPage';
import ServicesPage from '@/pages/ServicesPage';
import ExperienceDetailsPage from '@/pages/ExperienceDetailsPage';
import ChefBookingPage from '@/pages/ChefBookingPage';
import ChefApplicationPage from '@/pages/ChefApplicationPage';
import ImpactPage from '@/pages/ImpactPage';
import AboutPage from '@/pages/AboutPage';
import PartnerPage from '@/pages/PartnerPage';
import ContactPage from '@/pages/ContactPage';
import AdminPage from '@/pages/AdminPage';

function Routes() {
  const { segments } = useRouter();

  // Routing logic based on path segments
  if (segments.length === 0) return <HomePage />;

  const [first, second, third] = segments;

  // /admin and sub-routes
  if (first === 'admin') return <AdminPage />;

  // /shop
  if (first === 'shop') return <ShopPage />;

  // /product/:id
  if (first === 'product' && second) return <ProductDetailsPage productId={second as string} />;

  // /cart
  if (first === 'cart') return <CartPage />;

  // /checkout
  if (first === 'checkout') return <CheckoutPage />;

  // /order/success
  if (first === 'order' && second === 'success') return <SuccessPage variant="order" />;

  // /services
  if (first === 'services') return <ServicesPage />;

  // /experiences (alias for services listing)
  if (first === 'experiences') return <ServicesPage />;

  // /experience/:id and /experience/:id/book
  if (first === 'experience' && second) return <ExperienceDetailsPage experienceId={second} />;

  // /booking/success
  if (first === 'booking' && second === 'success') return <SuccessPage variant="booking" />;

  // /chef
  if (first === 'chef') {
    if (second === 'apply') return <ChefApplicationPage />;
    if (second === 'success') return <SuccessPage variant="chef" />;
    return <ChefBookingPage />;
  }

  // /about
  if (first === 'about') return <AboutPage />;

  // /impact
  if (first === 'impact') return <ImpactPage />;

  // /partner
  if (first === 'partner') return <PartnerPage />;

  // /contact
  if (first === 'contact') return <ContactPage />;

  // Fallback
  return <HomePage />;
}

function AppShell() {
  const { segments } = useRouter();
  const isAdmin = segments[0] === 'admin';
  const hideFooter = isAdmin;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Routes />
      </main>
      {!hideFooter && <Footer />}
      <FloatingWhatsApp />
    </div>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <ToastProvider>
        <CartProvider>
          <AppShell />
        </CartProvider>
      </ToastProvider>
    </RouterProvider>
  );
}
