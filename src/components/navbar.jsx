"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import ThemeToogle from "@/components/theme-toogle";

export default function Navbar() {
  const pathname = usePathname();
  const navItems = [
    { href: "/", label: "home" },
    { href: "/about", label: "who i'm" },
    { href: "/projects", label: "my work" },
    { href: "/experiences", label: "experiences" },
  ];
  return (
    <div className="w-full flex justify-center">
      <nav className="fixed top-6 bg-background mx-auto rounded-full bg-white/30 dark:bg-black/30 backdrop-blur-xs">
        <div className="px-5 py-2">
          <div className="flex items-center justify-center gap-4 md:gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-xs lg:text-sm transition-all duration-300 hover:text-primary ${
                  pathname === item.href
                    ? " font-medium text-primary"
                    : "text-neutral-400"
                }`}
              >
                {item.label}
              </Link>
            ))}
            {/* <ModeToggle></ModeToggle> */}
            <ThemeToogle></ThemeToogle>
          </div>
        </div>
      </nav>
    </div>
  );
}
