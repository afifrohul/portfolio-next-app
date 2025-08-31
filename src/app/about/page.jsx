"use client";

import Header from "@/components/header";
import { TimelineEducation } from "@/components/timeline-education";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
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

  const timelineData = [
    {
      date: "1956",
      title: "The Birth of AI",
      content:
        "The term 'Artificial Intelligence' was coined at the Dartmouth Conference, marking the official beginning of AI as a field. John McCarthy, Marvin Minsky, Nathaniel Rochester, and Claude Shannon organized this seminal event, setting the stage for decades of research and development.",
    },
  ];

  return (
    <div className="flex justify-center items-center w-full flex-col gap-2 bg-muted">
      <div className="w-3xl flex flex-col gap-8 min-h-screen">
        <div className="flex gap-6 items-center justify-between pt-8">
          <Header />
        </div>
        <Separator />
        <div className="flex flex-col gap-2 justify-center py-6">
          <div className="rounded-xl bg-gray-200 w-fit px-3 py-1">
            <p className="text-xs font-medium">About</p>
          </div>

          {!loadingAbout && (
            <h1 className="font-bold text-3xl">
              Passionate about developing impactful website
            </h1>
          )}

          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-3">
              {loadingAbout ? (
                <div className="flex flex-col gap-2 w-full">
                  <Skeleton className="h-8 w-[80%]" />
                  <Skeleton className="h-4 w-[80%]" />
                  <Skeleton className="h-4 w-[60%]" />
                  <Skeleton className="h-4 w-[90%]" />
                  <Skeleton className="h-4 w-[90%]" />
                </div>
              ) : (
                <>
                  {about.map((item) => (
                    <p key={item.id} className="text-neutral-500">
                      {item.desc}
                    </p>
                  ))}
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
            <h1 className="font-bold text-3xl text-center">Academic Journey</h1>
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
    </div>
  );
}
