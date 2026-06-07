const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_RE = /^[\p{L}\s'.-]+$/u;
const PHONE_DIGITS_RE = /\d/g;

export function normalizeEmail(email) {
  return String(email ?? "").trim().toLowerCase();
}

export function validateEmail(email) {
  const value = normalizeEmail(email);
  if (!value) return "Email is required";
  if (value.length > 254) return "Email is too long";
  if (!EMAIL_RE.test(value)) return "Enter a valid email address";
  return null;
}

export function validatePassword(password) {
  const value = String(password ?? "");
  if (!value) return "Password is required";
  if (value.length < 6) return "Password must be at least 6 characters";
  if (value.length > 128) return "Password must be 128 characters or fewer";
  return null;
}

export function validateName(value, label) {
  const trimmed = String(value ?? "").trim();
  if (!trimmed) return `${label} is required`;
  if (trimmed.length < 2) return `${label} must be at least 2 characters`;
  if (trimmed.length > 50) return `${label} must be 50 characters or fewer`;
  if (!NAME_RE.test(trimmed)) return `${label} contains invalid characters`;
  return null;
}

export function validatePhone(phone) {
  const trimmed = String(phone ?? "").trim();
  if (!trimmed) return "Phone number is required";
  const digits = trimmed.match(PHONE_DIGITS_RE);
  const count = digits ? digits.length : 0;
  if (count < 10) return "Enter a valid phone number with at least 10 digits";
  if (count > 15) return "Phone number is too long";
  return null;
}

export function validateSignupBody(body) {
  const errors = [];

  const firstNameErr = validateName(body?.firstName, "First name");
  if (firstNameErr) errors.push(firstNameErr);

  const lastNameErr = validateName(body?.lastName, "Last name");
  if (lastNameErr) errors.push(lastNameErr);

  const emailErr = validateEmail(body?.email);
  if (emailErr) errors.push(emailErr);

  const phoneErr = validatePhone(body?.phone);
  if (phoneErr) errors.push(phoneErr);

  const passwordErr = validatePassword(body?.password);
  if (passwordErr) errors.push(passwordErr);

  if (errors.length > 0) {
    return { ok: false, error: errors[0] };
  }

  return {
    ok: true,
    data: {
      firstName: String(body.firstName).trim(),
      lastName: String(body.lastName).trim(),
      email: normalizeEmail(body.email),
      phone: String(body.phone).trim(),
      password: String(body.password),
    },
  };
}

export function validateLoginBody(body) {
  const emailErr = validateEmail(body?.email);
  if (emailErr) return { ok: false, error: emailErr };

  const passwordErr = validatePassword(body?.password);
  if (passwordErr) return { ok: false, error: passwordErr };

  return {
    ok: true,
    data: {
      email: normalizeEmail(body.email),
      password: String(body.password),
    },
  };
}

export function validateDeleteAccountBody(body) {
  const confirm = String(body?.confirm ?? "").trim().toUpperCase();
  if (confirm !== "DELETE") {
    return { ok: false, error: 'Type DELETE to confirm account removal' };
  }
  return { ok: true };
}
