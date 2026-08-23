// Reusable TypeScript domain types for the Kijana Factory platform.

export interface CustomizationOption {
  id: string;
  label: string;
  price: number; // additive, in TZS
}

export interface CustomizationGroup {
  id: string;
  name: string;
  type: 'single' | 'multi';
  required: boolean;
  options: CustomizationOption[];
}

export interface ProductSize {
  id: string;
  label: string; // e.g. "500g"
  price: number; // base price for this size
}

export interface Product {
  id: string;
  name: string;
  category: string;
  shortDescription: string;
  description: string;
  ingredients: string[];
  image: string;
  gallery?: string[];
  sizes: ProductSize[];
  customizationGroups: CustomizationGroup[];
  featured: boolean;
  available: boolean;
  rating: number;
  tags?: string[];
}

export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  image: string;
}

// A specific configured product line item in the cart
export interface CartItem {
  id: string; // unique cart line id
  productId: string;
  name: string;
  image: string;
  sizeId: string;
  sizeLabel: string;
  quantity: number;
  selections: {
    groupId: string;
    groupName: string;
    optionIds: string[];
    optionLabels: string[];
  }[];
  unitPrice: number; // computed base + customizations
  total: number; // unitPrice * quantity
}

export type DeliveryMethod = 'delivery' | 'pickup';

export interface DeliveryZone {
  id: string;
  name: string;
  fee: number;
}

export interface DeliveryInfo {
  method: DeliveryMethod;
  zoneId: string | null;
  address: string;
  date: string;
  time: string;
  notes?: string;
}

export interface Customer {
  name: string;
  phone: string;
  email?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  customer: Customer;
  delivery: DeliveryInfo;
  subtotal: number;
  deliveryFee: number;
  total: number;
  createdAt: string;
  status: OrderStatus;
  whatsappStatus: 'pending' | 'sent';
}

export type OrderStatus =
  | 'New'
  | 'Contacted'
  | 'Confirmed'
  | 'Preparing'
  | 'Ready'
  | 'Delivered'
  | 'Completed'
  | 'Cancelled';

export interface ExperienceAddon {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
}

export interface DiningExperience {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  location: string;
  duration: string;
  basePrice: number;
  capacity: number;
  images: string[];
  whatsIncluded: string[];
  availableDates: string[];
  timeSlots: string[];
  rating: number;
  reviews: ExperienceReview[];
  customizable: boolean;
  addons: string[]; // addon ids available for this experience
}

export interface ExperienceReview {
  author: string;
  rating: number;
  text: string;
  date: string;
}

export interface DiningBooking {
  id: string;
  experienceId: string;
  experienceName: string;
  customer: Customer;
  date: string;
  time: string;
  guests: number;
  occasion: string;
  addonIds: string[];
  allergies: string;
  dietary: string;
  specialRequests: string;
  basePrice: number;
  addonsTotal: number;
  total: number;
  createdAt: string;
  status: BookingStatus;
}

export type BookingStatus =
  | 'New'
  | 'Contacted'
  | 'Confirmed'
  | 'Completed'
  | 'Cancelled';

export interface Chef {
  id: string;
  name: string;
  photo: string;
  speciality: string;
  cuisines: string[];
  location: string;
  experienceYears: number;
  bio: string;
  rating: number;
  status: 'active' | 'inactive';
  applicationDate: string;
  approved: boolean;
}

export interface ChefApplication {
  id: string;
  name: string;
  phone: string;
  email: string;
  location: string;
  speciality: string;
  cuisines: string[];
  experienceYears: number;
  bio: string;
  availability: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
}

export interface ChefRequest {
  id: string;
  customer: Customer;
  numberOfChefs: number;
  guests: number;
  cuisines: string[];
  meal: string;
  date: string;
  time: string;
  location: string;
  eventType: string;
  budget: string;
  allergies: string;
  dietary: string;
  specialRequests: string;
  estimatedCost: number;
  createdAt: string;
  status: BookingStatus;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  text: string;
  rating: number;
  avatar?: string;
}
