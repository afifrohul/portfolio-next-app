"use client";

import { TimelineExperience } from "@/components/timeline-experience";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Experiences() {
  const [experience, setExperience] = useState([]);
  const [loadingExperience, setLoadingExperience] = useState(true);

  useEffect(() => {
    async function fetchExperience() {
      try {
        const res = await axios.get("/internal/experiences");
        setExperience(res.data);
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
        setLoadingExperience(false);
      }
    }

    fetchExperience();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-2 justify-center py-6">
        <div className="rounded-xl bg-gray-200 w-fit px-3 py-1 mx-auto">
          <p className="text-xs font-medium">Experience</p>
        </div>

        {!loadingExperience && (
          <h1 className="font-bold text-base lg:text-3xl text-center mb-4">
            Professional Experiences
          </h1>
        )}

        {loadingExperience ? (
          <div className="space-y-4">
            <div className="flex flex-col gap-2 w-full">
              <Skeleton className="h-8 w-[100%]" />
              <Skeleton className="h-4 w-[100%]" />
              <Skeleton className="h-4 w-[60%]" />
              <Skeleton className="h-4 w-[90%]" />
              <Skeleton className="h-4 w-[90%]" />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <Skeleton className="h-8 w-[100%]" />
              <Skeleton className="h-4 w-[100%]" />
              <Skeleton className="h-4 w-[60%]" />
              <Skeleton className="h-4 w-[90%]" />
              <Skeleton className="h-4 w-[90%]" />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <Skeleton className="h-8 w-[100%]" />
              <Skeleton className="h-4 w-[80%]" />
              <Skeleton className="h-4 w-[60%]" />
              <Skeleton className="h-4 w-[90%]" />
              <Skeleton className="h-4 w-[90%]" />
            </div>
          </div>
        ) : (
          <TimelineExperience timelineData={experience} />
        )}
      </div>
    </>
  );
}
