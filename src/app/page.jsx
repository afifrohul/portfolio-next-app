"use client";

import Header from "@/components/header";
import Navbar from "@/components/navbar";
import Preloader from "@/components/preloader";
import SmoothCursor from "@/components/smooth-cursor";
import ThemeToogle from "@/components/theme-toogle";

export default function Home() {
  return (
    <>
      <div className="">
        {/* <Preloader /> */}
        <div className="flex justify-center items-center w-full flex-col gap-2">
          <div className="w-full lg:w-4xl px-6 border-x-1">
            <div className="flex md:gap-6 items-center justify-between min-h-screen">
              <Navbar></Navbar>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
