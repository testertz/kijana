// Lightweight validation helpers for forms.

export function validatePhone(phone: string): string | null {
  const trimmed = phone.trim();
  if (!trimmed) return 'Phone number is required';
  // Accept Tanzanian and international formats
  const digits = trimmed.replace(/[^\d]/g, '');
  if (digits.length < 9) return 'Enter a valid phone number (at least 9 digits)';
  return null;
}

export function validateEmail(email?: string): string | null {
  if (!email || !email.trim()) return null; // email optional
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email.trim())) return 'Enter a valid email address';
  return null;
}

export function validateRequired(value: string, label = 'This field'): string | null {
  if (!value.trim()) return `${label} is required`;
  return null;
}

export function validateMinGuests(value: number, min = 1): string | null {
  if (!value || value < min) return `At least ${min} guest${min > 1 ? 's' : ''} required`;
  return null;
}

export function validateDate(value: string): string | null {
  if (!value) return 'Please select a date';
  const selected = new Date(value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (selected < today) return 'Date cannot be in the past';
  return null;
}

export function validateQuantity(qty: number): string | null {
  if (!qty || qty < 1) return 'Quantity must be at least 1';
  if (qty > 999) return 'Quantity is too large';
  return null;
}

export function isFormValid(errors: Record<string, string | null>): boolean {
  return Object.values(errors).every((e) => e === null);
}
