import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function SkeletonExperiences() {
  return (
    <div className="flex flex-col gap-4 mt-20 md:max-w-2xl mx-auto">
      <div className="w-fit space-y-1 mb-4">
        <Skeleton className="w-[130px] h-6 rounded-sm" />
        <Separator></Separator>
      </div>
      <div className="space-y-6 border-l-2 pl-4">
        <div className="space-y-2">
          <Skeleton className="w-full h-3" />
          <Skeleton className="w-[200px] md:w-[340px] h-3" />
          <Skeleton className="w-full h-2" />
          <Skeleton className="w-full h-2" />
          <Skeleton className="w-[220px] md:w-[400px] h-2" />
        </div>
        <div className="space-y-2">
          <Skeleton className="w-full h-3" />
          <Skeleton className="w-[200px] md:w-[340px] h-3" />
          <Skeleton className="w-full h-2" />
          <Skeleton className="w-full h-2" />
          <Skeleton className="w-[220px] md:w-[400px] h-2" />
        </div>
        <div className="space-y-2">
          <Skeleton className="w-full h-3" />
          <Skeleton className="w-[200px] md:w-[340px] h-3" />
          <Skeleton className="w-full h-2" />
          <Skeleton className="w-full h-2" />
          <Skeleton className="w-[220px] md:w-[400px] h-2" />
        </div>
        <div className="space-y-2">
          <Skeleton className="w-full h-3" />
          <Skeleton className="w-[200px] md:w-[340px] h-3" />
          <Skeleton className="w-full h-2" />
          <Skeleton className="w-full h-2" />
          <Skeleton className="w-[220px] md:w-[400px] h-2" />
        </div>
      </div>
    </div>
  );
}
