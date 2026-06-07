import { useState, type FormEvent } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Reveal } from "../components/ui/Reveal";
import { Button } from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import { ApiError } from "../lib/api";
import { validateLoginForm } from "../lib/authValidation";

export function Login() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string })?.from || "/order";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (user) return <Navigate to={from} replace />;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationError = validateLoginForm({ email, password });
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setSubmitting(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="flex min-h-[85vh] items-center justify-center px-3 py-32 sm:px-4">
      <Reveal className="w-full max-w-md">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-copper">
          Member login
        </p>
        <h1 className="mt-3 font-display text-4xl text-espresso">Welcome back</h1>
        <p className="mt-2 text-sm text-mocha/70">
          Sign in to save your order, unlock member offers, and earn rewards.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {error && (
            <p className="rounded-xl bg-copper/10 px-4 py-3 text-sm text-espresso">
              {error}
            </p>
          )}
          <Field
            label="Email"
            id="email"
            type="email"
            value={email}
            onChange={setEmail}
            required
          />
          <Field
            label="Password"
            id="password"
            type="password"
            value={password}
            onChange={setPassword}
            required
          />
          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-mocha/70">
          New here?{" "}
          <Link to="/signup" className="font-medium text-copper hover:underline">
            Create an account
          </Link>
        </p>
      </Reveal>
    </section>
  );
}

function Field({
  label,
  id,
  type,
  value,
  onChange,
  required,
}: {
  label: string;
  id: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-mocha/60"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full rounded-xl border border-espresso/10 bg-oat px-4 py-3 text-sm outline-none focus:border-copper focus:ring-2 focus:ring-copper/20"
      />
    </div>
  );
}
