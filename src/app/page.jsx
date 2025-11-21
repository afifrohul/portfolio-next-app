"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/navbar";
import { cn } from "@/lib/utils";
import { GridPattern } from "@/components/ui/grid-pattern";
import { useEffect, useState } from "react";
import useAbout from "@/hooks/content/useAbout";
import useEducation from "@/hooks/content/useEducation";
import useExperiences from "@/hooks/content/useExperiences";
import useProfile from "@/hooks/content/useProfile";
import useProject from "@/hooks/content/useProject";
import SimpleLoader from "@/components/simple-loader";
import Image from "next/image";
import { useTheme } from "next-themes";

export default function Home() {
  const { theme } = useTheme();

  const [isClientChecked, setIsClientChecked] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const { isLoading: loadingAbout } = useAbout();
  const { isLoading: loadingEducation } = useEducation();
  const { isLoading: loadingExperience } = useExperiences();
  const { isLoading: loadingProfile } = useProfile();
  const { isLoading: loadingProject } = useProject();

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("hasLoaded");
    if (hasLoaded) setIsReady(true);
    else setShowLoader(true);
    setIsClientChecked(true);
  }, []);

  useEffect(() => {
    if (
      showLoader &&
      !loadingAbout &&
      !loadingEducation &&
      !loadingExperience &&
      !loadingProfile &&
      !loadingProject
    ) {
      sessionStorage.setItem("hasLoaded", "true");
      setTimeout(() => setIsFadingOut(true), 100);
      const timeout = setTimeout(() => {
        setShowLoader(false);
        setIsReady(true);
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [
    showLoader,
    loadingAbout,
    loadingEducation,
    loadingExperience,
    loadingProfile,
    loadingProject,
  ]);

  if (!isClientChecked) return null;
  if (showLoader && !isReady) return <SimpleLoader fadingOut={isFadingOut} />;

  return (
    <motion.div
      key="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden border bg-background"
    >
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
        <Navbar />
        <div className="w-4xl border-x-1 mx-auto">
          <div className="w-full min-h-screen flex justify-center items-center">
            <motion.div
              initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="flex items-center justify-around gap-12 md:gap-32 lg:gap-0 lg:w-full"
            >
              <div>
                <p className="text-xs md:text-base italic ">2021</p>
                <p className="text-xs md:text-base italic ">
                  / {new Date().getFullYear() % 100}
                </p>
              </div>
              <Image
                src={
                  theme === "dark"
                    ? "/PORTFOLIO_LIGHT.png"
                    : "/PORTFOLIO_DARK.png"
                }
                alt="Portfolio"
                width={720}
                height={473}
                className="w-24 lg:w-64"
              />
              <div className="font-mono">
                <p className="text-xs md:text-base italic">web</p>
                <p className="text-xs md:text-base italic">developer</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
