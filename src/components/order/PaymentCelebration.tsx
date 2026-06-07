export function PaymentCelebration({ size = "lg" }: { size?: "sm" | "lg" }) {
  const emojiSize = size === "lg" ? "text-6xl" : "text-4xl";
  const boxSize = size === "lg" ? "h-24 w-24" : "h-16 w-16";

  return (
    <div className={`relative mx-auto ${boxSize}`} aria-hidden>
      <span
        className={`animate-celebrate absolute inset-0 flex items-center justify-center ${emojiSize}`}
      >
        🎉
      </span>
      {["🎊", "✨", "🥳", "🎈"].map((emoji, i) => (
        <span
          key={emoji}
          className="confetti-piece absolute text-xl"
          style={{
            left: `${10 + i * 22}%`,
            top: `${i % 2 === 0 ? 0 : 20}%`,
            animationDelay: `${i * 0.12}s`,
          }}
        >
          {emoji}
        </span>
      ))}
    </div>
  );
}
