"use client";

import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="font-bold text-6xl font-serif">portfolio.</h1>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/">
            <Image src={"/afif.svg"} width={14} height={14} alt="logo" />
          </Link>
          <Link
            href="/about"
            className="text font-light text-neutral-500 hover:underline transition-all duration-500"
          >
            about
          </Link>
          {/* <Link
            href="/educations"
            className="text font-light text-neutral-500 hover:underline transition-all duration-500"
          >
            educations
          </Link> */}
          <Link
            href="/experiences"
            className="text font-light text-neutral-500 hover:underline transition-all duration-500"
          >
            experiences
          </Link>
          <Link
            href="/projects"
            className="text font-light text-neutral-500 hover:underline transition-all duration-500"
          >
            projects
          </Link>
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
