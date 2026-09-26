type IconProps = { className?: string };

export function InfoIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.25} className={className} aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 11v6" strokeLinecap="round" />
      <circle cx="12" cy="7.75" r="0.6" fill="currentColor" />
    </svg>
  );
}

export function BasketballIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.25} className={className} aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2v20M2 12h20" />
      <path d="M5.2 4.7A10 10 0 0 1 8 12a10 10 0 0 1-2.8 7.3" />
      <path d="M18.8 4.7A10 10 0 0 0 16 12a10 10 0 0 0 2.8 7.3" />
    </svg>
  );
}

export function SparkleIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" fill="currentColor" className={className} aria-hidden>
      <path d="M20 0 L22.2 17.8 L40 20 L22.2 22.2 L20 40 L17.8 22.2 L0 20 L17.8 17.8 Z" />
      <path d="M8 8 L32 32 M32 8 L8 32" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function SmileyIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.3} className={className} aria-hidden>
      <circle cx="12" cy="12" r="10.5" />
      <circle cx="9" cy="9.5" r="0.7" fill="currentColor" />
      <circle cx="15" cy="9.5" r="0.7" fill="currentColor" />
      <path d="M7.5 13.5a5 5 0 0 0 9 0" strokeLinecap="round" />
    </svg>
  );
}

export function ArrowUpRightIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className={className} aria-hidden>
      <path d="M7 17 17 7M8 7h9v9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowCircleIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className={className} aria-hidden>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M8 12h8M12.5 8.5 16 12l-3.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
