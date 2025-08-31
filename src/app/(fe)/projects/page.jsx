"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Projects() {
  const [project, setProject] = useState([]);
  const [loadingProject, setLoadingProject] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      try {
        const res = await axios.get("/internal/projects");
        setProject(res.data);
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
        setLoadingProject(false);
      }
    }

    fetchProject();
  }, []);

  return (
    <div className="flex flex-col gap-2 justify-center py-6">
      <div className="rounded-xl bg-gray-200 w-fit px-3 py-1 mx-auto">
        <p className="text-xs font-medium">Project</p>
      </div>

      {!loadingProject && (
        <h1 className="font-bold text-base lg:text-3xl text-center mb-4">
          Projects Showcase
        </h1>
      )}

      {loadingProject ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col gap-2 w-full justify-center">
            <Skeleton className="h-48 w-[100%]" />
            <Skeleton className="h-4 w-[100%]" />
            <Skeleton className="h-4 w-[60%]" />
            <Skeleton className="h-4 w-[90%]" />
          </div>
          <div className="flex flex-col gap-2 w-full justify-center">
            <Skeleton className="h-48 w-[100%]" />
            <Skeleton className="h-4 w-[100%]" />
            <Skeleton className="h-4 w-[60%]" />
            <Skeleton className="h-4 w-[90%]" />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {project.map((proj, index) => (
            <div
              key={index}
              className="rounded overflow-hidden border-2 boder-gray-500 hover:border-gray-700 transition-all duration-300 pb-4"
            >
              <Image
                src={proj.image}
                alt={proj.title}
                width={500}
                height={300}
              />
              <div className="p-2 flex flex-col gap-3 lg:gap-4 mt-2">
                <h1 className="text-sm lg:text-base font-medium">
                  {proj.title}
                </h1>
                <p className=" text-xs lg:text-base text-muted-foreground">
                  {proj.desc}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {proj.project_skills.map((item, idx) => (
                    <div
                      key={idx}
                      className="text-xs text-muted-foreground bg-muted rounded-xl px-2 py-1"
                    >
                      {item.skill.name}
                    </div>
                  ))}
                </div>

                <a href={proj.link} target="_blank" rel="noopener noreferrer">
                  <Button
                    size="sm"
                    variant="outline"
                    className={"w-full hover:cursor-pointer"}
                  >
                    <p className="text-xs lg:text-base">View Project</p>
                  </Button>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
