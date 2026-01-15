import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonExperiences() {
  return (
    <div className="flex flex-col gap-6 mt-20 mx-auto">
      <div className="md:grid grid-cols-3">
        <div>
          <Skeleton className="w-2/3 h-3 mb-2" />
        </div>
        <div className="space-y-2 col-span-2">
          <Skeleton className="w-full h-3" />
          <Skeleton className="w-full h-2" />
          <Skeleton className="w-full h-2" />
          <Skeleton className="w-full h-2" />
          <Skeleton className="w-[220px] md:w-[400px] h-2" />
        </div>
      </div>
    </div>
  );
}
