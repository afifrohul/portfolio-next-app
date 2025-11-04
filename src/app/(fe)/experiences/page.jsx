"use client";

import SkeletonExperiences from "@/components/skeleton-loader/experiences";
import { Separator } from "@/components/ui/separator";
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
    <div className="flex flex-col gap-2 justify-center py-2 lg:py-6">
      <div className="mt-20 w-full lg:max-w-3xl mx-auto space-y-24">
        <div className="space-y-4 md:max-w-2xl mx-auto">
          <div className="lg:min-w-3xl text-2xl lg:text-4xl font-bold">
            <h1>Developing Websites,</h1>
            <h1>Building Experiences</h1>
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-200 text-sm lg:text-base">
              I have extensive experience in website development. This
              experience includes work for organizations, independent study, and
              internships. Here are some of my most notable experiences.
            </p>
          </div>
        </div>
        <div>
          {loadingExperience ? (
            <SkeletonExperiences />
          ) : (
            experience && (
              <div className="flex flex-col gap-4 mt-20 md:max-w-2xl mx-auto">
                <div className="w-fit space-y-1 mb-4">
                  <h1 className="font-semibold text-base md:text-lg">
                    Professional Experiences
                  </h1>
                  <Separator></Separator>
                </div>
                <div className="space-y-6 border-l-2 pl-4">
                  {experience.map((item) => (
                    <div key={item.id} className="space-y-2">
                      <div className="flex justify-between items-center text-sm md:text-base">
                        <h1 className="font-semibold">{item.company}</h1>
                        <div className="h-px bg-gray-200 dark:bg-gray-700 grow mx-4"></div>
                        <h1 className="text-sm font-medium italic border-r-2 pr-2 text-sm md:text-base">
                          {item.start_month} {item.start_year} -{" "}
                          {item.end_month} {item.end_year}
                        </h1>
                      </div>
                      <p className="text-xs md:text-base italic">{item.role}</p>
                      <p className="text-xs  md:text-sm text-gray-500 dark:text-gray-200">
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
