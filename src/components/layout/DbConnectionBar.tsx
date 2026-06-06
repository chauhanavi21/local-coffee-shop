import { Database } from "lucide-react";
import { MONGODB_URI } from "../../lib/config";

type DbConnectionBarProps = {
  variant?: "header" | "body";
};

export function DbConnectionBar({ variant = "body" }: DbConnectionBarProps) {
  const isHeader = variant === "header";

  return (
    <div
      className={
        isHeader
          ? "border-b border-espresso/10 bg-oat/90"
          : "border-b border-espresso/5 bg-oat/60"
      }
    >
      <div className="page-shell flex items-center gap-2 py-1.5">
        <Database
          size={12}
          className={`shrink-0 ${isHeader ? "text-copper" : "text-mocha/70"}`}
          aria-hidden
        />
        <p
          className={`truncate font-mono text-[10px] sm:text-[11px] ${
            isHeader ? "text-mocha/80" : "text-mocha/65"
          }`}
          title={MONGODB_URI}
        >
          {MONGODB_URI}
        </p>
      </div>
    </div>
  );
}
