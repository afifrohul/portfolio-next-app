"use client";

import SkeletonExperiences from "@/components/skeleton-loader/experiences";
import { Separator } from "@/components/ui/separator";
import useExperiences from "@/hooks/content/useExperiences";
import { motion } from "framer-motion";

export default function Experiences() {
  const { experience, loading: loadingExperience } = useExperiences();

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
    <div className="flex flex-col gap-2 justify-center py-2 lg:py-6">
      <div className="mt-20 w-full lg:max-w-3xl mx-auto space-y-24">
        <div className="space-y-4 md:max-w-2xl lg:max-w-3xl mx-auto">
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
        <div className="md:max-w-2xl lg:max-w-3xl">
          {loadingExperience ? (
            <SkeletonExperiences />
          ) : (
            experience && (
              <div className="flex flex-col gap-4 mt-20 mx-auto">
                <motion.div
                  className="space-y-6 border-l pl-4"
                  initial="hidden"
                  animate="show"
                  variants={container}
                >
                  {experience.map((item) => (
                    <motion.div
                      key={item.id}
                      className="space-y-2"
                      variants={child}
                    >
                      <div className="md:grid grid-cols-3 space-y-1.5 md:space-y-0">
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-300 mt-1">
                            {item.start_month} {item.start_year} - {item.end_month} {item.end_year}
                          </p>
                        </div>
                        <div className="col-span-2 space-y-1.5">
                          <h1 className="font-semibold">
                            {item.company} <span className="text-sm font-normal italic">- {item.role}</span>
                          </h1>
                          <p className="text-xs  md:text-sm text-gray-500 dark:text-gray-400">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
