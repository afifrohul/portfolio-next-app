"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { ArrowDownToLineIcon } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaEnvelope, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";

export default function About() {
  const [about, setAbout] = useState([]);
  const [loadingAbout, setLoadingAbout] = useState(true);

  const [education, setEducation] = useState([]);
  const [loadingEducation, setLoadingEducation] = useState(true);

  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  const { theme } = useTheme();

  console.log(about);

  useEffect(() => {
    async function fetchAbout() {
      try {
        const res = await axios.get("/internal/abouts");
        setAbout(res.data);
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
        setLoadingAbout(false);
      }
    }

    async function fetchEducation() {
      try {
        const res = await axios.get("/internal/educations");
        setEducation(res.data);
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
        setLoadingEducation(false);
      }
    }

    async function fetchProfile() {
      try {
        setLoadingProfile(true);
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
        setLoadingProfile(false);
      }
    }

    fetchProfile();
    fetchAbout();
    fetchEducation();
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-2 justify-center py-2 lg:py-6">
        <div className="mt-20">
          <div className="flex flex-col items-center justify-center gap-8">
            {loadingProfile ? (
              <div className="flex gap-4">
                <Skeleton className="w-12 h-12 sm:w-24 sm:h-24 md:w-20 md:h-20 rounded-full" />
                <Skeleton className="w-12 h-12 sm:w-24 sm:h-24 md:w-20 md:h-20 rounded-full" />
              </div>
            ) : (
              profile && (
                <div className="flex gap-4">
                  <div className="border p-4 rounded-full">
                    <Image
                      src={theme === "dark" ? "/afif-light.svg" : "/afif.svg"}
                      width={14}
                      height={14}
                      alt="logo"
                      className="w-3 h-3 md:w-12 md:h-12"
                    />
                  </div>
                  <div className="border p-2 rounded-full">
                    <Image
                      src={profile}
                      width={64}
                      height={64}
                      alt="logo"
                      className="w-3 h-3 md:w-16 md:h-16"
                    />
                  </div>
                </div>
              )
            )}
            {loadingAbout ? (
              <div className="mx-auto space-y-5">
                <Skeleton className="w-xl h-12 mx-auto" />
                <div className="mt-4 space-y-2">
                  <Skeleton className="w-[672px] h-3 mx-auto" />
                  <Skeleton className="w-[700px] h-3 mx-auto" />
                  <Skeleton className="w-[690px] h-3 mx-auto" />
                  <Skeleton className="w-[651px] h-3 mx-auto" />
                  <Skeleton className="w-[688px] h-3 mx-auto" />
                  <Skeleton className="w-[500px] h-3 mx-auto" />
                  <Skeleton className="w-[300px] h-3 mx-auto" />
                </div>
                <div className="flex gap-4 justify-center items-center">
                  <Skeleton className="w-[150px] h-8" />
                  <Skeleton className="w-[150px] h-8" />
                </div>
                <div className="flex gap-4 justify-center items-center">
                  <Skeleton className="w-4 h-4 rounded-xs" />
                  <Skeleton className="w-4 h-4 rounded-xs" />
                  <Skeleton className="w-4 h-4 rounded-xs" />
                  <Skeleton className="w-4 h-4 rounded-xs" />
                </div>
              </div>
            ) : (
              about && (
                <div className="space-y-5">
                  <div className="text-5xl font-bold">
                    <h1 className="text-center">Hi, I'm Afif Rohul Abrori</h1>
                    {/* <h1 className="text-center">Website Developer</h1> */}
                  </div>
                  <div>
                    {about.map((item, index) => (
                      <p
                        key={index}
                        className="text-center text-neutral-600 dark:text-neutral-300 max-w-2xl"
                      >
                        {item.desc}
                      </p>
                    ))}
                  </div>
                  <div className="flex justify-center items-center gap-4">
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
                      <p className="text-sm font-medium text-green-500">
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
            <div className="flex flex-col gap-4 mt-20 max-w-2xl mx-auto">
              <div className="w-fit space-y-1 mb-4">
                <Skeleton className="w-[130px] h-6 rounded-sm" />
                <Separator></Separator>
              </div>
              <div className="space-y-6 border-l-2 pl-4">
                <div className="space-y-2">
                  <Skeleton className="w-full h-3" />
                  <Skeleton className="w-[340px] h-3" />
                  <Skeleton className="w-full h-2" />
                  <Skeleton className="w-full h-2" />
                  <Skeleton className="w-[400px] h-2" />
                </div>
              </div>
            </div>
          ) : (
            education && (
              <div className="flex flex-col gap-4 mt-20 max-w-2xl mx-auto">
                <div className="w-fit space-y-1 mb-4">
                  <h1 className="font-semibold text-lg">Educational level</h1>
                  <Separator></Separator>
                </div>
                <div className="space-y-6 border-l-2 pl-4">
                  {education.map((item) => (
                    <div key={item.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h1 className="font-semibold">
                          {item.company} -{" "}
                          <span className="text-gray-500 dark:text-gray-200">
                            {item.location}
                          </span>
                        </h1>
                        <div className="h-px bg-gray-200 dark:bg-gray-700 grow mx-4"></div>
                        <h1 className="text-sm font-medium italic border-r-2 pr-2">
                          {item.start_month} {item.start_year} -{" "}
                          {item.end_month} {item.end_year}
                        </h1>
                      </div>
                      <p className="italic">{item.department}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-200">
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
