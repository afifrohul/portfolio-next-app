"use client";

import Header from "@/components/header";
import Preloader from "@/components/preloader";
import SmoothCursor from "@/components/smooth-cursor";

export default function Home() {
  return (
    <>
      <div>
        <Preloader />
        <div className="flex justify-center items-center w-full flex-col gap-2">
          <div className="w-full lg:w-3xl px-6">
            <div className="flex md:gap-6 items-center justify-between min-h-screen">
              <Header></Header>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
