"use client";

import Preloader from "@/components/preloader";
import SmoothCursor from "@/components/smooth-cursor";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <SmoothCursor />
      <div>
        <Preloader />
        <div className="flex justify-center items-center w-full min-h-screen flex-col gap-2 bg-muted">
          <div className="flex justify-center items-center gap-3">
            <Image src={"/afif.svg"} width={18} height={18} alt="logo"></Image>
            <p className="italic">Afif Rohul</p>
          </div>
          <Link href="/login" className="text-xs italic">
            Login
          </Link>
        </div>
      </div>
    </>
  );
}
