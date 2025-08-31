import * as React from "react";

import { Separator } from "@/components/ui/separator";
import { CalendarDaysIcon, SchoolIcon, UserIcon } from "lucide-react";

const TimelineExperience = ({ timelineData }) => {
  return (
    <section className="">
      <div className="container">
        <div className="relative mx-auto max-w-4xl">
          <Separator
            orientation="vertical"
            className="bg-gray-400 absolute left-2 top-4"
          />
          {timelineData.map((entry, index) => (
            <div key={index} className="relative mb-10 pl-8">
              <div className="bg-foreground absolute left-0.5 top-4 flex size-3 items-center justify-center rounded-full" />
              <div className="flex items-center justify-between">
                <div className="flex gap-2 lg:gap-4 items-center py-2">
                  <SchoolIcon className="h-4 lg:h-8"></SchoolIcon>
                  <h4 className="text-xs lg:text-xl font-bold tracking-tight">
                    {entry.company}
                  </h4>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex gap-1 lg:gap-2 items-center">
                  <UserIcon className="h-3 lg:h-4 text-muted-foreground"></UserIcon>
                  <p className="text-xs lg:text-base text-muted-foreground">
                    {entry.role}
                  </p>
                </div>
                <div className="flex gap-1 lg:gap-2 items-center">
                  <CalendarDaysIcon className="h-3 lg:h-4 text-muted-foreground"></CalendarDaysIcon>
                  <p className="text-xs lg:text-base text-muted-foreground">
                    {entry.start_month} {entry.start_year} - {entry.end_month}{" "}
                    {entry.end_year}
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-xs lg:text-base text-gray-500">
                  {entry.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { TimelineExperience };
