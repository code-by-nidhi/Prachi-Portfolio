export default function Paperclip({ className }: { className?: string }) {
  const d = "M30 3 H104 a15 15 0 0 1 0 30 H14 a11 11 0 0 1 0 -22 H96 a6 6 0 0 1 0 12 H30";

  return (
    <svg viewBox="0 0 122 36" fill="none" className={className} aria-hidden>
      <path d={d} stroke="#7f7f7f" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} stroke="#e2e2e2" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
