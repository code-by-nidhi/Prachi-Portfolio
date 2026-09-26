export default function Flower({ className }: { className?: string }) {
  const petals = [0, 72, 144, 216, 288];

  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      {petals.map((deg) => (
        <g key={deg} transform={`rotate(${deg} 50 50)`}>
          <ellipse cx="50" cy="27" rx="15" ry="22" fill="#f23d5c" />
          <path d="M50 44 L50 14" stroke="#ff8aa0" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M50 42 L44 20 M50 42 L56 20" stroke="#ff8aa0" strokeWidth="1.1" strokeLinecap="round" />
        </g>
      ))}
      <circle cx="50" cy="50" r="8" fill="#ffd23f" />
      <circle cx="50" cy="50" r="4" fill="#ffb800" />
    </svg>
  );
}
