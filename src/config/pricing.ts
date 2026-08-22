// Central pricing configuration for chef estimates and delivery fees.
// Admins can tune multipliers and base rates here without touching UI logic.

export const chefPricingConfig = {
  basePerChef: 80000, // base fee per chef
  perGuest: 12000, // added per guest
  mealMultiplier: {
    breakfast: 0.8,
    lunch: 1.0,
    dinner: 1.3,
    fullday: 1.8,
  } as Record<string, number>,
  cuisineMultiplier: {
    tanzanian: 1.0,
    swahili: 1.1,
    indian: 1.2,
    continental: 1.25,
    bbq: 1.15,
    seafood: 1.35,
    vegetarian: 0.95,
    custom: 1.4,
  } as Record<string, number>,
  eventMultiplier: {
    birthday: 1.05,
    wedding: 1.4,
    anniversary: 1.1,
    corporate: 1.2,
    privatedinner: 1.15,
    familygathering: 1.0,
    other: 1.1,
  } as Record<string, number>,
  locationFee: {
    kinondoni: 15000,
    ilala: 15000,
    temeke: 20000,
    mikocheni: 10000,
    masaki: 15000,
    oysterbay: 18000,
    other: 25000,
  } as Record<string, number>,
} as const;
