"use client";

import Navbar from "@/components/navbar";
import { Roboto } from "next/font/google";
import { cn } from "@/lib/utils";
import { GridPattern } from "@/components/ui/grid-pattern";
import Preloader from "@/components/preloader";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});
export default function Home() {
  return (
    <>
      <Preloader></Preloader>
      <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden border bg-background">
        <GridPattern
          width={40}
          height={40}
          x={-1}
          y={-1}
          squares={[
            [4, 4],
            [5, 1],
            [8, 2],
            [5, 3],
            [5, 5],
          ]}
          className={cn(
            "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
            "inset-x-0 inset-y-[-45%] h-[200%] skew-y-12"
          )}
        />
        <div className="relative z-10">
          <Navbar className=""></Navbar>
          <div className="w-4xl border-x-1 mx-auto">
            <div className="w-full min-h-screen flex justify-center items-center">
              <div>
                <p className="text-xs md:text-base italic">/port·fow·lee·ew/</p>
                <h1
                  className={`text-5xl md:text-7xl lg:text-8xl font-medium font-serif`}
                >
                  portfolio.
                </h1>
                <div className="mt-3 md:mt-6 lg:mt-8 flex justify-between items-center font-mono">
                  {/* <p className="">afif rohul abrori</p> */}
                  <p className="text-xs md:text-base italic">web developer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
