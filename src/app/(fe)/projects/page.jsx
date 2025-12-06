"use client";

import SkeletonProject from "@/components/skeleton-loader/project";
import { Button } from "@/components/ui/button";
import useProject from "@/hooks/content/useProject";
import { SquareArrowOutUpRight } from "lucide-react";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Projects() {
  const { project, loading: loadingProject } = useProject();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.1,
      },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <div>
      <div className="flex flex-col gap-2 justify-center py-2 lg:py-6">
        <div className="mt-20 w-full lg:max-w-3xl mx-auto space-y-24">
          <div className="space-y-4 md:max-w-2xl lg:max-w-3xl mx-auto">
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
                <a
                  href="https://github.com/afifrohul"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 "
                >
                  <Button className="hover:cursor-pointer duration-200">
                    <p className="text-xs md:text-base">Github</p>
                    <FaGithub className="text-xs lg:text-xl"></FaGithub>
                  </Button>
                </a>
              </div>
            </div>
          </div>
          <div className="md:max-w-2xl lg:max-w-3xl mx-auto">
            {loadingProject ? (
              <SkeletonProject />
            ) : (
              project && (
                <motion.div
                  className="space-y-16"
                  initial="hidden"
                  animate="show"
                  variants={container}
                >
                  {project.map((item, index) => (
                    <motion.div
                      key={index}
                      className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
                      variants={child}
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
                        {item.link ? (
                          <Button
                            variant="secondary"
                            size="sm"
                            className="mt-4"
                          >
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center gap-3 "
                            >
                              <p className="font-medium text-xs">
                                View Project
                              </p>
                              <SquareArrowOutUpRight className=""></SquareArrowOutUpRight>
                            </a>
                          </Button>
                        ) : null}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
