import { useState, type FormEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Gift } from "lucide-react";
import { Reveal } from "../components/ui/Reveal";
import { Button } from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import { ApiError } from "../lib/api";

export function Signup() {
  const { signup, user } = useAuth();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (user) return <Navigate to="/order" replace />;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await signup(firstName, lastName, email, password, phone);
      navigate("/order", { replace: true });
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Signup failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="flex min-h-[85vh] items-center justify-center px-3 py-32 sm:px-4">
      <Reveal className="w-full max-w-md">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-copper">
          Join the sanctuary
        </p>
        <h1 className="mt-3 font-display text-4xl text-espresso">Create account</h1>
        <p className="mt-2 text-sm text-mocha/70">
          Members get exclusive offers, saved orders, and reward points.
        </p>

        <div className="mt-6 flex items-start gap-3 rounded-xl border border-copper/20 bg-copper/5 p-4">
          <Gift size={18} className="mt-0.5 shrink-0 text-copper" />
          <div className="text-sm">
            <p className="font-medium text-espresso">Welcome offer</p>
            <p className="text-mocha/70">10% off your first order when you sign up.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {error && (
            <p className="rounded-xl bg-copper/10 px-4 py-3 text-sm text-espresso">
              {error}
            </p>
          )}
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="First name" id="firstName" value={firstName} onChange={setFirstName} required />
            <Field label="Last name" id="lastName" value={lastName} onChange={setLastName} required />
          </div>
          <Field label="Email" id="email" type="email" value={email} onChange={setEmail} required />
          <Field label="Phone" id="phone" type="tel" value={phone} onChange={setPhone} required placeholder="(518) 555-0100" />
          <Field label="Password" id="password" type="password" value={password} onChange={setPassword} required />
          <p className="text-xs text-mocha/50">Minimum 6 characters</p>
          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? "Creating account..." : "Create account"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-mocha/70">
          Already a member?{" "}
          <Link to="/login" className="font-medium text-copper hover:underline">
            Sign in
          </Link>
        </p>
      </Reveal>
    </section>
  );
}

function Field({
  label,
  id,
  type = "text",
  value,
  onChange,
  required,
  placeholder,
}: {
  label: string;
  id: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-mocha/60">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-espresso/10 bg-oat px-4 py-3 text-sm outline-none focus:border-copper focus:ring-2 focus:ring-copper/20"
      />
    </div>
  );
}
