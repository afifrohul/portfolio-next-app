"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";

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
    <div>
      <div className="flex flex-col gap-2 justify-center py-2 lg:py-6">
        <div className="mt-20 max-w-2xl mx-auto">
          <div className="space-y-4">
            <div className="min-w-2xl text-4xl font-bold">
              <h1>Developing Websites,</h1>
              <h1>Building Experiences</h1>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-200">
                I have worked on various projects, focusing on website
                application development. I am experienced in building full-stack
                website applications with Laravel and React. Here are some
                highlights that I am proud of, showcasing my process from
                concept to implementation.
              </p>
            </div>
            <div>
              <div className="duration-200 rounded w-fit">
                <Button>
                  <a
                    href="https://github.com/afifrohul"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 "
                  >
                    <p className="font-semibold">Github</p>
                    <FaGithub className="text-xl"></FaGithub>
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
