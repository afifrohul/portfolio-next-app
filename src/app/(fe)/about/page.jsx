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

export default function About() {
  const { theme } = useTheme();
  const { about, loading: loadingAbout } = useAbout();
  const { education, loading: loadingEducation } = useEducation();
  const { profile, loading: loadingProfile } = useProfile();

  return (
    <div>
      <div className="flex flex-col gap-2 justify-center py-2 lg:py-6">
        <div className="mt-20">
          <div className="flex flex-col items-center justify-center gap-8">
            {loadingProfile ? (
              <SkeletonProfile />
            ) : (
              profile && (
                <div className="flex gap-4">
                  <div className="border p-2 lg:p-4 rounded-full">
                    <Image
                      src={theme === "dark" ? "/afif-light.svg" : "/afif.svg"}
                      width={240}
                      height={240}
                      alt="logo"
                      className=" w-14 lg:w-12 h-12"
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
                </div>
              )
            )}
            {loadingAbout ? (
              <SkeletonAbout />
            ) : (
              about && (
                <div className="space-y-3 lg:space-y-5">
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
                  <div className="flex flex-col md:flex-row justify-center items-center gap-2 lg:gap-4">
                    <a
                      href="/cv.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className=" flex items-center gap-2 w-fit"
                    >
                      <Button className="hover:cursor-pointer" size="sm">
                        <p className="text-xs md:text-sm">Download CV</p>
                        <ArrowDownToLineIcon className="h-4"></ArrowDownToLineIcon>
                      </Button>
                    </a>
                    <div className="flex justify-center items-center gap-2 hover:bg-green-100 dark:hover:bg-green-900 p-2 rounded-md hover:cursor-pointer duration-300">
                      <span className="relative flex size-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex size-2 rounded-full bg-green-500"></span>
                      </span>
                      <p className="text-xs md:text-sm font-medium text-green-500">
                        Available for new projects
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div className="flex flex-col gap-4">
                      <div className="flex gap-4 ">
                        <div className="p-1 hover:bg-accent duration-200 rounded">
                          <a
                            href="https://www.instagram.com/afif.rohul/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className=""
                          >
                            <FaInstagram className="text-xl text-gray-600 dark:text-gray-200"></FaInstagram>
                          </a>
                        </div>
                        <div className="p-1 hover:bg-accent duration-200 rounded">
                          <a
                            href="https://www.linkedin.com/in/afifrohul/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className=""
                          >
                            <FaLinkedin className="text-xl text-gray-600 dark:text-gray-200"></FaLinkedin>
                          </a>
                        </div>
                        <div className="p-1 hover:bg-accent duration-200 rounded">
                          <a
                            href="https://github.com/afifrohul"
                            target="_blank"
                            rel="noopener noreferrer"
                            className=""
                          >
                            <FaGithub className="text-xl text-gray-600 dark:text-gray-200"></FaGithub>
                          </a>
                        </div>
                        <div className="p-1 hover:bg-accent duration-200 rounded">
                          <a
                            href="mailto:afifmemyself22@gmail.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className=""
                          >
                            <FaEnvelope className="text-xl text-gray-600 dark:text-gray-200"></FaEnvelope>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>

          {loadingEducation ? (
            <SkeletonEducation />
          ) : (
            education && (
              <div className="flex flex-col gap-4 mt-12 md:mt-20 max-w-2xl mx-auto">
                <div className="w-fit space-y-1 mb-4">
                  <h1 className="font-semibold text-base md:text-lg">
                    Educational level
                  </h1>
                  <Separator></Separator>
                </div>
                <div className="space-y-6 border-l-2 pl-4">
                  {education.map((item) => (
                    <div key={item.id} className="space-y-2">
                      <div className="flex justify-between items-center text-sm md:text-base">
                        <h1 className=" font-semibold">
                          {item.company} -{" "}
                          <span className="text-gray-500 dark:text-gray-200">
                            {item.location}
                          </span>
                        </h1>
                        <div className="h-px bg-gray-200 dark:bg-gray-700 grow mx-4"></div>
                        <h1 className="text-sm font-medium italic border-r-2 pr-2 text-sm md:text-base">
                          {item.start_month} {item.start_year} -{" "}
                          {item.end_month} {item.end_year}
                        </h1>
                      </div>
                      <p className="text-xs md:text-base italic">
                        {item.department}
                      </p>
                      <p className="text-xs md:text-sm text-gray-500 dark:text-gray-200">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
