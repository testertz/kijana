import type {
  CartItem,
  ChefRequest,
  DiningBooking,
  ExperienceAddon,
  Order,
  Product,
  ProductSize,
} from '@/types';
import { chefPricingConfig } from '@/config/pricing';
import { deliveryZones } from '@/data/mockData';
import { siteConfig } from '@/config/site';

/**
 * Calculate the unit price for a configured product:
 *   size base price + sum of selected customization option prices
 */
export function calculateProductUnitPrice(
  product: Product,
  size: ProductSize | undefined,
  selections: Record<string, string[]>, // groupId -> optionIds
): number {
  if (!size) return 0;
  let price = size.price;
  for (const group of product.customizationGroups) {
    const chosen = selections[group.id] ?? [];
    for (const opt of group.options) {
      if (chosen.includes(opt.id)) price += opt.price;
    }
  }
  return price;
}

export function calculateCartItemTotal(unitPrice: number, quantity: number): number {
  return unitPrice * quantity;
}

export function calculateCartSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.total, 0);
}

export function calculateDeliveryFee(method: 'delivery' | 'pickup', zoneId: string | null): number {
  if (method === 'pickup') return 0;
  const zone = deliveryZones.find((z) => z.id === zoneId);
  return zone ? zone.fee : siteConfig.delivery.defaultFee;
}

export function calculateOrderTotal(items: CartItem[], deliveryFee: number): number {
  return calculateCartSubtotal(items) + deliveryFee;
}

export function calculateExperiencePrice(
  basePrice: number,
  selectedAddons: ExperienceAddon[],
): { base: number; addonsTotal: number; total: number } {
  const addonsTotal = selectedAddons.reduce((s, a) => s + a.price, 0);
  return { base: basePrice, addonsTotal, total: basePrice + addonsTotal };
}

/**
 * Estimate a chef booking cost.
 * Final price is confirmed by KF — this is clearly labeled as an estimate.
 */
export function calculateChefEstimate(input: {
  numberOfChefs: number;
  guests: number;
  meal: string;
  cuisines: string[];
  eventType: string;
  location: string;
}): number {
  const { numberOfChefs, guests, meal, cuisines, eventType, location } = input;
  const base = numberOfChefs * chefPricingConfig.basePerChef;
  const guestCost = guests * chefPricingConfig.perGuest;
  const mealMul = chefPricingConfig.mealMultiplier[meal.toLowerCase().replace(/\s/g, '')] ?? 1;
  // use the highest cuisine multiplier among selected
  const cuisineMul =
    cuisines.length === 0
      ? 1
      : Math.max(
          ...cuisines.map((c) => chefPricingConfig.cuisineMultiplier[c.toLowerCase()] ?? 1),
        );
  const eventMul = chefPricingConfig.eventMultiplier[eventType.toLowerCase()] ?? 1;
  const locFee = chefPricingConfig.locationFee[location.toLowerCase()] ?? chefPricingConfig.locationFee.other;

  const estimate = (base + guestCost) * mealMul * cuisineMul * eventMul + locFee;
  return Math.round(estimate / 1000) * 1000; // round to nearest 1000
}

export function orderTotalForDisplay(order: Order): number {
  return order.total;
}

export function diningBookingTotal(b: DiningBooking): number {
  return b.total;
}

export function chefRequestEstimate(r: ChefRequest): number {
  return r.estimatedCost;
}
