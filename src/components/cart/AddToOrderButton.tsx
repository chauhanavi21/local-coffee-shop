import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Check, Plus } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import type { MenuItem } from "../../types/menu";

export function AddToOrderButton({ item }: { item: MenuItem }) {
  const { user } = useAuth();
  const cart = useCart();
  const navigate = useNavigate();
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const handleClick = async () => {
    if (!user) {
      navigate("/login", { state: { from: "/menu" } });
      return;
    }

    setAdding(true);
    try {
      await cart.addItem(item, { quantity: 1 });
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="mt-4 flex items-center gap-3">
      <button
        type="button"
        disabled={adding}
        onClick={handleClick}
        className="inline-flex items-center gap-2 rounded-full bg-copper px-4 py-2 text-xs font-medium text-parchment transition-transform hover:scale-105 active:scale-95 disabled:opacity-50"
      >
        {added ? (
          <>
            <Check size={14} />
            Added
          </>
        ) : (
          <>
            <Plus size={14} />
            {adding ? "Adding..." : "Add to order"}
          </>
        )}
      </button>
      {user && added && (
        <Link to="/order" className="text-xs font-medium text-copper hover:underline">
          View order
        </Link>
      )}
    </div>
  );
}
