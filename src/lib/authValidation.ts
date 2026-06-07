const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_RE = /^[\p{L}\s'.-]+$/u;

export function validateEmail(email: string): string | null {
  const value = email.trim().toLowerCase();
  if (!value) return "Email is required";
  if (!EMAIL_RE.test(value)) return "Enter a valid email address";
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) return "Password is required";
  if (password.length < 6) return "Password must be at least 6 characters";
  return null;
}

export function validateName(value: string, label: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return `${label} is required`;
  if (trimmed.length < 2) return `${label} must be at least 2 characters`;
  if (!NAME_RE.test(trimmed)) return `${label} contains invalid characters`;
  return null;
}

export function validatePhone(phone: string): string | null {
  const digits = phone.replace(/\D/g, "");
  if (!phone.trim()) return "Phone number is required";
  if (digits.length < 10) return "Enter a valid phone number";
  return null;
}

export function validateSignupForm(input: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}): string | null {
  return (
    validateName(input.firstName, "First name") ??
    validateName(input.lastName, "Last name") ??
    validateEmail(input.email) ??
    validatePhone(input.phone) ??
    validatePassword(input.password)
  );
}

export function validateLoginForm(input: {
  email: string;
  password: string;
}): string | null {
  return validateEmail(input.email) ?? validatePassword(input.password);
}
