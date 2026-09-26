import Link from "next/link";
import { site } from "@/data/site";
import { BasketballIcon, InfoIcon } from "@/components/icons";

const navItems = [
  { href: "/about", label: "About me", Icon: InfoIcon },
  { href: "/play", label: "Play", Icon: BasketballIcon },
];

export default function Navbar() {
  return (
    <header className="bg-surface p-2 sm:p-3">
      <nav className="flex gap-2 sm:gap-3 h-[84px] sm:h-[125px]">
        <Link
          href="/"
          className="flex-1 min-w-0 flex items-center bg-white rounded px-4 sm:px-20 font-serif text-xl sm:text-[28px] text-[#333] tracking-tight whitespace-nowrap"
        >
          {site.name}
        </Link>

        {navItems.map(({ href, label, Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex flex-col items-center justify-center gap-1.5 sm:gap-2 bg-white rounded px-3 sm:px-10 font-serif text-sm sm:text-xl text-[#222] whitespace-nowrap transition-colors hover:bg-neutral-50"
          >
            <Icon className="size-6 sm:size-7" />
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
