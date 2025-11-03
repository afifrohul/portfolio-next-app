import { Button } from "@/components/ui/button";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
// import { ModeToggle } from "@/components/mode-toggle";
import ThemeToogle from "@/components/theme-toogle";

export default function Navbar() {
  const pathname = usePathname();
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/experiences", label: "Experiences" },
    { href: "/projects", label: "Projects" },
  ];
  return (
    <div className="min-h-screen w-full flex justify-center">
      <nav className="fixed top-6 bg-background border dark:border-slate-700/70  mx-auto rounded-full shadow-md">
        <div className="px-5 py-2">
          <div className="flex items-center gap-4">
            {/* <Image
              src={"/afif.svg"}
              width={14}
              height={14}
              alt="logo"
              className="w-3 h-3 md:w-4 md:h-4"
            /> */}
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-xs lg:text-sm font-medium transition-all duration-200 hover:text-primary ${
                  pathname === item.href ? "  text-primary" : "text-neutral-400"
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
