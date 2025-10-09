"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Header() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "home", icon: "/afif.svg" },
    { href: "/about", label: "about" },
    { href: "/experiences", label: "experiences" },
    { href: "/projects", label: "projects" },
  ];

  useEffect(() => {
    async function fetchProfile() {
      try {
        setLoading(true);
        const res = await axios.get("/internal/profiles");
        const firstSrc = res.data?.[0]?.src || null;
        setProfile(firstSrc);
      } catch (err) {
        if (err.response) {
          console.error(
            "Server error:",
            err.response.status,
            err.response.data
          );
        } else if (err.request) {
          console.error("No response received:", err.request);
        } else {
          console.error("Error setting up request:", err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-3 md:gap-6">
        <div>
          <h1 className="font-bold text-3xl lg:text-6xl font-serif">
            portfolio.
          </h1>
        </div>
        <div className="flex items-center gap-3">
          {navItems.map((item) =>
            item.icon ? (
              <Link key={item.href} href={item.href}>
                <Image
                  src={item.icon}
                  width={14}
                  height={14}
                  alt="logo"
                  className="w-3 h-3 md:w-6 md:h-6"
                />
              </Link>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`text-xs lg:text-base font-light transition-all duration-500 hover:underline ${
                  pathname === item.href
                    ? "underline italic text-black"
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
        {loading ? (
          <Skeleton className="w-12 h-12 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full" />
        ) : (
          profile && (
            <Image
              src={profile}
              alt="Profile Picture"
              width={72}
              height={72}
              className="w-12 h-12 sm:w-24 sm:h-24 md:w-32 md:h-32 object-cover rounded-full"
            />
          )
        )}
      </div>
    </>
  );
}
