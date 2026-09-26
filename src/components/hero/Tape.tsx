// Strip of masking tape with torn ends.
export default function Tape({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`grain bg-[#ecdcbd] shadow-[0_1px_3px_rgba(0,0,0,0.12)] ${className ?? ""}`}
      style={{
        clipPath:
          "polygon(0 3%, 12% 0, 25% 2%, 40% 0, 55% 3%, 70% 0, 85% 2%, 100% 0, 100% 100%, 88% 98%, 72% 100%, 58% 97%, 42% 100%, 28% 98%, 14% 100%, 0 97%)",
      }}
    />
  );
}
