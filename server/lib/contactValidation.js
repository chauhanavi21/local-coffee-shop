const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactMessageBody(body) {
  const errors = [];

  const firstName = String(body?.firstName ?? "").trim();
  const lastName = String(body?.lastName ?? "").trim();
  const email = String(body?.email ?? "").trim().toLowerCase();
  const subject = String(body?.subject ?? "").trim();
  const message = String(body?.message ?? "").trim();

  if (!firstName || firstName.length < 2) errors.push("First name is required");
  if (!lastName || lastName.length < 2) errors.push("Last name is required");
  if (!email) errors.push("Email is required");
  else if (!EMAIL_RE.test(email)) errors.push("Enter a valid email address");
  if (!subject || subject.length < 3) errors.push("Subject is required");
  if (!message || message.length < 10) errors.push("Message must be at least 10 characters");

  if (errors.length > 0) {
    return { ok: false, error: errors[0] };
  }

  return {
    ok: true,
    data: { firstName, lastName, email, subject, message },
  };
}
