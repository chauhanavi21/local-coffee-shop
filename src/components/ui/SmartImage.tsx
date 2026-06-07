import { useState } from "react";

/** Remote fallback only if local file missing (e.g. fresh clone before assets downloaded) */
export const imageFallbacks: Record<string, string> = {
  "/images/hero-poster.jpg":
    "https://images.pexels.com/photos/2396220/pexels-photo-2396220.jpeg?auto=compress&cs=tinysrgb&w=1400",
  "/images/menu-cold-brew.jpg":
    "https://images.pexels.com/photos/1405750/pexels-photo-1405750.jpeg?auto=compress&cs=tinysrgb&w=400",
  "/images/menu-croissant.jpg":
    "https://images.pexels.com/photos/776314/pexels-photo-776314.jpeg?auto=compress&cs=tinysrgb&w=400",
};

const PLACEHOLDER =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
      <rect fill="#f4ece3" width="400" height="300"/>
      <text x="200" y="150" text-anchor="middle" fill="#4a3728" font-family="sans-serif" font-size="14">Professor Java's</text>
    </svg>`,
  );

interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  "aria-hidden"?: boolean;
}

export function SmartImage({
  src,
  alt,
  className = "",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 33vw",
  "aria-hidden": ariaHidden,
}: SmartImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      src={currentSrc}
      alt={alt}
      aria-hidden={ariaHidden}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      sizes={sizes}
      onLoad={() => setLoaded(true)}
      onError={() => {
        if (failed) return;
        setLoaded(false);
        const remote = imageFallbacks[src];
        if (remote && currentSrc !== remote) {
          setCurrentSrc(remote);
          return;
        }
        if (currentSrc !== PLACEHOLDER) {
          setFailed(true);
          setCurrentSrc(PLACEHOLDER);
        }
      }}
      className={`smart-image h-full w-full object-cover ${
        loaded ? "smart-image-loaded" : ""
      } ${className}`}
    />
  );
}

export function resolveImage(key: string): string {
  return key;
}
