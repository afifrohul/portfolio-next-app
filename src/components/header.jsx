"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "home", icon: "/afif.svg" },
    { href: "/about", label: "about" },
    { href: "/experiences", label: "experiences" },
    { href: "/projects", label: "projects" },
  ];

  return (
    <>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="font-bold text-6xl font-serif">portfolio.</h1>
        </div>
        <div className="flex items-center gap-3">
          {navItems.map((item) =>
            item.icon ? (
              <Link key={item.href} href={item.href}>
                <Image src={item.icon} width={14} height={14} alt="logo" />
              </Link>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`text font-light transition-all duration-500 hover:underline ${
                  pathname === item.href
                    ? "underline text-black"
                    : "text-neutral-500"
                }`}
              >
                {item.label}
              </Link>
            )
          )}
        </div>
      </div>
      <div>
        <Image
          src="https://etgcuhmmwxjmesnryxir.supabase.co/storage/v1/object/public/portfolio/profile/profile.png"
          width={72}
          height={72}
          alt="Profile Picture"
        />
      </div>
    </>
  );
}
