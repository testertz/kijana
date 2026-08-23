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

  let page: React.ReactNode;

  // Routing logic based on path segments
  if (segments.length === 0) page = <HomePage />;
  else {
    const [first, second, third] = segments;

    if (first === 'admin') page = <AdminPage />;
    else if (first === 'shop') page = <ShopPage />;
    else if (first === 'product' && second) page = <ProductDetailsPage productId={second as string} />;
    else if (first === 'cart') page = <CartPage />;
    else if (first === 'checkout') page = <CheckoutPage />;
    else if (first === 'order' && second === 'success') page = <SuccessPage variant="order" />;
    else if (first === 'services') page = <ServicesPage />;
    else if (first === 'experiences') page = <ServicesPage />;
    else if (first === 'experience' && second) page = <ExperienceDetailsPage experienceId={second} />;
    else if (first === 'booking' && second === 'success') page = <SuccessPage variant="booking" />;
    else if (first === 'chef') {
      if (second === 'apply') page = <ChefApplicationPage />;
      else if (second === 'success') page = <SuccessPage variant="chef" />;
      else page = <ChefBookingPage />;
    }
    else if (first === 'about') page = <AboutPage />;
    else if (first === 'impact') page = <ImpactPage />;
    else if (first === 'partner') page = <PartnerPage />;
    else if (first === 'contact') page = <ContactPage />;
    else page = <HomePage />;
  }

  return page;
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
