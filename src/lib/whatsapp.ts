import { siteConfig } from '@/config/site';
import type {
  CartItem,
  Customer,
  DeliveryInfo,
  DiningBooking,
  DiningExperience,
  ExperienceAddon,
  ChefRequest,
} from '@/types';
import { deliveryZones } from '@/data/mockData';

/**
 * Build a WhatsApp deep link URL for a given message and phone number.
 * Uses the wa.me endpoint with URL-encoded text.
 */
export function buildWhatsAppUrl(message: string, phone: string = siteConfig.whatsappNumber): string {
  const cleanPhone = phone.replace(/[^\d]/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

/** Open WhatsApp in a new tab with the prepared message. */
export function openWhatsApp(message: string, phone?: string): void {
  const url = buildWhatsAppUrl(message, phone);
  window.open(url, '_blank', 'noopener,noreferrer');
}

const fmt = (n: number) => siteConfig.currency.format(n);

export function generateProductOrderMessage(opts: {
  customer: Customer;
  items: CartItem[];
  delivery: DeliveryInfo;
  subtotal: number;
  deliveryFee: number;
  total: number;
  notes?: string;
}): string {
  const { customer, items, delivery, subtotal, deliveryFee, total, notes } = opts;
  const lines: string[] = [];
  lines.push('*KF PRODUCT ORDER*');
  lines.push('');
  lines.push(`Customer: ${customer.name}`);
  lines.push(`Phone: ${customer.phone}`);
  if (customer.email) lines.push(`Email: ${customer.email}`);
  lines.push('');
  lines.push('PRODUCTS:');
  items.forEach((item, i) => {
    lines.push('');
    lines.push(`${i + 1}. ${item.name}`);
    lines.push(`Size: ${item.sizeLabel}`);
    lines.push(`Quantity: ${item.quantity}`);
    if (item.selections.length > 0) {
      const customs = item.selections
        .map((s) => `${s.groupName}: ${s.optionLabels.join(', ')}`)
        .join(' | ');
      lines.push(`Customizations: ${customs}`);
    }
    lines.push(`Unit price: ${fmt(item.unitPrice)}`);
    lines.push(`Total: ${fmt(item.total)}`);
  });
  lines.push('');
  lines.push('Delivery:');
  lines.push(`Method: ${delivery.method === 'delivery' ? 'Home Delivery' : 'Pickup'}`);
  if (delivery.method === 'delivery') {
    const zone = deliveryZones.find((z) => z.id === delivery.zoneId);
    lines.push(`Location: ${zone?.name ?? 'N/A'}`);
    lines.push(`Address: ${delivery.address}`);
  }
  lines.push(`Date: ${delivery.date}`);
  lines.push(`Time: ${delivery.time}`);
  lines.push('');
  lines.push(`Subtotal: ${fmt(subtotal)}`);
  lines.push(`Delivery fee: ${fmt(deliveryFee)}`);
  lines.push(`TOTAL: ${fmt(total)}`);
  if (notes) {
    lines.push('');
    lines.push(`Customer Notes: ${notes}`);
  }
  return lines.join('\n');
}

export function generateDiningBookingMessage(opts: {
  customer: Customer;
  experience: DiningExperience;
  booking: Omit<DiningBooking, 'id' | 'createdAt' | 'status'>;
  selectedAddons: ExperienceAddon[];
}): string {
  const { customer, experience, booking, selectedAddons } = opts;
  const lines: string[] = [];
  lines.push('*KF DINING EXPERIENCE BOOKING*');
  lines.push('');
  lines.push(`Customer: ${customer.name}`);
  lines.push(`Phone: ${customer.phone}`);
  if (customer.email) lines.push(`Email: ${customer.email}`);
  lines.push('');
  lines.push(`Experience: ${experience.name}`);
  lines.push(`Location: ${experience.location}`);
  lines.push('');
  lines.push(`Date: ${booking.date}`);
  lines.push(`Time: ${booking.time}`);
  lines.push(`Guests: ${booking.guests}`);
  lines.push('');
  lines.push(`Occasion: ${booking.occasion}`);
  lines.push('');
  if (selectedAddons.length > 0) {
    lines.push('Add-ons:');
    selectedAddons.forEach((a) => lines.push(`- ${a.name} — ${fmt(a.price)}`));
  } else {
    lines.push('Add-ons: None');
  }
  lines.push('');
  lines.push(`Allergies: ${booking.allergies || 'None'}`);
  lines.push(`Dietary requirements: ${booking.dietary || 'None'}`);
  if (booking.specialRequests) {
    lines.push(`Special requests: ${booking.specialRequests}`);
  }
  lines.push('');
  lines.push('Price breakdown:');
  lines.push(`Base experience: ${fmt(booking.basePrice)}`);
  lines.push(`Add-ons: ${fmt(booking.addonsTotal)}`);
  lines.push(`TOTAL: ${fmt(booking.total)}`);
  return lines.join('\n');
}

export function generateChefRequestMessage(opts: {
  customer: Customer;
  request: Omit<ChefRequest, 'id' | 'createdAt' | 'status'>;
}): string {
  const { customer, request } = opts;
  const lines: string[] = [];
  lines.push('*KF CHEF BOOKING REQUEST*');
  lines.push('');
  lines.push(`Customer: ${customer.name}`);
  lines.push(`Phone: ${customer.phone}`);
  if (customer.email) lines.push(`Email: ${customer.email}`);
  lines.push('');
  lines.push(`Number of chefs: ${request.numberOfChefs}`);
  lines.push(`Guests: ${request.guests}`);
  lines.push('');
  lines.push(`Cuisine: ${request.cuisines.join(', ') || 'Not specified'}`);
  lines.push(`Meal: ${request.meal}`);
  lines.push(`Date: ${request.date}`);
  lines.push(`Time: ${request.time}`);
  lines.push(`Location: ${request.location}`);
  lines.push('');
  lines.push(`Event: ${request.eventType}`);
  lines.push(`Budget: ${request.budget || 'Not specified'}`);
  lines.push('');
  lines.push(`Allergies: ${request.allergies || 'None'}`);
  lines.push(`Dietary requirements: ${request.dietary || 'None'}`);
  if (request.specialRequests) {
    lines.push(`Special requests: ${request.specialRequests}`);
  }
  lines.push('');
  lines.push(`Estimated cost: ${fmt(request.estimatedCost)}`);
  return lines.join('\n');
}
