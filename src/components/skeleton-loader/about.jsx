import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonAbout() {
  return (
    <div className="mx-auto space-y-5">
      <Skeleton className="w-full md:w-lg h-6 md:h-8 lg:h-12 mx-auto" />
      <div className="mt-4 space-y-2">
        <Skeleton className="w-[270px] md:w-[672px] h-3 mx-auto" />
        <Skeleton className="w-[260px] md:w-[700px] h-3 mx-auto" />
        <Skeleton className="w-[230px] md:w-[690px] h-3 mx-auto" />
        <Skeleton className="w-[250px] md:w-[651px] h-3 mx-auto" />
        <Skeleton className="w-[240px] md:w-[688px] h-3 mx-auto" />
        <Skeleton className="w-[255px] md:w-[500px] h-3 mx-auto" />
        <Skeleton className="w-[266px] md:w-[300px] h-3 mx-auto" />
      </div>
      <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
        <Skeleton className="w-[75px] md:w-[150px] h-8" />
        <Skeleton className="w-[75px] md:w-[150px] h-8" />
      </div>
      <div className="flex gap-4 justify-center items-center">
        <Skeleton className="w-4 h-4 rounded-xs" />
        <Skeleton className="w-4 h-4 rounded-xs" />
        <Skeleton className="w-4 h-4 rounded-xs" />
        <Skeleton className="w-4 h-4 rounded-xs" />
      </div>
    </div>
  );
}
