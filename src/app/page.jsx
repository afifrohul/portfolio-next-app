"use client";

import Preloader from "@/components/preloader";
import SmoothCursor from "@/components/smooth-cursor";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <SmoothCursor />
      <div>
        <Preloader />
        <div className="flex justify-center items-center w-full min-h-screen flex-col bg-muted">
          <p className="italic">Afif Rohul</p>
          <Link href="/login" className="text-xs italic">
            Login
          </Link>
        </div>
      </div>
    </>
  );
}
