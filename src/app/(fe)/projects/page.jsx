"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { SquareArrowOutUpRight } from "lucide-react";
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
        <div className="mt-20 w-full lg:max-w-3xl mx-auto space-y-24">
          <div className="space-y-4 md:max-w-2xl mx-auto">
            <div className="lg:min-w-3xl text-2xl lg:text-4xl font-bold">
              <h1>Developing Websites,</h1>
              <h1>Building Experiences</h1>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-200 text-sm lg:text-base">
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
                    <p className="text-xs md:text-base font-semibold">Github</p>
                    <FaGithub className="text-xs lg:text-xl"></FaGithub>
                  </a>
                </Button>
              </div>
            </div>
          </div>
          <div className="md:max-w-2xl mx-auto">
            {loadingProject ? (
              <div className="space-y-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="order-2 md:order-1">
                    <Skeleton className="w-[50px] h-4 rounded-xs mb-2" />
                    <Skeleton className="w-[200px] h-5 rounded-sm mb-3" />
                    <div className="space-y-2  mb-4  ">
                      <Skeleton className="w-full h-2 rounded-sm" />
                      <Skeleton className="w-full h-2 rounded-sm" />
                      <Skeleton className="w-[250px] h-2 rounded-sm" />
                    </div>
                    <div className="flex gap-4 items-center my-4">
                      <Skeleton className="w-5 h-5 rounded-sm" />
                      <Skeleton className="w-5 h-5 rounded-sm" />
                      <Skeleton className="w-5 h-5 rounded-sm" />
                    </div>
                    <Skeleton className="w-[120px] h-8 rounded-sm" />
                  </div>
                  <Skeleton className="w-full h-[150px] lg:h-full rounded-sm order-1 lg:order-2" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <Skeleton className="w-full h-[150px] md:h-full rounded-sm" />
                  <div className="">
                    <Skeleton className="w-[50px] h-4 rounded-xs mb-2" />
                    <Skeleton className="w-[200px] h-5 rounded-sm mb-3" />
                    <div className="space-y-2  mb-4  ">
                      <Skeleton className="w-full h-2 rounded-sm" />
                      <Skeleton className="w-full h-2 rounded-sm" />
                      <Skeleton className="w-[250px] h-2 rounded-sm" />
                    </div>
                    <div className="flex gap-4 items-center my-4">
                      <Skeleton className="w-5 h-5 rounded-sm" />
                      <Skeleton className="w-5 h-5 rounded-sm" />
                      <Skeleton className="w-5 h-5 rounded-sm" />
                    </div>
                    <Skeleton className="w-[120px] h-8 rounded-sm" />
                  </div>
                </div>
              </div>
            ) : (
              project && (
                <div className="space-y-16">
                  {project.map((item, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
                    >
                      <div
                        className={`${index % 2 == 0 ? "md:order-2" : null}`}
                      >
                        <Image
                          src={item.image}
                          width={1080}
                          height={720}
                          alt={item.title}
                          className="bg-cover rounded-lg"
                        ></Image>
                      </div>
                      <div className="">
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-200 mb-2">
                          {item.year}
                        </p>
                        <p className="font-semibold mb-1">{item.title}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-200">
                          {item.desc}
                        </p>
                        <div className="flex gap-4 items-center mt-4">
                          {item.project_skills.map((ps, index) => (
                            <Image
                              key={index}
                              src={ps.skill.icon}
                              width={20}
                              height={20}
                              alt={ps.skill.name}
                            ></Image>
                          ))}
                        </div>
                        <Button variant="secondary" size="sm" className="mt-4">
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-3 "
                          >
                            <p className="font-medium text-xs">View Project</p>
                            <SquareArrowOutUpRight className=""></SquareArrowOutUpRight>
                          </a>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
