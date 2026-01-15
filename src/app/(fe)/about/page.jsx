"use client";

import { Button } from "@/components/ui/button";
import { ArrowDownToLineIcon } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { FaEnvelope, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import SkeletonProfile from "@/components/skeleton-loader/profile";
import SkeletonAbout from "@/components/skeleton-loader/about";
import SkeletonEducation from "@/components/skeleton-loader/education";
import useAbout from "@/hooks/content/useAbout";
import useEducation from "@/hooks/content/useEducation";
import useProfile from "@/hooks/content/useProfile";
import { motion } from "framer-motion";

export default function About() {
  const { theme } = useTheme();
  const { about, loading: loadingAbout } = useAbout();
  const { education, loading: loadingEducation } = useEducation();
  const { profile, loading: loadingProfile } = useProfile();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.2,
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const child = {
    hidden: { opacity: 0, scale: 1.2, filter: "blur(5px)" },
    show: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const subContainer = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const containerEdu = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delay: 1.4,
        delayChildren: 0.1,
      },
    },
  };

  const childEdu = {
    hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div>
      <div className="flex flex-col gap-2 justify-center py-2 lg:py-6">
        <div className="mt-20">
          <motion.div
            className="flex flex-col items-center justify-center gap-8"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {loadingProfile ? (
              <SkeletonProfile />
            ) : (
              profile && (
                <motion.div className="flex gap-4" variants={child}>
                  <div className="border p-2 lg:p-4 rounded-full">
                    <Image
                      src={theme === "dark" ? "/afif-light.svg" : "/afif.svg"}
                      width={240}
                      height={240}
                      alt="logo"
                      className="w-14 lg:w-12 h-12"
                    />
                  </div>
                  <div className="border p-1 lg:p-2 rounded-full">
                    <Image
                      src={profile[0].src}
                      width={64}
                      height={64}
                      alt="logo"
                      className="w-16 h-16"
                    />
                  </div>
                </motion.div>
              )
            )}

            {loadingAbout ? (
              <SkeletonAbout />
            ) : (
              about && (
                <motion.div variants={child} className="space-y-3 lg:space-y-5">
                  <div className="text-2xl lg:text-5xl font-bold">
                    <h1 className="text-center">Hi, I'm Afif Rohul Abrori</h1>
                  </div>
                  <div>
                    {about.map((item, index) => (
                      <p
                        key={index}
                        className="text-xs md:text-sm lg:text-base text-center text-neutral-600 dark:text-neutral-300 max-w-2xl"
                      >
                        {item.desc}
                      </p>
                    ))}
                  </div>
                </motion.div>
              )
            )}

            {/* Tombol */}
            <motion.div
              variants={subContainer}
              className="flex flex-col items-center md:flex-row gap-4"
            >
              <motion.div variants={child}>
                <a
                  href="/cv.pdf"
                  className="flex justify-center items-center gap-2"
                  target="_blank"
                >
                  <Button className="hover:cursor-pointer duration-200">
                    Download CV <ArrowDownToLineIcon/>
                  </Button>
                </a>
              </motion.div>
              <motion.div variants={child}>
                <div className="flex items-center gap-2">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex size-2 rounded-full bg-green-500"></span>
                  </span>
                  <p className="text-xs md:text-sm font-medium text-green-500">
                    Available for new projects
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Sosial media */}
            <motion.div variants={subContainer} className="flex gap-4">
              {[
                {
                  icon: <FaInstagram />,
                  link: "https://instagram.com/afif.rohul",
                },
                {
                  icon: <FaLinkedin />,
                  link: "https://linkedin.com/in/afifrohul",
                },
                { icon: <FaGithub />, link: "https://github.com/afifrohul" },
                {
                  icon: <FaEnvelope />,
                  link: "mailto:afifmemyself22@gmail.com",
                },
              ].map((soc, i) => (
                <motion.a
                  key={i}
                  href={soc.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={child}
                >
                  <div className="p-1 hover:bg-accent duration-200 rounded">
                    {soc.icon}
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {loadingEducation ? (
            <SkeletonEducation />
          ) : (
            education && (
              <div className="flex flex-col gap-4 mt-12 md:mt-20 max-w-2xl mx-auto">
                <motion.div
                  className="space-y-6 border-l pl-4"
                  initial="hidden"
                  animate="show"
                  variants={containerEdu}
                >
                  {education.map((item) => (
                    <motion.div
                      key={item.id}
                      className="space-y-2"
                      variants={childEdu}
                    >
                      <div className="md:grid grid-cols-3 space-y-1.5 md:space-y-0">
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-300 mt-1">
                            {item.start_month} {item.start_year} -{" "}
                            {item.end_month} {item.end_year}
                          </p>
                        </div>
                        <div className="col-span-2 space-y-1.5">
                          <h1 className="font-semibold">
                            {item.company}{" "}
                            <span className="text-sm font-normal italic">
                              - {item.location}
                            </span>
                          </h1>
                          <p className="italic font-medium text-sm text-gray-500 dark:text-gray-400">
                            {item.department}
                          </p>
                          <p className="text-xs  md:text-sm text-gray-500 dark:text-gray-400">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
