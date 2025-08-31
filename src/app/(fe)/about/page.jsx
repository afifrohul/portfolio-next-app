"use client";

import { TimelineEducation } from "@/components/timeline-education";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { ArrowDownToLineIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function About() {
  const [about, setAbout] = useState([]);
  const [loadingAbout, setLoadingAbout] = useState(true);
  const [education, setEducation] = useState([]);
  const [loadingEducation, setLoadingEducation] = useState(true);

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

    fetchAbout();
    fetchEducation();
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-2 justify-center py-2 lg:py-6">
        <div className="rounded-xl bg-gray-200 w-fit px-3 py-1">
          <p className="text-xs font-medium">About</p>
        </div>

        {!loadingAbout && (
          <h1 className="font-bold text-base lg:text-3xl">
            Passionate about developing impactful websites
          </h1>
        )}

        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-3">
            {loadingAbout ? (
              <div className="flex flex-col gap-2 w-full">
                <Skeleton className="h-8 w-[100%]" />
                <Skeleton className="h-4 w-[80%]" />
                <Skeleton className="h-4 w-[60%]" />
                <Skeleton className="h-4 w-[90%]" />
                <Skeleton className="h-4 w-[90%]" />
              </div>
            ) : (
              <>
                {about.map((item) => (
                  <p
                    key={item.id}
                    className="text-xs md:text-base text-neutral-500"
                  >
                    {item.desc}
                  </p>
                ))}
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
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 justify-center py-6">
        <div className="rounded-xl bg-gray-200 w-fit px-3 py-1 mx-auto">
          <p className="text-xs font-medium">Education</p>
        </div>

        {!loadingEducation && (
          <h1 className="font-bold text-base lg:text-3xl text-center mb-2 lg:mb-4">
            Academic Journey
          </h1>
        )}

        {loadingEducation ? (
          <div className="flex flex-col gap-2 w-full">
            <Skeleton className="h-8 w-[80%]" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[60%]" />
            <Skeleton className="h-4 w-[90%]" />
            <Skeleton className="h-4 w-[90%]" />
          </div>
        ) : (
          <TimelineEducation timelineData={education} />
        )}
      </div>
    </div>
  );
}
